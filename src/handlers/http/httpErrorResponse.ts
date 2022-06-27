import HttpRequestError from "./HttpRequestError";
import httpResponse, { ServerResponseBase } from "./httpResponse";

function httpErrorResponse<TRes extends ServerResponseBase, TErr extends any>(
  res: TRes,
  err: any
) {
  console.error(err);

  const cleanError =
    err instanceof HttpRequestError
      ? err
      : new HttpRequestError("EUNKNOWN", { cause: err });

  const additonalData = {
    code: cleanError.shortCode,
    event_id: cleanError.eventId,
  };

  return httpResponse(
    res,
    cleanError.statusCode,
    cleanError.message,
    process.env.NODE_ENV === "development"
      ? {
          ...additonalData,
          stack: cleanError.stack,
          cause: cleanError.cause,
        }
      : additonalData
  );
}

export default httpErrorResponse;
