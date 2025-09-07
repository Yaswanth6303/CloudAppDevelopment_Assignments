'use strict';

module.exports.reverse = async (event, context) => {
  // API Gateway sends the request body as a string; parse JSON safely.
  let requestBody;
  try {
    requestBody = event.body ? JSON.parse(event.body) : {};
  } catch (err) {
    // Malformed JSON – return a 400 error
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON payload" }),
    };
  }

  // Expect a field called "message". If missing, use a default.
  const inputMessage = requestBody.message ?? "No message sent";

  // *** Simple processing ***
  const reversed = inputMessage.split("").reverse().join("");
  const length = inputMessage.length;

  // Build the JSON response
  const response = {
    original: inputMessage,
    reversed,
    length,
    timestamp: new Date().toISOString(),
  };

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  };
};
