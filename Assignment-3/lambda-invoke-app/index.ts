import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const awsRegion = process.env.AWS_REGION || "us-east-1";
const functionName = process.env.LAMBDA_FUNCTION_NAME;

if (!functionName) {
  console.error("Missing env var LAMBDA_FUNCTION_NAME");
  process.exit(1);
}

const client = new LambdaClient({ region: awsRegion });

async function invokeLambda(message: string): Promise<void> {
  const payload = { body: JSON.stringify({ message }) };

  const command = new InvokeCommand({
    FunctionName: functionName,
    InvocationType: "RequestResponse",
    Payload: Buffer.from(JSON.stringify(payload)),
  });

  const response = await client.send(command);

  const rawPayload = response.Payload
    ? Buffer.from(response.Payload).toString("utf-8")
    : "";

  try {
    const parsed = rawPayload ? JSON.parse(rawPayload) : null;

    if (parsed && parsed.body) {
      const inner = JSON.parse(parsed.body);
      console.log("\nLambda Reverse Response:");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`Original: ${inner.original}`);
      console.log(`Reversed: ${inner.reversed}`);
      console.log(`Length:   ${inner.length}`);
      console.log(`Time:     ${inner.timestamp}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    } else {
      console.log("Lambda raw response:", parsed ?? rawPayload);
    }
  } catch {
    console.log("Lambda raw payload:", rawPayload);
  }
}

// Example usage
invokeLambda("Hello, World!").catch((err) => {
  console.error("Invocation failed:", err);
  process.exit(1);
});
