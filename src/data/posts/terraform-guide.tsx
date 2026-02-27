'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Terraform Infrastructure as Code Complete Guide — HCL, Modules, State, AWS, CI/CD',
    description: 'Complete Terraform guide covering HCL syntax, modules, state management, AWS provider, variables, workspaces, provisioners, Terraform Cloud, testing with tfsec/checkov, and best practices.',
  },
  zh: {
    title: 'Terraform 基础设施即代码完整指南 — HCL、模块、状态、AWS、CI/CD',
    description: '完整 Terraform 指南，涵盖 HCL 语法、模块、状态管理、AWS Provider、变量、工作区、Provisioner、Terraform Cloud、tfsec/checkov 测试和最佳实践。',
  },
};

export default function TerraformGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Terraform and how does it differ from CloudFormation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Terraform is an open-source Infrastructure as Code tool by HashiCorp that uses HCL (HashiCorp Configuration Language) to define and provision infrastructure across multiple cloud providers (AWS, GCP, Azure, and 3000+ others). CloudFormation is AWS-only and uses JSON/YAML. Terraform\'s key advantages are multi-cloud support, a rich module registry, a plan/apply workflow that shows changes before applying, and state management that tracks real-world infrastructure. Both use declarative syntax where you describe desired state rather than writing imperative scripts.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Terraform state and why is it important?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Terraform state (terraform.tfstate) is a JSON file that maps your configuration to real-world infrastructure resources. It tracks resource IDs, metadata, and dependencies. Without state, Terraform cannot determine what already exists and would try to recreate everything. For teams, always use remote state (S3 + DynamoDB, GCS, or Terraform Cloud) so state is shared and locked during operations. Never store state in git — it may contain sensitive values like database passwords. Use terraform state commands to inspect, move, or remove resources from state without destroying them.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between count and for_each in Terraform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both create multiple instances of a resource. count uses a numeric index (count.index) and creates resources as a list. for_each uses a map or set and creates resources indexed by key, making them addressable as resource.name["key"]. The critical difference: if you remove the middle item from a count list, Terraform renumbers all subsequent resources and destroys/recreates them. With for_each, removing one key only affects that specific resource. Prefer for_each whenever resources have stable identifiers (names, IDs). Use count only for simple identical copies where order doesn\'t matter.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I manage secrets in Terraform without committing them to git?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Never hardcode secrets in .tf files or commit terraform.tfvars containing secrets. Best approaches: (1) Environment variables — Terraform auto-reads TF_VAR_name variables, so export TF_VAR_db_password="secret". (2) AWS Secrets Manager or SSM Parameter Store — use a data source to fetch secrets at plan time. (3) Vault provider — use HashiCorp Vault to dynamically generate credentials. (4) Terraform Cloud — store sensitive variables encrypted in TFC workspace. (5) Mark variables as sensitive = true so they are redacted in plan output. Add *.tfvars and *.tfstate to .gitignore.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between terraform import and terraform state mv?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'terraform import brings an existing real-world resource under Terraform management by writing it into state — you still need to write the corresponding HCL configuration manually (or use the newer -generate-config-out flag in Terraform 1.5+). terraform state mv moves a resource from one address to another within state without changing real infrastructure — useful when refactoring (e.g., moving a resource into a module, or renaming). Neither command modifies actual cloud resources. After import, always run terraform plan to verify the configuration matches the imported resource before making changes.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Terraform workspaces work and when should I use them?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Terraform workspaces allow multiple state files from the same configuration directory. Each workspace has its own state file at terraform.tfstate.d/<workspace>/. Use terraform workspace new staging to create one. Access the current workspace name via terraform.workspace in HCL. Best for: managing dev/staging/prod from the same code with different variable values. Not recommended for: strongly isolated environments (use separate repos/accounts instead) or unrelated resources. Many teams prefer separate backend configurations per environment over workspaces for clearer isolation and access control.',
        },
      },
      {
        '@type': 'Question',
        name: 'What security scanning tools should I use with Terraform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Several tools scan Terraform code for security misconfigurations before apply: (1) tfsec — fast static analysis, checks for exposed S3 buckets, open security groups, unencrypted resources. (2) checkov — broader policy-as-code framework by Bridgecrew, 1000+ checks across providers. (3) terrascan — CNCF project, supports OPA policies. (4) Snyk IaC — commercial with free tier. (5) KICS by Checkmarx. For compliance, use Sentinel (Terraform Cloud) or OPA/Conftest for custom policy enforcement. Integrate these into CI/CD so every PR is scanned before terraform plan runs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Atlantis and how does it automate Terraform in CI/CD?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Atlantis is an open-source Terraform pull request automation tool. It runs as a server that listens for GitHub/GitLab/Bitbucket webhooks. When you open a PR, Atlantis automatically runs terraform plan and posts the output as a PR comment. When you comment "atlantis apply", it runs terraform apply and merges the PR. Benefits: all changes go through code review, plan output is visible in PRs, applies are serialized to prevent race conditions, and full audit trail in git. Alternative to Atlantis is Terraform Cloud/Enterprise which provides the same workflow as a managed service with additional features like policy enforcement and cost estimation.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/terraform-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', margin: '0 0 0.5rem 0' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>Terraform</strong> turns cloud infrastructure into versioned, reviewable code using HCL.
          Write <strong>resources</strong>, organize them into <strong>modules</strong>, store <strong>state</strong> remotely (S3 + DynamoDB),
          and run <code>terraform plan</code> to preview changes before <code>terraform apply</code> commits them.
          Use <strong>workspaces</strong> or separate backends for environment promotion, scan with <strong>tfsec/checkov</strong> in CI,
          and format YAML configs with the{' '}
          <Link href="/en/tools/yaml-formatter" style={{ color: '#0284c7' }}>online YAML formatter</Link>{' '}
          while authoring Terraform modules.
        </p>
      </div>

      {/* Section 1: Core Concepts */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        1. Terraform Core Concepts — Providers, Resources, State, and More
      </h2>
      <p>
        Terraform is a declarative Infrastructure as Code (IaC) tool: you describe the desired end state of your
        infrastructure, and Terraform figures out how to get there. Understanding its core building blocks is
        essential before writing any configuration.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Providers
      </h3>
      <p>
        A <strong>provider</strong> is a plugin that talks to a specific API — AWS, GCP, Azure, GitHub, Datadog, etc.
        Each provider must be declared and configured before its resources can be used.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.5"
}

provider "aws" {
  region = var.aws_region
  # Credentials from env: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
  # Or from ~/.aws/credentials, IAM role, OIDC
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Resources, Data Sources, and Outputs
      </h3>
      <p>
        <strong>Resources</strong> create or manage real infrastructure. <strong>Data sources</strong> read existing
        infrastructure without creating anything. <strong>Outputs</strong> export values for use by other modules or
        to display after apply.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Resource — creates an S3 bucket
resource "aws_s3_bucket" "app_assets" {
  bucket = "my-app-assets-\${var.environment}"
  tags   = local.common_tags
}

# Data source — reads an existing VPC
data "aws_vpc" "main" {
  filter {
    name   = "tag:Name"
    values = ["main-vpc"]
  }
}

# Output — exports the bucket ARN
output "bucket_arn" {
  value       = aws_s3_bucket.app_assets.arn
  description = "ARN of the app assets S3 bucket"
}

# Variables
variable "environment" {
  type        = string
  description = "Deployment environment (dev/staging/prod)"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

# Locals — computed values used internally
locals {
  common_tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
    Project     = "my-app"
  }
}`}</code></pre>

      <p>
        The key mental model: Terraform builds a <strong>dependency graph</strong> from references between resources.
        When <code>aws_s3_bucket</code> references <code>var.environment</code>, Terraform knows to resolve the
        variable before creating the bucket. Circular dependencies cause plan errors.
      </p>

      {/* Section 2: HCL Syntax */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        2. HCL Syntax — Blocks, Expressions, For Loops, and Conditionals
      </h2>
      <p>
        HashiCorp Configuration Language (HCL) is a domain-specific language designed to be readable by both humans
        and machines. It supports rich expression syntax including string interpolation, for expressions, and
        conditional logic.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# String interpolation
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.\${var.instance_size}"   # e.g. t3.micro
  tags = {
    Name = "web-\${var.environment}-\${count.index}"
  }
}

# For expression — transform a list to a map
variable "subnet_cidrs" {
  default = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

locals {
  subnet_map = {
    for idx, cidr in var.subnet_cidrs :
    "subnet-\${idx}" => cidr
  }
  # Result: { "subnet-0" = "10.0.1.0/24", "subnet-1" = "10.0.2.0/24", ... }

  # Filter with if clause
  public_subnets = [
    for s in var.subnets : s.cidr if s.public == true
  ]
}

# Conditional (ternary) expression
resource "aws_instance" "web" {
  instance_type = var.environment == "prod" ? "t3.large" : "t3.micro"
  monitoring    = var.environment == "prod" ? true : false
}

# Dynamic blocks — generate repeated nested blocks
resource "aws_security_group" "web" {
  name = "web-sg"

  dynamic "ingress" {
    for_each = var.allowed_ports
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}`}</code></pre>

      <p>
        The <code>dynamic</code> block is one of the most powerful HCL features — it generates repeated nested
        configuration blocks from a list or map. This avoids copy-pasting ingress/egress rules, lifecycle hooks,
        or any other repeated nested blocks.
      </p>

      {/* Section 3: Modules */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        3. Modules — Reusable Infrastructure Components
      </h2>
      <p>
        Modules are Terraform&apos;s reusability mechanism. Every Terraform configuration is technically a module
        (the root module). Child modules are called with <code>module</code> blocks and can come from the Terraform
        Registry, GitHub, or local directories.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Using a registry module (Terraform Registry)
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "main-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = var.environment != "prod"
}

# Accessing module outputs
resource "aws_instance" "app" {
  subnet_id = module.vpc.private_subnets[0]
  vpc_security_group_ids = [aws_security_group.app.id]
}

# Local module
module "api_gateway" {
  source = "./modules/api-gateway"

  environment    = var.environment
  lambda_arn     = module.lambda.function_arn
  domain_name    = var.api_domain
}

# Module with for_each — multiple instances
module "microservice" {
  source   = "./modules/ecs-service"
  for_each = var.services  # map of service configs

  name        = each.key
  image       = each.value.image
  cpu         = each.value.cpu
  memory      = each.value.memory
  environment = var.environment
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Module Structure Best Practice
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`modules/
  ecs-service/
    main.tf          # core resources
    variables.tf     # input variables with descriptions + validation
    outputs.tf       # exported values
    versions.tf      # required providers + version constraints
    README.md        # auto-generated by terraform-docs

environments/
  dev/
    main.tf          # calls modules with dev settings
    terraform.tfvars # dev-specific values
    backend.tf       # dev state bucket
  prod/
    main.tf
    terraform.tfvars
    backend.tf`}</code></pre>

      {/* Section 4: State Management */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        4. State Management — Remote State, Locking, and Import
      </h2>
      <p>
        Terraform&apos;s state file is the source of truth mapping your HCL configuration to real cloud resources.
        For any team environment, local state is insufficient — use a remote backend with locking.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        S3 Backend with DynamoDB Locking
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# backend.tf
terraform {
  backend "s3" {
    bucket         = "my-company-terraform-state"
    key            = "prod/networking/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true                    # SSE-S3 encryption
    dynamodb_table = "terraform-state-lock"  # prevents concurrent applies
  }
}

# Create the DynamoDB table for locking (one-time setup)
resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Importing Existing Resources
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Import an existing S3 bucket into state
terraform import aws_s3_bucket.legacy my-existing-bucket-name

# Terraform 1.5+ — import block in HCL (no CLI command needed)
import {
  to = aws_s3_bucket.legacy
  id = "my-existing-bucket-name"
}

# Generate config automatically (Terraform 1.5+)
terraform plan -generate-config-out=generated.tf

# State management commands
terraform state list                       # list all resources in state
terraform state show aws_instance.web      # show resource details
terraform state mv aws_instance.old aws_instance.new  # rename without destroy
terraform state rm aws_s3_bucket.orphan   # remove from state (doesn't delete resource)

# Refresh state to match real world (use cautiously)
terraform apply -refresh-only`}</code></pre>

      {/* Section 5: AWS Provider */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        5. AWS Provider — EC2, VPC, S3, Security Groups, and IAM
      </h2>
      <p>
        The AWS provider is the most widely used Terraform provider. Here are the most common resource patterns
        for building a production application infrastructure.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# VPC + Subnets
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = { Name = "main" }
}

resource "aws_subnet" "private" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone = var.availability_zones[count.index]
}

# Security Group
resource "aws_security_group" "app" {
  name   = "app-\${var.environment}"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# IAM Role for EC2 with instance profile
resource "aws_iam_role" "ec2_role" {
  name = "ec2-app-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ssm" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "app" {
  name = "app-instance-profile"
  role = aws_iam_role.ec2_role.name
}

# EC2 Instance
resource "aws_instance" "app" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.private[0].id
  vpc_security_group_ids = [aws_security_group.app.id]
  iam_instance_profile   = aws_iam_instance_profile.app.name

  user_data = base64encode(templatefile("userdata.sh.tpl", {
    environment = var.environment
    app_version = var.app_version
  }))

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  tags = merge(local.common_tags, { Name = "app-\${var.environment}" })
}`}</code></pre>

      {/* Section 6: Variables & Workspaces */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        6. Variables and Workspaces — Types, Validation, tfvars, Environment Promotion
      </h2>
      <p>
        Terraform variables parameterize your configurations. Combined with workspaces or separate backends, they
        enable environment-specific deployments from a single code base.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# variables.tf — typed variables with validation
variable "instance_type" {
  type        = string
  description = "EC2 instance type"
  default     = "t3.micro"

  validation {
    condition     = can(regex("^t[23]\\.", var.instance_type))
    error_message = "Only t2 or t3 instance types are allowed."
  }
}

variable "allowed_ips" {
  type        = list(string)
  description = "CIDR blocks allowed SSH access"
  sensitive   = false
}

variable "db_password" {
  type      = string
  sensitive = true  # redacted in plan output and logs
}

variable "tags" {
  type = map(string)
  default = {}
}

variable "feature_flags" {
  type = object({
    enable_cdn   = bool
    enable_waf   = bool
    replica_count = number
  })
  default = {
    enable_cdn    = false
    enable_waf    = false
    replica_count = 1
  }
}

# terraform.tfvars (do NOT commit if it has secrets)
instance_type = "t3.small"
allowed_ips   = ["10.0.0.0/8", "172.16.0.0/12"]

# Environment-specific: dev.tfvars, prod.tfvars
# terraform apply -var-file=prod.tfvars

# Workspace commands
terraform workspace list              # show all workspaces
terraform workspace new staging       # create staging workspace
terraform workspace select prod       # switch to prod
terraform workspace show              # current workspace name

# Use workspace in config
resource "aws_instance" "web" {
  instance_type = terraform.workspace == "prod" ? "t3.large" : "t3.micro"
}`}</code></pre>

      {/* Section 7: Provisioners & null_resource */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        7. Provisioners and null_resource — Local-exec, Remote-exec, Destroy-time
      </h2>
      <p>
        Provisioners are a <strong>last resort</strong> in Terraform — use them only when there is no native
        resource or provider to accomplish the task. HashiCorp recommends Packer for image building and cloud-init
        for instance bootstrapping instead.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# local-exec — runs on the machine running terraform
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  provisioner "local-exec" {
    command = "echo \${self.public_ip} >> inventory.txt"
  }

  # Destroy-time provisioner
  provisioner "local-exec" {
    when    = destroy
    command = "echo 'Destroying \${self.id}' >> destroy.log"
  }
}

# remote-exec — runs on the remote instance over SSH
resource "aws_instance" "app" {
  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/id_rsa")
      host        = self.public_ip
    }

    inline = [
      "sudo apt-get update -y",
      "sudo apt-get install -y nginx",
      "sudo systemctl enable nginx",
    ]
  }
}

# null_resource — run provisioners without a real resource
# Useful for running scripts when certain inputs change
resource "null_resource" "db_migration" {
  triggers = {
    schema_hash = filemd5("migrations/schema.sql")
  }

  provisioner "local-exec" {
    command = "psql \${var.db_url} -f migrations/schema.sql"
  }
}

# terraform_data (Terraform 1.4+ replacement for null_resource)
resource "terraform_data" "bootstrap" {
  triggers_replace = [aws_instance.web.id]

  provisioner "local-exec" {
    command = "ansible-playbook -i \${self.input} playbook.yml"
  }
  input = aws_instance.web.public_ip
}`}</code></pre>

      {/* Section 8: Terraform Cloud & CI/CD */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        8. Terraform Cloud and CI/CD — GitHub Actions, OIDC Auth, Atlantis
      </h2>
      <p>
        Automating Terraform in CI/CD ensures all infrastructure changes go through code review, are auditable,
        and are applied consistently. Here are two common approaches.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        GitHub Actions with OIDC (No Long-lived AWS Credentials)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# .github/workflows/terraform.yml
name: Terraform

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  id-token: write   # Required for OIDC
  contents: read
  pull-requests: write

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole
          aws-region: us-east-1

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.0

      - name: Terraform Init
        run: terraform init

      - name: Terraform Validate
        run: terraform validate

      - name: Terraform Plan
        id: plan
        run: terraform plan -no-color -out=tfplan
        continue-on-error: true

      - name: Comment Plan on PR
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request'
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: \`## Terraform Plan\n\\\`\\\`\\\`\n\${{ steps.plan.outputs.stdout }}\n\\\`\\\`\\\`\`
            })

      - name: Terraform Apply
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        run: terraform apply -auto-approve tfplan`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Terraform Cloud Workspace
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Configure TFC as backend
terraform {
  cloud {
    organization = "my-org"
    workspaces {
      name = "prod-infrastructure"
    }
  }
}

# Authenticate: terraform login
# Then: terraform init  (migrates state to TFC)

# TFC Variables (set in UI or via API):
# - AWS_ACCESS_KEY_ID      (env var, sensitive)
# - AWS_SECRET_ACCESS_KEY  (env var, sensitive)
# - TF_VAR_db_password     (terraform var, sensitive)`}</code></pre>

      {/* Section 9: Testing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        9. Testing Terraform — Validate, tfsec, checkov, Terratest
      </h2>
      <p>
        A complete Terraform testing strategy has multiple layers: syntax validation, security scanning, policy
        enforcement, and integration tests against real infrastructure.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Layer 1: Built-in validation
terraform fmt -check -recursive    # formatting check
terraform validate                  # syntax + type checking

# Layer 2: Security scanning
# tfsec
brew install tfsec
tfsec . --minimum-severity MEDIUM

# checkov
pip install checkov
checkov -d . --framework terraform

# terrascan
terrascan scan -t aws -d .

# Layer 3: Terratest (Go integration tests)
# tests/vpc_test.go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestVPCModule(t *testing.T) {
    t.Parallel()

    terraformOptions := &terraform.Options{
        TerraformDir: "../modules/vpc",
        Vars: map[string]interface{}{
            "environment": "test",
            "cidr_block":  "10.99.0.0/16",
        },
    }

    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)

    vpcID := terraform.Output(t, terraformOptions, "vpc_id")
    assert.NotEmpty(t, vpcID)
}

# Layer 4: terraform test (built-in, Terraform 1.6+)
# tests/main.tftest.hcl
run "creates_vpc" {
  command = plan

  assert {
    condition     = aws_vpc.main.enable_dns_hostnames == true
    error_message = "DNS hostnames must be enabled"
  }
}`}</code></pre>

      {/* Section 10: Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        10. Best Practices — Directory Structure, Tagging, IAM, Drift Detection
      </h2>
      <p>
        Production Terraform setups follow patterns that maximize reusability, security, and maintainability.
        Here are the most impactful best practices from real-world usage.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Recommended Directory Structure
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`infrastructure/
├── modules/                 # reusable modules (versioned separately)
│   ├── vpc/
│   ├── ecs-cluster/
│   ├── rds-postgres/
│   └── lambda-function/
├── environments/
│   ├── dev/
│   │   ├── backend.tf       # dev state config
│   │   ├── main.tf          # module calls
│   │   ├── variables.tf
│   │   └── dev.tfvars
│   ├── staging/
│   └── prod/
└── global/                  # account-level resources (IAM, Route53)
    ├── iam/
    └── dns/`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Tagging Strategy and Drift Detection
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Enforce consistent tagging via a local
locals {
  required_tags = {
    Environment = var.environment
    Team        = var.team
    CostCenter  = var.cost_center
    ManagedBy   = "terraform"
    Repository  = "github.com/my-org/infrastructure"
    CreatedAt   = timestamp()  # use carefully — causes drift on every plan
  }
}

# Tag all resources by merging
resource "aws_instance" "web" {
  tags = merge(local.required_tags, {
    Name = "web-\${var.environment}"
    Role = "application-server"
  })
}

# Drift detection — run periodically in CI
# Detects manual changes made outside Terraform
terraform plan -detailed-exitcode
# Exit code 0: no changes
# Exit code 1: error
# Exit code 2: changes detected (drift)

# Schedule in GitHub Actions (cron)
on:
  schedule:
    - cron: '0 6 * * *'  # daily at 6am
  workflow_dispatch:      # manual trigger

# Module versioning — pin to specific versions
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "= 5.1.2"  # exact pin for prod; "~> 5.0" for dev
}`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem', marginTop: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Practice</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Remote state with locking</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Prevents concurrent applies corrupting state</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Pin module and provider versions</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Reproducible builds; prevents surprise upgrades</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Mark secrets as <code>sensitive = true</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Redacts values from plan output and logs</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Use OIDC instead of IAM access keys in CI</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No long-lived credentials to rotate or leak</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Scan with tfsec/checkov in every PR</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Catches open security groups, unencrypted volumes early</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Daily drift detection in CI</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Alerts when manual console changes diverge from IaC</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Tool CTA */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '2rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, color: '#15803d', margin: '0 0 0.5rem 0' }}>Quick Tool</p>
        <p style={{ margin: 0 }}>
          Authoring Terraform modules often involves YAML configuration files (Kubernetes manifests, GitHub Actions
          workflows, Helm values). Use the{' '}
          <a href="https://viadreams.cc/en/tools/yaml-formatter" style={{ color: '#16a34a' }}>
            online YAML formatter
          </a>{' '}
          to validate and pretty-print YAML without leaving your browser.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.75rem 0' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Declarative model:</strong> describe desired state; Terraform computes the diff against state and plans changes.</li>
          <li><strong>Remote state is mandatory for teams:</strong> use S3 + DynamoDB or Terraform Cloud to avoid state conflicts.</li>
          <li><strong>Prefer <code>for_each</code> over <code>count</code></strong> for resources with stable identifiers to avoid destructive reindexing.</li>
          <li><strong>Modules + Registry:</strong> use community modules (<code>terraform-aws-modules</code>) as a starting point; pin versions for stability.</li>
          <li><strong>Never store secrets in git:</strong> use environment variables, AWS Secrets Manager, or Terraform Cloud sensitive variables.</li>
          <li><strong>Scan every PR:</strong> tfsec and checkov catch security misconfigurations before they reach production.</li>
          <li><strong>OIDC in CI/CD:</strong> eliminates long-lived AWS access keys; GitHub Actions and GitLab CI both support AWS OIDC natively.</li>
          <li><strong>Drift detection:</strong> run <code>terraform plan -detailed-exitcode</code> daily to catch out-of-band changes.</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is Terraform and how does it differ from CloudFormation?
      </h3>
      <p>
        Terraform is an open-source IaC tool by HashiCorp using HCL, supporting 3000+ providers across all major
        clouds. CloudFormation is AWS-only JSON/YAML. Terraform&apos;s plan/apply workflow, multi-cloud support, and
        richer module ecosystem make it the most popular choice for multi-cloud or cloud-agnostic infrastructure.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is Terraform state and why is it important?
      </h3>
      <p>
        <code>terraform.tfstate</code> maps your HCL to real-world resource IDs. Without it, Terraform cannot
        determine what exists and would attempt to recreate everything. Always use remote state with locking for
        team environments. Never commit state files to git — they may contain sensitive values.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the difference between count and for_each?
      </h3>
      <p>
        <code>count</code> creates indexed resources (0, 1, 2...) — removing the middle element shifts indices and
        triggers destroy/recreate. <code>for_each</code> keys resources by a stable map key — removing one key only
        affects that resource. Prefer <code>for_each</code> in almost all cases.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I manage Terraform secrets securely?
      </h3>
      <p>
        Use <code>TF_VAR_name</code> environment variables, AWS Secrets Manager data sources, HashiCorp Vault, or
        Terraform Cloud sensitive variables. Mark variable declarations as <code>sensitive = true</code> to redact
        them from plan output. Never put secrets in <code>.tf</code> files or commit <code>*.tfvars</code> with
        secret values.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the difference between terraform import and terraform state mv?
      </h3>
      <p>
        <code>terraform import</code> brings an existing cloud resource under Terraform management. You still need to
        write matching HCL (or use <code>-generate-config-out</code> in TF 1.5+). <code>terraform state mv</code>{' '}
        renames a resource address in state without touching real infrastructure — useful when refactoring module structure.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do Terraform workspaces work?
      </h3>
      <p>
        Workspaces store separate state files in <code>terraform.tfstate.d/&lt;workspace&gt;/</code>, allowing
        dev/staging/prod from one configuration directory. Access the current workspace via{' '}
        <code>terraform.workspace</code>. For strong isolation (separate AWS accounts), use separate backend
        configurations instead of workspaces.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What Terraform security scanning tools should I use?
      </h3>
      <p>
        <strong>tfsec</strong> for fast static analysis, <strong>checkov</strong> for broad policy-as-code coverage
        (1000+ checks), <strong>terrascan</strong> for OPA-based policies, and <strong>Sentinel</strong> (Terraform
        Cloud) for enterprise policy enforcement. Integrate all into CI so every PR is scanned before plan runs.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is Atlantis and when should I use it?
      </h3>
      <p>
        Atlantis is an open-source Terraform PR automation server. It auto-runs <code>terraform plan</code> on PRs
        and posts results as comments, then applies on merge after approval. It&apos;s ideal for self-hosted teams who
        want GitOps Terraform workflows without a Terraform Cloud subscription. Pair it with tfsec/checkov for
        security scanning.
      </p>
    </article>
  );
}
