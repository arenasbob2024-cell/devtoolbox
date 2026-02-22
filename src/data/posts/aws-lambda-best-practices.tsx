export default function AwsLambdaBestPractices() {
  return (
    <>
      <h2>AWS Lambda Best Practices: Patterns for Production Serverless Functions</h2>
      <p>
        AWS Lambda has matured into one of the most widely used compute services in the cloud. In 2026,
        Lambda powers everything from simple API backends to complex event-driven workflows processing
        millions of events per second. However, building Lambda functions that are fast, reliable, and
        cost-effective requires understanding its execution model and applying a set of proven practices.
        This guide covers cold start optimization, error handling, configuration, security, and the
        architectural patterns that separate production-grade Lambda functions from fragile ones.
      </p>

      <h2>Understanding the Lambda Execution Model</h2>
      <p>
        Before optimizing, you must understand what happens when Lambda runs your function. There are
        two phases: the <strong>init phase</strong> (cold start) and the <strong>invoke phase</strong>.
        Cold starts happen when Lambda creates a new execution environment — they include downloading
        your code, starting the runtime, and running initialization code outside your handler. Subsequent
        invocations on the same container are warm starts and skip the init phase entirely.
      </p>
      <pre><code className="language-javascript">{`// Handler structure — code placement matters
// This runs ONCE per container (cold start only)
const AWS = require('@aws-sdk/client-s3');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

// Initialize clients outside handler — reused across warm invocations
const s3 = new AWS.S3Client({ region: process.env.AWS_REGION });
const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });

// Load config once at init time
const CONFIG = {
  bucket: process.env.S3_BUCKET,
  table: process.env.DYNAMO_TABLE,
  maxRetries: parseInt(process.env.MAX_RETRIES || '3', 10),
};

// This runs on EVERY invocation
exports.handler = async (event, context) => {
  // context.getRemainingTimeInMillis() — time until timeout
  // context.requestId — unique per invocation, useful for logs

  try {
    const result = await processEvent(event);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error(JSON.stringify({
      error: err.message,
      stack: err.stack,
      requestId: context.awsRequestId,
      event: sanitizeEvent(event),
    }));
    throw err; // Re-throw for Lambda retry behavior
  }
};

function sanitizeEvent(event) {
  // Remove sensitive fields before logging
  const { authorization, password, token, ...safe } = event;
  return safe;
}`}</code></pre>

      <h2>Cold Start Optimization</h2>
      <p>
        Cold starts are the most common Lambda performance complaint. The strategies below can reduce
        cold start times from seconds to milliseconds.
      </p>

      <h3>Choose the Right Runtime</h3>
      <table>
        <thead>
          <tr>
            <th>Runtime</th>
            <th>Typical Cold Start</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Node.js 20.x</td><td>100–300ms</td><td>Best for most use cases</td></tr>
          <tr><td>Python 3.12</td><td>100–400ms</td><td>Fast with minimal imports</td></tr>
          <tr><td>Java 21 (SnapStart)</td><td>200ms (with SnapStart)</td><td>Enable SnapStart for Java</td></tr>
          <tr><td>Go</td><td>50–150ms</td><td>Compiled; very fast cold starts</td></tr>
          <tr><td>Rust (provided.al2023)</td><td>30–100ms</td><td>Fastest option available</td></tr>
          <tr><td>Java 21 (no SnapStart)</td><td>1–3s</td><td>Avoid without SnapStart</td></tr>
        </tbody>
      </table>

      <h3>Minimize Package Size</h3>
      <pre><code className="language-json">{`// package.json — use modular AWS SDK v3 imports
// Import only the clients you need, not the entire SDK

// BAD: imports everything
// const AWS = require('aws-sdk'); // ~30MB unzipped

// GOOD: modular imports
// const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
// ~1.5MB for S3 client alone

// Bundle with esbuild for smallest possible output
{
  "scripts": {
    "build": "esbuild src/handler.ts --bundle --platform=node --target=node20 --outfile=dist/handler.js --minify --tree-shaking=true",
    "package": "cd dist && zip -r ../function.zip handler.js"
  },
  "devDependencies": {
    "esbuild": "^0.20.0"
  }
}`}</code></pre>
      <pre><code className="language-bash">{`# Measure your package size
# Lambda has a 250MB unzipped limit, but smaller = faster cold start
zip -r function.zip . && unzip -l function.zip | tail -1

# Use Lambda Layers for shared dependencies
# Create layer with Node.js modules
mkdir -p layer/nodejs
cp -r node_modules layer/nodejs/
zip -r layer.zip layer/
aws lambda publish-layer-version \\
  --layer-name shared-deps \\
  --zip-file fileb://layer.zip \\
  --compatible-runtimes nodejs20.x`}</code></pre>

      <h3>Provisioned Concurrency</h3>
      <pre><code className="language-bash">{`# Provisioned Concurrency pre-warms containers
# Eliminates cold starts at the cost of continuous billing
# Use for latency-sensitive endpoints

aws lambda put-provisioned-concurrency-config \\
  --function-name my-api \\
  --qualifier production \\
  --provisioned-concurrent-executions 10

# Auto Scaling for Provisioned Concurrency (cost-efficient)
aws application-autoscaling register-scalable-target \\
  --service-namespace lambda \\
  --resource-id function:my-api:production \\
  --scalable-dimension lambda:function:ProvisionedConcurrency \\
  --min-capacity 5 \\
  --max-capacity 50

# Scale based on utilization (target 70%)
aws application-autoscaling put-scaling-policy \\
  --service-namespace lambda \\
  --resource-id function:my-api:production \\
  --scalable-dimension lambda:function:ProvisionedConcurrency \\
  --policy-name pc-tracking \\
  --policy-type TargetTrackingScaling \\
  --target-tracking-scaling-policy-configuration \\
    "TargetValue=0.7,PredefinedMetricSpecification={PredefinedMetricType=LambdaProvisionedConcurrencyUtilization}"`}</code></pre>

      <h2>Error Handling and Retry Behavior</h2>
      <p>
        Lambda's behavior on errors depends on the invocation type and event source. Getting this right
        prevents duplicate processing, data loss, and runaway retry loops.
      </p>
      <pre><code className="language-typescript">{`// Distinguish retriable vs non-retriable errors
export class RetriableError extends Error {
  readonly isRetriable = true;
  constructor(message: string) { super(message); }
}

export class NonRetriableError extends Error {
  readonly isRetriable = false;
  constructor(message: string) { super(message); }
}

export const handler = async (event: SQSEvent): Promise<SQSBatchResponse> => {
  const batchItemFailures: SQSBatchItemFailure[] = [];

  // Process SQS messages in parallel with error isolation
  await Promise.allSettled(
    event.Records.map(async (record) => {
      try {
        const body = JSON.parse(record.body);
        await processMessage(body);
      } catch (err) {
        if (err instanceof NonRetriableError) {
          // Send to DLQ immediately — do NOT add to batchItemFailures
          console.error('Non-retriable error, skipping:', {
            messageId: record.messageId,
            error: err.message,
          });
          await sendToDLQ(record);
        } else {
          // Retriable — return to SQS for retry
          batchItemFailures.push({ itemIdentifier: record.messageId });
          console.warn('Retriable error, will retry:', {
            messageId: record.messageId,
            error: (err as Error).message,
          });
        }
      }
    })
  );

  // SQS partial batch failure response — only failed messages are retried
  return { batchItemFailures };
};

// Async invocation error handling
// Configure on the function itself
const lambdaConfig = {
  FunctionName: 'my-async-function',
  DestinationConfig: {
    OnSuccess: {
      Destination: 'arn:aws:sqs:us-east-1:123:success-queue',
    },
    OnFailure: {
      Destination: 'arn:aws:sqs:us-east-1:123:dead-letter-queue',
    },
  },
  // Retry async invocations up to 2 times (0 = no retry, 2 = max)
  MaximumRetryAttempts: 2,
  // Discard events older than 1 hour
  MaximumEventAgeInSeconds: 3600,
};`}</code></pre>

      <h2>Configuration and Secrets Management</h2>
      <pre><code className="language-typescript">{`// BAD: Hardcoding secrets (never do this)
const DB_PASSWORD = 'my-super-secret-password'; // Exposed in code and logs

// BAD: Environment variables for sensitive secrets
// (visible in Lambda console and CloudTrail logs)
const DB_PASSWORD = process.env.DB_PASSWORD;

// GOOD: AWS Secrets Manager with caching
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const secretsClient = new SecretsManagerClient({});

// Cache secrets across warm invocations
const secretCache = new Map<string, { value: string; expiresAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function getSecret(secretId: string): Promise<string> {
  const cached = secretCache.get(secretId);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.value;
  }

  const response = await secretsClient.send(
    new GetSecretValueCommand({ SecretId: secretId })
  );

  const value = response.SecretString!;
  secretCache.set(secretId, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  return value;
}

// Usage — fetched once and cached
let dbConnection: Database | null = null;

export const handler = async (event: APIGatewayProxyEvent) => {
  if (!dbConnection) {
    const dbPassword = await getSecret('prod/myapp/db-password');
    dbConnection = await createConnection({ password: dbPassword });
  }
  return processRequest(event, dbConnection);
};

// GOOD: SSM Parameter Store for non-sensitive config
import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm';

const ssmClient = new SSMClient({});

async function loadConfig(path: string) {
  const response = await ssmClient.send(
    new GetParametersByPathCommand({
      Path: path,
      WithDecryption: true,
      Recursive: true,
    })
  );
  return Object.fromEntries(
    response.Parameters!.map(p => [p.Name!.split('/').pop()!, p.Value!])
  );
}`}</code></pre>

      <h2>Lambda Power Tuning and Memory Configuration</h2>
      <p>
        Lambda bills by duration × memory. Counter-intuitively, allocating more memory often reduces
        both cost and duration because Lambda allocates CPU proportionally to memory.
      </p>
      <pre><code className="language-bash">{`# AWS Lambda Power Tuning (open-source SAR application)
# Automatically finds the optimal memory configuration
# Deploy: https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:451282441545:applications~aws-lambda-power-tuning

# After deploying, invoke the state machine:
aws stepfunctions start-execution \\
  --state-machine-arn arn:aws:states:us-east-1:ACCOUNT:stateMachine:powerTuningStateMachine \\
  --input '{
    "lambdaARN": "arn:aws:lambda:us-east-1:ACCOUNT:function:my-function",
    "powerValues": [128, 256, 512, 1024, 2048, 3008],
    "num": 50,
    "payload": {"test": "event"},
    "parallelInvocation": true,
    "strategy": "cost"
  }'

# Typical findings:
# I/O-bound functions (DB queries, API calls): 256-512MB optimal
# CPU-bound functions (image processing, crypto): 1792MB+ optimal
# Memory-bound functions: match to actual memory usage
# Rule: if duration drops by more than memory increase %, it pays for itself`}</code></pre>

      <h2>Security Best Practices</h2>
      <pre><code className="language-yaml">{`# IAM — Principle of least privilege
# Use separate execution roles per function

# template.yaml (SAM)
Resources:
  OrderProcessorFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/handler.handler
      Runtime: nodejs20.x
      Timeout: 30
      MemorySize: 512
      Architectures: [arm64]  # Graviton: 20% cheaper, same performance
      Environment:
        Variables:
          ORDERS_TABLE: !Ref OrdersTable
          # Never put secrets here — use Secrets Manager
      Policies:
        # Minimal permissions — only what this function needs
        - DynamoDBCrudPolicy:
            TableName: !Ref OrdersTable
        - SQSSendMessagePolicy:
            QueueName: !GetAtt NotificationQueue.QueueName
        # Allow reading one specific secret
        - Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Action: secretsmanager:GetSecretValue
              Resource: !Sub 'arn:aws:secretsmanager:\${AWS::Region}:\${AWS::AccountId}:secret:prod/orders/*'

  # VPC configuration for database access
  # Only use VPC when necessary — it adds cold start latency
  PaymentFunction:
    Type: AWS::Serverless::Function
    Properties:
      VpcConfig:
        SecurityGroupIds: [!Ref LambdaSecurityGroup]
        SubnetIds: !Ref PrivateSubnets
      # Use VPC Endpoints to avoid NAT Gateway costs for AWS services
      # aws ec2 create-vpc-endpoint --vpc-id vpc-xxx --service-name com.amazonaws.us-east-1.dynamodb`}</code></pre>

      <h2>Structured Logging and Observability</h2>
      <pre><code className="language-typescript">{`// Structured logging — essential for CloudWatch Logs Insights queries
const log = {
  info: (message: string, data?: Record<string, unknown>) =>
    console.log(JSON.stringify({ level: 'INFO', message, ...data, timestamp: new Date().toISOString() })),

  warn: (message: string, data?: Record<string, unknown>) =>
    console.warn(JSON.stringify({ level: 'WARN', message, ...data, timestamp: new Date().toISOString() })),

  error: (message: string, data?: Record<string, unknown>) =>
    console.error(JSON.stringify({ level: 'ERROR', message, ...data, timestamp: new Date().toISOString() })),
};

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  const requestId = context.awsRequestId;
  const startTime = Date.now();

  log.info('Request started', {
    requestId,
    path: event.path,
    method: event.httpMethod,
    userId: event.requestContext.authorizer?.userId,
  });

  try {
    const result = await processRequest(event);

    log.info('Request completed', {
      requestId,
      durationMs: Date.now() - startTime,
      statusCode: result.statusCode,
    });

    return result;
  } catch (err) {
    log.error('Request failed', {
      requestId,
      durationMs: Date.now() - startTime,
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    throw err;
  }
};

// CloudWatch Logs Insights query to find slow invocations:
// fields @timestamp, @duration, @requestId, @message
// | filter @type = "REPORT"
// | sort @duration desc
// | limit 20`}</code></pre>

      <h2>Event-Driven Patterns</h2>
      <pre><code className="language-typescript">{`// Fan-out pattern: SNS → multiple SQS queues → Lambda
// Useful for processing an event with multiple independent handlers

// EventBridge for decoupled event routing
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const eventbridge = new EventBridgeClient({});

async function publishOrderEvent(order: Order) {
  await eventbridge.send(new PutEventsCommand({
    Entries: [
      {
        EventBusName: 'myapp-events',
        Source: 'myapp.orders',
        DetailType: 'OrderPlaced',
        Detail: JSON.stringify({
          orderId: order.id,
          userId: order.userId,
          total: order.total,
          items: order.items,
        }),
      },
    ],
  }));
}

// Idempotency — critical for async/retry scenarios
import { makeHandlerIdempotent } from '@aws-lambda-powertools/idempotency';
import { DynamoDBPersistenceLayer } from '@aws-lambda-powertools/idempotency/dynamodb';

const persistenceStore = new DynamoDBPersistenceLayer({
  tableName: 'idempotency-table',
  expiresAfterSeconds: 3600, // 1 hour
});

// Wrap your handler — duplicate events with same key are no-ops
export const handler = makeHandlerIdempotent(
  async (event: SQSRecord) => {
    const order = JSON.parse(event.body);
    await chargeCustomer(order);  // Safe to call — runs only once per orderId
    await fulfillOrder(order);
  },
  {
    persistenceStore,
    config: {
      eventKeyJmesPath: 'body.orderId', // Use orderId as idempotency key
    },
  }
);`}</code></pre>

      <h2>Lambda Best Practices Checklist</h2>
      <ul>
        <li>Initialize SDK clients and DB connections outside the handler (once per container)</li>
        <li>Use Graviton (arm64) architecture for 20% cost savings with no code changes</li>
        <li>Set timeout to 3× the expected P99 execution time, not the maximum</li>
        <li>Use AWS Lambda Power Tuning to find the optimal memory setting</li>
        <li>Store secrets in AWS Secrets Manager, never in environment variables or code</li>
        <li>Implement partial batch failure responses for SQS and Kinesis event sources</li>
        <li>Use structured JSON logging for efficient CloudWatch Logs Insights queries</li>
        <li>Add a Dead Letter Queue (DLQ) for all async invocations</li>
        <li>Bundle with esbuild/webpack to minimize deployment package size</li>
        <li>Implement idempotency for all write operations that may be retried</li>
        <li>Use Provisioned Concurrency only for latency-critical endpoints where cost justifies it</li>
        <li>Enable AWS X-Ray tracing to identify bottlenecks across distributed calls</li>
      </ul>

      <p>
        For building and testing the API Gateway events that trigger your Lambda functions, try our{" "}
        <a href="/en/tools/json-formatter">JSON Formatter</a> to validate event payloads. You can also use
        our <a href="/en/tools/base64-encoder">Base64 Encoder</a> when working with Lambda event data that
        uses Base64-encoded bodies. For a broader view, read our{" "}
        <a href="/en/blog/api-rate-limiting-guide">API Rate Limiting Guide</a> to add rate limiting at
        the API Gateway layer in front of your Lambda functions.
      </p>
    </>
  );
}
