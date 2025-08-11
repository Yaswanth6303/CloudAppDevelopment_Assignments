# AWS HTTP API Call

A serverless application built with AWS Lambda and API Gateway using the Serverless Framework. This project demonstrates two simple HTTP endpoints: a hello world function and a text reversal service.

## 🚀 Features

- **Hello World Endpoint**: Returns a simple greeting message
- **Text Reversal Endpoint**: Reverses input text and provides metadata
- **Serverless Architecture**: Built with AWS Lambda and API Gateway
- **JSON API**: RESTful endpoints with proper JSON responses
- **Error Handling**: Comprehensive error handling for malformed requests

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20.x or higher)
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate credentials
- [Serverless Framework](https://www.serverless.com/) CLI

### Installing Serverless Framework

```bash
npm install -g serverless
```

## 🏗️ Project Structure

```
aws-http-api-call/
├── handler.js           # Hello world Lambda function
├── reverse-handler.js   # Text reversal Lambda function
├── serverless.yml       # Serverless Framework configuration
├── package-lock.json    # Node.js dependencies lock file
└── README.md           # This file
```

## 🚀 Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Deploy to AWS

```bash
serverless deploy
```

The deployment will create:

- AWS Lambda functions
- API Gateway HTTP API
- IAM roles and policies
- CloudWatch log groups

### 3. Get API Endpoints

After deployment, you'll see output similar to:

```
endpoints:
  GET - https://xxxxx.execute-api.ap-south-1.amazonaws.com/
  POST - https://xxxxx.execute-api.ap-south-1.amazonaws.com/reverse
```

## 📡 API Endpoints

### 1. Hello World Endpoint

**GET** `/`

Returns a simple greeting message.

#### Response

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "text/plain"
  },
  "body": "👋 Hello from a serverless function!"
}
```

#### Example Usage

```bash
curl https://your-api-id.execute-api.ap-south-1.amazonaws.com/
```

### 2. Text Reversal Endpoint

**POST** `/reverse`

Reverses the input text and provides metadata.

#### Request Body

```json
{
  "message": "Hello World"
}
```

#### Response

```json
{
  "original": "Hello World",
  "reversed": "dlroW olleH",
  "length": 11,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Example Usage

```bash
curl -X POST https://your-api-id.execute-api.ap-south-1.amazonaws.com/reverse \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello World"}'
```

#### Error Response (Invalid JSON)

```json
{
  "error": "Invalid JSON payload"
}
```

## 🔧 Configuration

The project is configured in `serverless.yml`:

- **Runtime**: Node.js 20.x
- **Region**: ap-south-1 (Mumbai)
- **Organization**: cadassignments2025
- **Service Name**: aws-http-api-call

## 🧪 Testing

### Local Testing

You can test the functions locally using the Serverless Framework:

```bash
# Test hello function
serverless invoke local --function hello

# Test reverse function
serverless invoke local --function reverse --data '{"body": "{\"message\": \"Hello World\"}"}'
```

### API Testing

Use tools like curl, Postman, or any HTTP client to test the deployed endpoints.

## 🗑️ Cleanup

To remove all deployed resources:

```bash
serverless remove
```

This will delete:

- Lambda functions
- API Gateway
- IAM roles
- CloudWatch log groups

## 📝 Code Documentation

### handler.js

Contains the `hello` function that returns a static greeting message.

### reverse-handler.js

Contains the `reverse` function that:

- Parses JSON request body
- Handles malformed JSON gracefully
- Reverses the input text
- Returns metadata including original text, reversed text, length, and timestamp

## 🔒 Security

- Functions use minimal IAM permissions
- Input validation for JSON payloads
- Proper error handling to prevent information disclosure

## 📊 Monitoring

Logs are automatically sent to CloudWatch. You can view them in the AWS Console or using AWS CLI:

```bash
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/aws-http-api-call"
```