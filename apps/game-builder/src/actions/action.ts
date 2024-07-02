import * as type from "@choosetale/nestia-type";

export interface SuccessResponse {
  success: true;
}

export interface ErrorResponse {
  success: false;
  error: type.HttpError | Error;
}
