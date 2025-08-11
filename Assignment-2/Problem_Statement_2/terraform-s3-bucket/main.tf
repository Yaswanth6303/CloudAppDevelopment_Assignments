terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

# AWS Credentials Variables
variable "access_key" {
  description = "AWS Access Key"
  type        = string
  sensitive   = true
}

variable "secret_key" {
  description = "AWS Secret Key"
  type        = string
  sensitive   = true
}

# Configure the AWS Provider
provider "aws" {
  region     = "ap-south-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

# S3 Bucket Configuration
variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
  default     = "cad-assignment-bucket"
}

variable "bucket_name_suffix" {
  description = "Suffix to make bucket name unique"
  type        = string
  default     = ""
}

resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket_name_suffix != "" ? "${var.bucket_name}-${var.bucket_name_suffix}" : var.bucket_name

  tags = {
    Name        = "My bucket"
    Project     = "CAD Assignment"
  }
}

resource "aws_s3_object" "file" {
  bucket = aws_s3_bucket.bucket.id
  key    = "file.txt"
  source = "file.txt"
  etag   = filemd5("file.txt")

  tags = {
    Name = "Uploaded File"
  }
}