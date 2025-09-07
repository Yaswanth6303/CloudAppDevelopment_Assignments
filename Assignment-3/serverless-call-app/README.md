# Serverless Lambda Function Caller

This TypeScript application demonstrates how to call your serverless Lambda function that reverses messages.

## Features

- ✅ Type-safe HTTP client for calling Lambda functions
- ✅ Comprehensive error handling
- ✅ Beautiful console output with emojis
- ✅ Multiple usage examples
- ✅ Interactive mode for testing
- ✅ Built with Bun runtime for fast execution

## Setup

1. **Install dependencies:**

   ```bash
   bun install
   ```

2. **Get your Lambda function URL:**
   After deploying your serverless function, you'll get a URL like:

   ```
   https://abc123def4.execute-api.ap-south-1.amazonaws.com
   ```

3. **Update the URL in the code:**
   Open `index.ts` and replace `https://your-api-gateway-url.amazonaws.com` with your actual Lambda function URL.

## Usage

### Basic Usage

```bash
bun run start
```

### Development Mode (with auto-reload)

```bash
bun run dev
```

### Interactive Mode

Uncomment the `interactiveMode()` call in `index.ts` to run in interactive mode where you can type messages and see them reversed in real-time.

## Code Structure

### ServerlessLambdaClient Class

- `callReverseFunction(message: string)` - Calls the Lambda function with a message
- `displayResponse(response: LambdaResponse)` - Formats and displays the response

### Types

- `LambdaResponse` - Interface for the Lambda function response
- `RequestPayload` - Interface for the request payload

## Example Output

```
🚀 Example 1: Simple message
🔄 Calling Lambda function with message: "Hello World!"
📡 Endpoint: https://your-api-gateway-url.amazonaws.com/reverse
✅ Lambda function called successfully!

📊 Lambda Function Response:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Original message: "Hello World!"
🔄 Reversed message: "!dlroW olleH"
📏 Message length: 12 characters
⏰ Timestamp: 2024-01-15T10:30:45.123Z
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Error Handling

The client handles various error scenarios:

- Network connectivity issues
- Server errors (4xx, 5xx responses)
- Timeout errors (10-second timeout)
- Invalid JSON responses
- Malformed requests

## Customization

You can easily customize the client by:

- Changing the timeout duration
- Adding authentication headers
- Modifying the request/response interfaces
- Adding retry logic
- Implementing caching

## Integration

To use this client in your own projects:

```typescript
import { ServerlessLambdaClient } from "./index";

const client = new ServerlessLambdaClient("https://your-lambda-url.com");
const response = await client.callReverseFunction("Your message here");
console.log(response.reversed);
```
