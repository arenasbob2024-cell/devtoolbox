export default function AwsLambdaServerless() {
  return (
    <>
      <h2>AWS Lambda and Serverless: Beginner&apos;s Guide 2026</h2>
      <p>
        Serverless computing allows you to run code without provisioning or managing servers. AWS Lambda
        is the most widely adopted serverless compute platform, powering millions of applications from
        simple API endpoints to complex event-driven architectures. You pay only for the compute time
        you consume, making it ideal for variable workloads, microservices, and event-driven processing.
        This guide covers everything you need to start building serverless applications with AWS Lambda
        in 2026.
      </p>

      <h2>What is Serverless?</h2>
      <p>
        Serverless does not mean there are no servers. It means the cloud provider manages the servers
        for you. You write functions, define triggers, and the platform handles provisioning, scaling,
        patching, and availability. Key characteristics of serverless:
      </p>
      <ul>
        <li><strong>No server management</strong> - No EC2 instances, no OS updates, no capacity planning</li>
        <li><strong>Auto-scaling</strong> - Scales from zero to thousands of concurrent executions automatically</li>
        <li><strong>Pay-per-use</strong> - Billed only for actual execution time, down to the millisecond</li>
        <li><strong>Event-driven</strong> - Functions are triggered by events: HTTP requests, file uploads, database changes, queue messages, and schedules</li>
        <li><strong>Stateless</strong> - Each function invocation is independent; state must be stored externally</li>
      </ul>

      <h2>Your First Lambda Function</h2>
      <p>
        A Lambda function is a single-purpose piece of code that runs in response to an event. Here is
        a simple Lambda function in Node.js that handles an API Gateway request:
      </p>
      <pre><code>{`// handler.ts - A basic Lambda function
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const name = event.queryStringParameters?.name || "World";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: \`Hello, \${name}!\`,
        timestamp: new Date().toISOString(),
        requestId: event.requestContext.requestId,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};`}</code></pre>

      <h2>Setting Up with the Serverless Framework</h2>
      <p>
        The Serverless Framework is the most popular tool for developing and deploying Lambda functions.
        It handles packaging, deployment, IAM permissions, and infrastructure as code.
      </p>
      <pre><code>{`# Install the Serverless Framework
npm install -g serverless

# Create a new project
serverless create --template aws-nodejs-typescript --path my-service
cd my-service
npm install

# serverless.yml - Service configuration
service: my-api
frameworkVersion: '4'

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  stage: \${opt:stage, 'dev'}
  memorySize: 256
  timeout: 30
  environment:
    TABLE_NAME: \${self:service}-\${self:provider.stage}-items
    STAGE: \${self:provider.stage}
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - dynamodb:GetItem
            - dynamodb:PutItem
            - dynamodb:UpdateItem
            - dynamodb:DeleteItem
            - dynamodb:Query
            - dynamodb:Scan
          Resource:
            - !GetAtt ItemsTable.Arn
            - !Join ['/', [!GetAtt ItemsTable.Arn, 'index/*']]

functions:
  getItems:
    handler: src/handlers/items.getAll
    events:
      - httpApi:
          path: /items
          method: GET

  getItem:
    handler: src/handlers/items.getOne
    events:
      - httpApi:
          path: /items/{id}
          method: GET

  createItem:
    handler: src/handlers/items.create
    events:
      - httpApi:
          path: /items
          method: POST

  deleteItem:
    handler: src/handlers/items.remove
    events:
      - httpApi:
          path: /items/{id}
          method: DELETE

  processQueue:
    handler: src/handlers/queue.process
    events:
      - sqs:
          arn: !GetAtt ProcessingQueue.Arn
          batchSize: 10

  scheduledTask:
    handler: src/handlers/cron.cleanup
    events:
      - schedule: rate(1 hour)

resources:
  Resources:
    ItemsTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: \${self:provider.environment.TABLE_NAME}
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH

    ProcessingQueue:
      Type: AWS::SQS::Queue
      Properties:
        QueueName: \${self:service}-\${self:provider.stage}-processing`}</code></pre>
      <pre><code>{`# Deploy to AWS
serverless deploy --stage dev

# Deploy a single function (faster for development)
serverless deploy function -f getItems

# Invoke a function locally
serverless invoke local -f getItems

# View logs
serverless logs -f getItems --tail

# Remove the entire stack
serverless remove --stage dev`}</code></pre>

      <h2>Building a CRUD API</h2>
      <p>
        Here is a complete CRUD handler for a DynamoDB-backed API using Lambda:
      </p>
      <pre><code>{`// src/handlers/items.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME!;

function response(statusCode: number, body: unknown): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
}

// GET /items
export const getAll = async (): Promise<APIGatewayProxyResult> => {
  try {
    const result = await docClient.send(
      new ScanCommand({ TableName: TABLE_NAME })
    );
    return response(200, { items: result.Items, count: result.Count });
  } catch (error) {
    console.error("Error fetching items:", error);
    return response(500, { error: "Failed to fetch items" });
  }
};

// GET /items/:id
export const getOne = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) return response(400, { error: "Missing item ID" });

  try {
    const result = await docClient.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { id } })
    );
    if (!result.Item) return response(404, { error: "Item not found" });
    return response(200, result.Item);
  } catch (error) {
    console.error("Error fetching item:", error);
    return response(500, { error: "Failed to fetch item" });
  }
};

// POST /items
export const create = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) return response(400, { error: "Missing request body" });

  try {
    const data = JSON.parse(event.body);
    const item = {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({ TableName: TABLE_NAME, Item: item })
    );
    return response(201, item);
  } catch (error) {
    console.error("Error creating item:", error);
    return response(500, { error: "Failed to create item" });
  }
};

// DELETE /items/:id
export const remove = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) return response(400, { error: "Missing item ID" });

  try {
    await docClient.send(
      new DeleteCommand({ TableName: TABLE_NAME, Key: { id } })
    );
    return response(200, { message: "Item deleted", id });
  } catch (error) {
    console.error("Error deleting item:", error);
    return response(500, { error: "Failed to delete item" });
  }
};`}</code></pre>

      <h2>Event Sources and Triggers</h2>
      <p>
        Lambda functions can be triggered by over 200 AWS services. Here are the most common event
        sources and their typical use cases:
      </p>
      <table>
        <thead>
          <tr>
            <th>Event Source</th>
            <th>Use Case</th>
            <th>Invocation Type</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>API Gateway</td><td>REST/HTTP APIs, webhooks</td><td>Synchronous</td></tr>
          <tr><td>S3</td><td>File processing, image resizing, ETL</td><td>Asynchronous</td></tr>
          <tr><td>SQS</td><td>Queue processing, decoupled workflows</td><td>Polling</td></tr>
          <tr><td>DynamoDB Streams</td><td>Change data capture, real-time sync</td><td>Polling</td></tr>
          <tr><td>EventBridge</td><td>Event routing, scheduled tasks, cross-service events</td><td>Asynchronous</td></tr>
          <tr><td>SNS</td><td>Fan-out notifications, pub/sub messaging</td><td>Asynchronous</td></tr>
          <tr><td>CloudWatch Events</td><td>Cron jobs, scheduled maintenance</td><td>Asynchronous</td></tr>
          <tr><td>Cognito</td><td>User signup/login triggers, custom auth flows</td><td>Synchronous</td></tr>
          <tr><td>Kinesis</td><td>Real-time data streaming, log processing</td><td>Polling</td></tr>
          <tr><td>ALB</td><td>Application Load Balancer integration</td><td>Synchronous</td></tr>
        </tbody>
      </table>

      <h3>S3 Event Processing Example</h3>
      <pre><code>{`// Process uploaded images
import { S3Event } from "aws-lambda";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3 = new S3Client({});

export const handler = async (event: S3Event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key);

    // Skip if already a thumbnail
    if (key.startsWith("thumbnails/")) continue;

    console.log(\`Processing: \${bucket}/\${key}\`);

    // Download original image
    const original = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    const imageBuffer = Buffer.from(
      await original.Body!.transformToByteArray()
    );

    // Generate thumbnail
    const thumbnail = await sharp(imageBuffer)
      .resize(200, 200, { fit: "cover" })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Upload thumbnail
    const thumbnailKey = \`thumbnails/\${key.replace(/\\.[^.]+$/, ".jpg")}\`;
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: thumbnailKey,
        Body: thumbnail,
        ContentType: "image/jpeg",
      })
    );

    console.log(\`Thumbnail created: \${thumbnailKey}\`);
  }
};`}</code></pre>

      <h2>Cold Starts and Performance</h2>
      <p>
        A cold start occurs when Lambda creates a new execution environment for your function. This
        adds latency (typically 100ms to several seconds) to the first invocation. Understanding and
        mitigating cold starts is crucial for performance-sensitive applications.
      </p>
      <ul>
        <li><strong>Runtime choice matters</strong> - Node.js and Python have the fastest cold starts (100-300ms). Java and .NET are slower (1-5 seconds) without SnapStart</li>
        <li><strong>Memory affects CPU</strong> - Lambda allocates CPU proportional to memory. 1769MB equals one full vCPU. More memory means faster initialization</li>
        <li><strong>Keep bundles small</strong> - Smaller deployment packages initialize faster. Use tree-shaking and avoid importing entire SDKs</li>
        <li><strong>Provisioned concurrency</strong> - Pre-warms execution environments to eliminate cold starts for critical paths</li>
        <li><strong>SnapStart</strong> - Available for Java, takes a snapshot of initialized memory and restores it for near-instant starts</li>
      </ul>
      <pre><code>{`// Optimize cold starts: Initialize clients outside the handler
// These run once per cold start, not on every invocation

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Module-level initialization (runs once per cold start)
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Handler runs on every invocation
export const handler = async (event: any) => {
  // docClient is reused across invocations (warm starts)
  // This avoids re-creating the connection on every call
  const result = await docClient.send(/* ... */);
  return result;
};

// Bundle optimization with esbuild (serverless.yml)
// plugins:
//   - serverless-esbuild
// custom:
//   esbuild:
//     bundle: true
//     minify: true
//     sourcemap: true
//     exclude:
//       - "@aws-sdk/*"   # Available in Lambda runtime
//     target: node20`}</code></pre>

      <h2>Error Handling and Retry Logic</h2>
      <pre><code>{`// Structured error handling for Lambda
class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    // Validate input
    if (!event.body) {
      throw new AppError("Request body is required", 400, "MISSING_BODY");
    }

    const data = JSON.parse(event.body);
    if (!data.email) {
      throw new AppError("Email is required", 400, "MISSING_EMAIL");
    }

    // Business logic
    const result = await processRequest(data);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        statusCode: error.statusCode,
        body: JSON.stringify({
          error: error.code,
          message: error.message,
        }),
      };
    }

    // Unexpected errors - log full details, return generic message
    console.error("Unhandled error:", JSON.stringify(error, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      }),
    };
  }
};

// SQS handler with partial batch failure reporting
import { SQSBatchResponse, SQSEvent } from "aws-lambda";

export const sqsHandler = async (event: SQSEvent): Promise<SQSBatchResponse> => {
  const failures: string[] = [];

  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);
      await processMessage(body);
    } catch (error) {
      console.error(\`Failed to process \${record.messageId}:\`, error);
      failures.push(record.messageId);
    }
  }

  return {
    batchItemFailures: failures.map((id) => ({
      itemIdentifier: id,
    })),
  };
};`}</code></pre>

      <h2>Monitoring and Observability</h2>
      <pre><code>{`// Structured logging for CloudWatch
function log(level: string, message: string, data?: Record<string, unknown>) {
  console.log(JSON.stringify({
    level,
    message,
    timestamp: new Date().toISOString(),
    ...data,
  }));
}

// Usage in handler
export const handler = async (event: APIGatewayProxyEvent) => {
  const requestId = event.requestContext.requestId;

  log("info", "Request received", {
    requestId,
    method: event.httpMethod,
    path: event.path,
  });

  const startTime = Date.now();
  const result = await processRequest(event);
  const duration = Date.now() - startTime;

  log("info", "Request completed", {
    requestId,
    duration,
    statusCode: result.statusCode,
  });

  return result;
};

// Custom CloudWatch metrics
import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";

const cw = new CloudWatchClient({});

async function publishMetric(name: string, value: number, unit = "Count") {
  await cw.send(new PutMetricDataCommand({
    Namespace: "MyApp",
    MetricData: [{
      MetricName: name,
      Value: value,
      Unit: unit,
      Timestamp: new Date(),
    }],
  }));
}`}</code></pre>

      <h2>Lambda Pricing (2026)</h2>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Price</th>
            <th>Free Tier</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Requests</td><td>$0.20 per 1M requests</td><td>1M requests/month</td></tr>
          <tr><td>Duration (128MB)</td><td>$0.0000000021 per ms</td><td>400,000 GB-seconds/month</td></tr>
          <tr><td>Duration (1GB)</td><td>$0.0000000167 per ms</td><td>Included in GB-seconds</td></tr>
          <tr><td>Provisioned Concurrency</td><td>$0.0000041667 per GB-second</td><td>None</td></tr>
        </tbody>
      </table>
      <p>
        For context, a function with 256MB memory running 100ms per invocation, called 1 million times
        per month, costs approximately $2.50 total. The generous free tier covers most development and
        low-traffic production workloads.
      </p>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Keep functions focused</strong> - Each function should do one thing well. Follow the single responsibility principle</li>
        <li><strong>Initialize outside the handler</strong> - Put database connections, SDK clients, and config loading at module level to reuse across invocations</li>
        <li><strong>Set appropriate timeouts</strong> - Default is 3 seconds, maximum is 15 minutes. Set based on expected execution time plus buffer</li>
        <li><strong>Use environment variables</strong> - Never hardcode configuration, credentials, or stage-specific values</li>
        <li><strong>Enable X-Ray tracing</strong> - AWS X-Ray provides distributed tracing across Lambda, API Gateway, DynamoDB, and other services</li>
        <li><strong>Use Dead Letter Queues</strong> - Configure DLQ (SQS or SNS) for async invocations to capture failed events</li>
        <li><strong>Minimize deployment package size</strong> - Use bundlers (esbuild, webpack), exclude dev dependencies, and leverage Lambda layers for shared code</li>
        <li><strong>Use ARM64 architecture</strong> - Graviton2 (arm64) functions are 20% cheaper and often faster than x86_64</li>
        <li><strong>Implement idempotency</strong> - Lambda can retry invocations, so ensure your functions produce the same result when called multiple times with the same input</li>
        <li><strong>Use Lambda Powertools</strong> - AWS Lambda Powertools provides logging, tracing, metrics, and middleware for TypeScript and Python</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>When should I NOT use Lambda?</h3>
      <p>
        Lambda is not ideal for long-running processes (over 15 minutes), workloads requiring persistent
        connections (WebSockets, though API Gateway WebSocket API can help), applications with consistent
        high traffic (a dedicated server may be cheaper), or workloads with very large memory requirements
        (maximum is 10GB). For these cases, consider ECS Fargate, EC2, or App Runner.
      </p>

      <h3>How do I handle database connections in Lambda?</h3>
      <p>
        Use RDS Proxy or connection pooling services to manage database connections. Lambda creates
        many concurrent execution environments, each with its own connection, which can exhaust database
        connection limits. RDS Proxy pools and shares connections across Lambda invocations. For DynamoDB,
        this is not an issue as it uses HTTP connections.
      </p>

      <h3>Can I use Lambda for a full web application?</h3>
      <p>
        Yes. Frameworks like SST, Serverless Stack, and AWS SAM simplify building full-stack serverless
        applications with Lambda, API Gateway, DynamoDB, S3, and CloudFront. Next.js can also be deployed
        on Lambda using OpenNext. However, evaluate whether the complexity is worth it compared to
        simpler deployment options like Vercel or AWS App Runner.
      </p>

      <h3>What is the difference between Lambda and Fargate?</h3>
      <p>
        Lambda runs individual functions triggered by events with automatic scaling and sub-second billing.
        Fargate runs Docker containers as long-running services with per-second billing. Lambda is better
        for event-driven workloads and APIs with variable traffic. Fargate is better for applications
        that need persistent connections, long processing times, or consistent high throughput.
      </p>

      <h3>How do I test Lambda functions locally?</h3>
      <p>
        Use <code>serverless invoke local</code> for quick testing, SAM CLI (<code>sam local invoke</code>)
        for Docker-based local execution, or write unit tests with Jest that mock AWS SDK calls. For
        integration testing, deploy to a dedicated dev/staging environment. Tools like LocalStack can
        emulate AWS services locally for comprehensive testing.
      </p>
    </>
  );
}
