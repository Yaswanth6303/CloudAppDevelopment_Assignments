## Terraform VM (EC2) - ap-south-1

This Terraform configuration provisions a minimal network stack and an EC2 instance in AWS Mumbai (ap-south-1). It avoids relying on a default VPC by creating its own VPC, subnet, route table, internet gateway, and security group.

### What gets created

- **VPC** with DNS support
- **Internet Gateway** and **public route table**
- **Public Subnet** (auto-assign public IPs)
- **Security Group** allowing inbound SSH (22/tcp) from 0.0.0.0/0 and all egress
- **EC2 Instance** (`t2.micro`) in the public subnet

### Prerequisites

- Terraform >= 1.5
- An AWS account and access to region `ap-south-1`
- A valid AMI ID in `ap-south-1` (default in this config: `ami-0144277607031eca2`)

### Credentials setup (recommended: tfvars file)

1. Copy the example credentials file:
   ```bash
   cd terraform-vm
   cp credentials.example.tfvars credentials.tfvars
   ```
2. Edit `credentials.tfvars` and add your actual AWS credentials:
   ```hcl
   access_key = "YOUR_AWS_ACCESS_KEY_ID"
   secret_key = "YOUR_AWS_SECRET_ACCESS_KEY"
   ```

Note: `.gitignore` is configured to exclude `credentials.tfvars` from version control.

### Variables

- `access_key` (sensitive): AWS access key
- `secret_key` (sensitive): AWS secret key
- `vpc_cidr` (default: `10.0.0.0/16`)
- `public_subnet_cidr` (default: `10.0.1.0/24`)

Override any variable via `-var` or a `.tfvars` file.

### Initialize, plan, and apply

```bash
# From the repo root or inside terraform-vm/
cd terraform-vm

terraform init
terraform plan -var-file="credentials.tfvars"
terraform apply -var-file="credentials.tfvars"
```

### Destroy

```bash
terraform destroy -var-file="credentials.tfvars"
```

### SSH access (optional)

If you want to SSH into the instance:

- Create/import a key pair in AWS, then add `key_name = "your-key-name"` to `aws_instance.linux_terraform_vm`.
- Ensure your IP can reach port 22 (the security group currently allows from anywhere; restrict to your IP for better security).

### Common issues

- **No default VPC error**: This config does not rely on a default VPC and creates its own. If you still see errors, ensure you applied from a clean state (`terraform init -reconfigure`).
- **AMI not found/denied**: AMI IDs are region-specific and can change. Replace `ami` in `aws_instance.linux_terraform_vm` with a valid AMI for `ap-south-1` (e.g., a current Amazon Linux 2 AMI).

### Security notes

- Rotate any AWS credentials that were ever committed or shared.
- Prefer AWS environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) or the shared credentials file over embedding in tfvars when possible.
- Least privilege: use an IAM user/role scoped to only the required actions.
