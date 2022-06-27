class HttpRequestError extends Error {
  public shortCode: string;
  public eventId: number;
  public statusCode: number = 500;
  public message: string = "An unknown error has occured";

  constructor(
    shortCode: string,
    statusCode?: number,
    message?: string,
    options?: ErrorOptions
  );
  constructor(shortCode: string, options?: ErrorOptions);
  constructor(
    shortCode: string,
    statusCodeOrOptions: unknown = 500,
    message?: string,
    options?: ErrorOptions
  ) {
    const constructorOptions: ErrorOptions | undefined =
      statusCodeOrOptions && typeof statusCodeOrOptions === "object"
        ? (statusCodeOrOptions as ErrorOptions)
        : options;

    super(message, constructorOptions);

    // init class properties
    this.name = this.constructor.name;
    this.shortCode = shortCode;
    this.eventId = Date.now();
    if (typeof statusCodeOrOptions === "number") {
      this.statusCode = statusCodeOrOptions;
    }
    if (message) {
      this.message = message;
    }
  }
}

export default HttpRequestError;
