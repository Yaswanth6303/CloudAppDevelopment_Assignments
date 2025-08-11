# Terraform S3 Bucket Configuration

This Terraform configuration creates an S3 bucket in AWS.

## Setup Instructions

### 1. Configure AWS Credentials

1. Copy the example credentials file:

   ```bash
   cp credentials.example.tfvars credentials.tfvars
   ```

2. Edit `credentials.tfvars` and add your actual AWS credentials and bucket configuration:
   ```hcl
   access_key = "your-actual-access-key"
   secret_key = "your-actual-secret-key"
   bucket_name_suffix = "your-unique-suffix"
   ```

### 2. Initialize Terraform

```bash
terraform init
```

### 3. Plan and Apply

```bash
# Plan the deployment
terraform plan -var-file="credentials.tfvars"

# Apply the configuration
terraform apply -var-file="credentials.tfvars"
```

### 4. Destroy Resources (when needed)

```bash
terraform destroy -var-file="credentials.tfvars"
```

## Security Notes

- The `credentials.tfvars` file is ignored by git to prevent accidental commits
- Never commit your actual AWS credentials to version control
- Consider using AWS IAM roles or environment variables for production environments
- The credentials variables are marked as `sensitive = true` to prevent them from being displayed in logs

## Alternative Authentication Methods

For production environments, consider using:

- AWS CLI configuration (`aws configure`)
- Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)
- IAM roles (for EC2 instances or ECS tasks)
- AWS SSO
