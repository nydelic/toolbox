export interface ServerResponseBase {
  status: (code: number) => void;
  json: (ob: object) => void;
  end: () => void;
}

export type CustomNextHttpResponse<TAdditionalData extends object> = {
  status: number;
  message: string;
  data?: TAdditionalData;
};

function httpResponse<
  TAdditionalData extends object,
  TRes extends ServerResponseBase
>(res: TRes, code: number, message: string, additionalData?: TAdditionalData) {
  const responseJson: CustomNextHttpResponse<TAdditionalData> = {
    status: code,
    message: message,
    data: additionalData,
  };
  res.status(code);
  res.json(responseJson);
  res.end();
  return responseJson;
}

export default httpResponse;
