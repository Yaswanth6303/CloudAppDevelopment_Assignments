import axios from "axios";
import readline from "readline";

interface LambdaResponse {
  original: string;
  reversed: string;
  length: number;
  timestamp: string;
}

interface RequestPayload {
  message: string;
}

class ServerlessLambdaClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async callReverseFunction(message: string): Promise<LambdaResponse> {
    try {
      const payload: RequestPayload = { message };
      console.log(`Calling Lambda function with message: "${message}"`);
      console.log(`Endpoint: ${this.baseUrl}/reverse`);

      const response = await axios.post<LambdaResponse>(
        `${this.baseUrl}/reverse`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      console.log("Lambda function called successfully!");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(
            "Server error:",
            error.response.status,
            error.response.data
          );
          throw new Error(
            `Server error: ${error.response.status} - ${JSON.stringify(
              error.response.data
            )}`
          );
        } else if (error.request) {
          console.error("Network error: No response received");
          throw new Error("Network error: Unable to reach the Lambda function");
        }
      }
      console.error("Unexpected error:", error);
      throw error;
    }
  }

  displayResponse(response: LambdaResponse): void {
    console.log("\n Lambda Function Response:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Original message: "${response.original}"`);
    console.log(`Reversed message: "${response.reversed}"`);
    console.log(`Message length: ${response.length} characters`);
    console.log(`Timestamp: ${response.timestamp}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  }
}

async function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const LAMBDA_BASE_URL = process.env.LAMBDA_URL || "";
  const client = new ServerlessLambdaClient(LAMBDA_BASE_URL);

  console.log("🎯 Interactive Lambda Function Caller");
  console.log(
    'Type your message and press Enter to reverse it (type "exit" to quit)\n'
  );

  const askForInput = () => {
    rl.question("Enter message: ", async (input: string) => {
      if (input.toLowerCase() === "exit") {
        console.log("👋 Goodbye!");
        rl.close();
        process.exit(0);
      }

      try {
        const response = await client.callReverseFunction(input);
        client.displayResponse(response);
      } catch (error) {
        console.error("Error:", error);
      }

      askForInput();
    });
  };

  askForInput();
}

interactiveMode();

export { ServerlessLambdaClient, type LambdaResponse, type RequestPayload };
