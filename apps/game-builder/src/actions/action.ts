import { HttpError } from "@choosetale/nestia-type";

export interface SuccessResponse {
  success: true;
}

export interface ErrorResponse {
  success: false;
  error: HttpError | Error;
}
