export default function TerraformInfrastructureAsCode() {
  return (
    <>
      <h2>Terraform Infrastructure as Code: From Beginner to Advanced</h2>
      <p>
        Terraform by HashiCorp is the industry-standard tool for Infrastructure as Code (IaC). It lets
        you define cloud resources — servers, databases, networks, DNS records, and more — in declarative
        configuration files, then provisions and manages them through a consistent workflow. This guide
        takes you from basic concepts through production-ready patterns including modules, state management,
        workspaces, and CI/CD integration.
      </p>

      <h2>Core Concepts</h2>
      <table>
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Provider</td><td>Plugin that interacts with a cloud API (AWS, GCP, Azure, etc.)</td></tr>
          <tr><td>Resource</td><td>An infrastructure object to create and manage</td></tr>
          <tr><td>Data Source</td><td>Read-only query for existing infrastructure</td></tr>
          <tr><td>Variable</td><td>Input parameter for configuration</td></tr>
          <tr><td>Output</td><td>Exported value from a configuration</td></tr>
          <tr><td>Module</td><td>Reusable, self-contained package of resources</td></tr>
          <tr><td>State</td><td>JSON file mapping config to real infrastructure</td></tr>
          <tr><td>Plan</td><td>Preview of changes Terraform will make</td></tr>
        </tbody>
      </table>

      <h2>Getting Started</h2>
      <pre><code className="language-bash">{`# Install Terraform (macOS)
brew install terraform

# Or download directly
# https://developer.hashicorp.com/terraform/downloads

# Verify installation
terraform version

# Initialize a new project
mkdir my-infra && cd my-infra
terraform init`}</code></pre>

      <h3>Your First Configuration</h3>
      <pre><code className="language-hcl">{`# main.tf — provision an AWS EC2 instance

terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Variables
variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

# Data source — find the latest Ubuntu AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]  # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-noble-24.04-amd64-server-*"]
  }
}

# Resource — EC2 instance
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type

  tags = {
    Name        = "web-server-\${var.environment}"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# Outputs
output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.web.id
}

output "public_ip" {
  description = "Public IP address"
  value       = aws_instance.web.public_ip
}`}</code></pre>

      <h3>The Terraform Workflow</h3>
      <pre><code className="language-bash">{`# 1. Initialize — download providers and modules
terraform init

# 2. Plan — preview changes without applying
terraform plan -out=tfplan

# 3. Apply — create/update resources
terraform apply tfplan

# Or plan and apply in one step (with confirmation prompt)
terraform apply

# 4. Inspect current state
terraform show
terraform state list

# 5. Destroy all resources
terraform destroy`}</code></pre>

      <h2>Variables and Locals</h2>
      <pre><code className="language-hcl">{`# variables.tf — input variables

variable "project_name" {
  type        = string
  description = "Name of the project"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "subnet_config" {
  type = map(object({
    cidr_block = string
    public     = bool
  }))
  default = {
    public-1  = { cidr_block = "10.0.1.0/24", public = true }
    public-2  = { cidr_block = "10.0.2.0/24", public = true }
    private-1 = { cidr_block = "10.0.10.0/24", public = false }
    private-2 = { cidr_block = "10.0.11.0/24", public = false }
  }
}

variable "db_password" {
  type      = string
  sensitive = true  # Hidden in plan output and logs
}

# locals — computed values
locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
    UpdatedAt   = timestamp()
  }

  public_subnets  = { for k, v in var.subnet_config : k => v if v.public }
  private_subnets = { for k, v in var.subnet_config : k => v if !v.public }

  name_prefix = "\${var.project_name}-\${var.environment}"
}`}</code></pre>

      <h3>Setting Variable Values</h3>
      <pre><code className="language-bash">{`# terraform.tfvars (auto-loaded)
project_name = "myapp"
environment  = "prod"
aws_region   = "us-west-2"

# Environment-specific files
# terraform.tfvars        — shared defaults
# prod.tfvars             — production overrides

terraform plan -var-file="prod.tfvars"

# CLI variables
terraform apply -var="instance_type=t3.large"

# Environment variables (prefixed with TF_VAR_)
export TF_VAR_db_password="supersecret"
terraform apply`}</code></pre>

      <h2>Modules — Reusable Infrastructure</h2>
      <pre><code className="language-hcl">{`# modules/vpc/main.tf
variable "name" { type = string }
variable "cidr" { type = string }
variable "azs"  { type = list(string) }

resource "aws_vpc" "this" {
  cidr_block           = var.cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = { Name = var.name }
}

resource "aws_subnet" "public" {
  count             = length(var.azs)
  vpc_id            = aws_vpc.this.id
  cidr_block        = cidrsubnet(var.cidr, 8, count.index)
  availability_zone = var.azs[count.index]

  map_public_ip_on_launch = true

  tags = { Name = "\${var.name}-public-\${count.index}" }
}

resource "aws_subnet" "private" {
  count             = length(var.azs)
  vpc_id            = aws_vpc.this.id
  cidr_block        = cidrsubnet(var.cidr, 8, count.index + 100)
  availability_zone = var.azs[count.index]

  tags = { Name = "\${var.name}-private-\${count.index}" }
}

output "vpc_id"             { value = aws_vpc.this.id }
output "public_subnet_ids"  { value = aws_subnet.public[*].id }
output "private_subnet_ids" { value = aws_subnet.private[*].id }

# --- Using the module ---
# main.tf (root)
module "vpc" {
  source = "./modules/vpc"

  name = "\${local.name_prefix}-vpc"
  cidr = var.vpc_cidr
  azs  = var.availability_zones
}

# Reference module outputs
resource "aws_instance" "web" {
  subnet_id = module.vpc.public_subnet_ids[0]
  # ...
}

# Registry modules
module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "4.0.0"

  bucket = "\${local.name_prefix}-assets"
  acl    = "private"

  versioning = { enabled = true }
}`}</code></pre>

      <h2>Remote State Management</h2>
      <pre><code className="language-hcl">{`# backend.tf — store state in S3 with DynamoDB locking
terraform {
  backend "s3" {
    bucket         = "mycompany-terraform-state"
    key            = "prod/us-east-1/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

# Bootstrap the state bucket (run once manually)
# aws s3api create-bucket --bucket mycompany-terraform-state --region us-east-1
# aws s3api put-bucket-versioning --bucket mycompany-terraform-state \
#   --versioning-configuration Status=Enabled
# aws dynamodb create-table --table-name terraform-locks \
#   --attribute-definitions AttributeName=LockID,AttributeType=S \
#   --key-schema AttributeName=LockID,KeyType=HASH \
#   --billing-mode PAY_PER_REQUEST

# Cross-stack references with remote state data source
data "terraform_remote_state" "networking" {
  backend = "s3"
  config = {
    bucket = "mycompany-terraform-state"
    key    = "prod/networking/terraform.tfstate"
    region = "us-east-1"
  }
}

resource "aws_instance" "app" {
  subnet_id = data.terraform_remote_state.networking.outputs.private_subnet_ids[0]
  # ...
}`}</code></pre>

      <h2>Advanced Patterns</h2>
      <h3>for_each and Dynamic Blocks</h3>
      <pre><code className="language-hcl">{`# Create multiple resources with for_each
variable "services" {
  type = map(object({
    port     = number
    protocol = string
    health   = string
  }))
  default = {
    api     = { port = 8080, protocol = "HTTP", health = "/health" }
    auth    = { port = 8081, protocol = "HTTP", health = "/ping" }
    grpc    = { port = 50051, protocol = "GRPC", health = "/" }
  }
}

resource "aws_lb_target_group" "services" {
  for_each = var.services

  name        = "\${local.name_prefix}-\${each.key}"
  port        = each.value.port
  protocol    = each.value.protocol
  vpc_id      = module.vpc.vpc_id
  target_type = "ip"

  health_check {
    path     = each.value.health
    port     = each.value.port
    protocol = each.value.protocol
  }

  tags = merge(local.common_tags, { Service = each.key })
}

# Dynamic blocks for repeated nested blocks
resource "aws_security_group" "app" {
  name   = "\${local.name_prefix}-app"
  vpc_id = module.vpc.vpc_id

  dynamic "ingress" {
    for_each = var.services
    content {
      from_port   = ingress.value.port
      to_port     = ingress.value.port
      protocol    = "tcp"
      cidr_blocks = ["10.0.0.0/16"]
      description = "Allow \${ingress.key} traffic"
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`}</code></pre>

      <h3>Lifecycle Rules and Moved Blocks</h3>
      <pre><code className="language-hcl">{`resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type

  lifecycle {
    create_before_destroy = true   # Zero-downtime replacement
    prevent_destroy       = true   # Block accidental deletion
    ignore_changes        = [tags] # Don't revert manual tag changes
  }
}

# Terraform 1.1+ — refactor without destroying
moved {
  from = aws_instance.web
  to   = aws_instance.application
}

# Import existing resources (Terraform 1.5+)
import {
  id = "i-0123456789abcdef0"
  to = aws_instance.legacy_server
}`}</code></pre>

      <h2>CI/CD Integration</h2>
      <pre><code className="language-yaml">{`# .github/workflows/terraform.yml
name: Terraform

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pull-requests: write

jobs:
  plan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.0

      - name: Terraform Init
        run: terraform init
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Terraform Format Check
        run: terraform fmt -check -recursive

      - name: Terraform Validate
        run: terraform validate

      - name: Terraform Plan
        id: plan
        run: terraform plan -no-color -out=tfplan
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Post Plan to PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const output = \`#### Terraform Plan
            \\\`\\\`\\\`
            \${{ steps.plan.outputs.stdout }}
            \\\`\\\`\\\`\`;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: output,
            });

  apply:
    needs: plan
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init && terraform apply -auto-approve
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}`}</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Always use remote state</strong> — never commit .tfstate files to git</li>
        <li><strong>Enable state locking</strong> — DynamoDB for S3, native for Terraform Cloud</li>
        <li><strong>Pin provider versions</strong> — use <code>~&gt; 5.0</code> to allow minor updates only</li>
        <li><strong>Use modules</strong> — extract reusable patterns (VPC, ECS cluster, RDS) into modules</li>
        <li><strong>Separate environments</strong> — use workspaces or separate state files per environment</li>
        <li><strong>Plan before apply</strong> — always review <code>terraform plan</code> output in CI</li>
        <li><strong>Mark sensitive variables</strong> — use <code>sensitive = true</code> to hide secrets</li>
        <li><strong>Tag everything</strong> — use <code>locals.common_tags</code> for consistent tagging</li>
        <li><strong>Use terraform fmt</strong> — enforce consistent formatting in CI</li>
      </ul>

      <p>
        When working with Terraform configurations, our <a href="/en/tools/json-formatter">JSON Formatter</a> helps
        validate state files and plan outputs. For understanding CIDR notation in VPC configurations, try our{" "}
        <a href="/en/tools/ip-calculator">IP Calculator</a>. Read our{" "}
        <a href="/en/blog/docker-compose-cheat-sheet">Docker Compose Cheat Sheet</a> for containerizing
        applications that Terraform provisions.
      </p>
    </>
  );
}
