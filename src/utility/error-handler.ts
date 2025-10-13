class ErrorHandler {
  error: Error | null;

  message: string;

  constructor(error: Error | null = null, message: string = '') {
    this.error = error;
    this.message = message;
  }

  static logError(error: Error, context: string) {
    const formattedMessage = `[${context}] ${error.message}`;
    console.error(formattedMessage);
    console.error(error.stack);

    // Todo: Integrate with external logging services if needed
  }

  static createFriendlyErrorMessaage(message: string): string {
    return `An error occurred: ${message}. Please try again or contact support if the issue persists.`;
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
