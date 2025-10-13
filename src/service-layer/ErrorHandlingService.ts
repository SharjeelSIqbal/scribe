class ErrorHandler {
  constructor() {
    this.logError = this.logError.bind(this);
    this.createFriendlyErrorMessage = this.createFriendlyErrorMessage.bind(this);
  }

  logError(error: Error, context: string): void {
    const formattedMessage = `[${context}] ${error.message}`;
    console.error(formattedMessage);
    console.error(error.stack);

    // Todo: Integrate with external logging services if needed
  }

  createFriendlyErrorMessage(message: string): void {
    console.log(
      `An error occurred: ${message}. Please try again or contact support if the issue persists.`
    );
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
