class ErrorHandler {
  error: Error | null;

  message: string;

  constructor(error: Error | null = null, message: string = '') {
    // Initialization if needed
    this.error = error;
    this.message = message;
  }

  static handleError(error: Error, context: string) {
    const formattedMessage = `[${context}] ${error.message}`;
    console.error(formattedMessage);
    console.error(error.stack);

    // Todo: Integrate with external logging services if needed
  }

  static createFriendlyErrorMessaage(message: string): string {
    return `An error occurred: ${message}. Please try again or contact support if the issue persists.`;
  }

  static logError(error: Error, context: string) {
    console.error(`Error in ${context}:`, error);
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
