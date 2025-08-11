// handler.js
"use strict";

/**
 * Simple Lambda that returns a static string.
 *
 * @param {Object} event   – API Gateway (or test) event payload
 * @param {Object} context – Lambda context (unused)
 * @returns {Object} HTTP response object expected by API Gateway
 */
module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      // Important for browsers / API clients
      "Content-Type": "text/plain",
    },
    body: "👋 Hello from a serverless function!", // <-- static text
  };
};
