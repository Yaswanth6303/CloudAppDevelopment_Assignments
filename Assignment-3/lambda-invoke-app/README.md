# bun-lambda-invoke-app

To install dependencies:

```bash
bun install
```

To run:

```bash
LAMBDA_FUNCTION_NAME="my-function" AWS_REGION="us-east-1" bun run index.ts
```

This project was created using `bun init` in bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Overview

This app demonstrates invoking an AWS Lambda function directly using the AWS SDK (no HTTP endpoint). It uses IAM credentials available in the environment.

## Requirements

- AWS credentials (via IAM role or env vars `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)
- `AWS_REGION` (or `AWS_DEFAULT_REGION`)
- `LAMBDA_FUNCTION_NAME` (function name or full ARN, optionally with alias)
- Permission `lambda:InvokeFunction` on the target function

Example caller IAM policy snippet:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "lambda:InvokeFunction",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:my-function"
    }
  ]
}
```

## Usage

Synchronous invocation (waits for result):

```bash
LAMBDA_FUNCTION_NAME="my-function" AWS_REGION="us-east-1" bun run index.ts
```

The request payload is defined in `index.ts` and can be customized.
