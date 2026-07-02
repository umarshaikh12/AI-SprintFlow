const handleGeminiError = (error) => {

  console.error("Gemini Error:", error);

  // Rate limit / quota exceeded
  if (error.status === 429) {
    return {
      status: 429,
      message:
        "AI request limit reached. Please try again in a few minutes.",
    };
  }

  // Invalid API key
  if (
    error.message?.toLowerCase().includes("api key") ||
    error.message?.toLowerCase().includes("api_key")
  ) {
    return {
      status: 401,
      message:
        "Invalid Gemini API key. Please check your configuration.",
    };
  }

  // Network error
  if (
    error.message?.toLowerCase().includes("network") ||
    error.message?.toLowerCase().includes("fetch")
  ) {
    return {
      status: 503,
      message:
        "Unable to connect to Gemini AI. Please try again later.",
    };
  }

  // Invalid JSON from Gemini
  if (
    error instanceof SyntaxError ||
    error.message?.includes("Unexpected token")
  ) {
    return {
      status: 500,
      message:
        "Gemini returned an invalid response. Please regenerate.",
    };
  }

  // Fallback
  return {
    status: 500,
    message:
      "Failed to generate AI response. Please try again.",
  };

};

export default handleGeminiError;