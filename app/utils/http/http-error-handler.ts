import { HttpStatusCode } from './http-status-code';
import {
  BadRequestError,
  ForbiddenError,
  HttpError,
  NotFoundError,
  UnauthorizedError,
  InternetServerError,
} from './http-error';
import { FetchAxError } from 'fetch-ax';
import { ERROR_CODE } from '../api/constant';

export interface ErrorResponseData {
  status: number;
  message: string;
}

export const httpErrorHandler = (response: Response, result: ErrorResponseData) => {
  if (!response.ok) {
    const status = response.status;
    const message = result.message;

    switch (status) {
      case HttpStatusCode.Unauthorized:
        throw new UnauthorizedError({
          message,
          response,
        });

      case HttpStatusCode.BadRequest:
        throw new BadRequestError({
          message,
          response,
        });

      case HttpStatusCode.Forbidden:
        throw new ForbiddenError({
          message,
          response,
        });

      case HttpStatusCode.NotFound:
        throw new NotFoundError({
          message,
          response,
        });

      case HttpStatusCode.InternalServerError:
        throw new InternetServerError({
          message,
          response,
        });

      default:
        throw new HttpError(status, message, response);
    }
  }
};

interface ErrorData {
  errorCode: string;
}

export const fetchAxErrorHandler = (error: FetchAxError<ErrorData>) => {
  const status = error.statusCode;
  const errorCode = error.response.data.errorCode;
  const message = errorCode in ERROR_CODE ? ERROR_CODE[errorCode as keyof typeof ERROR_CODE] : errorCode;
  const response = error.response;

  switch (status) {
    case HttpStatusCode.Unauthorized:
      throw new UnauthorizedError({
        message,
        response,
      });

    case HttpStatusCode.BadRequest:
      throw new BadRequestError({
        message,
        response,
      });

    case HttpStatusCode.Forbidden:
      throw new ForbiddenError({
        message,
        response,
      });

    case HttpStatusCode.NotFound:
      throw new NotFoundError({
        message,
        response,
      });

    case HttpStatusCode.InternalServerError:
      throw new InternetServerError({
        message,
        response,
      });

    default:
      throw new HttpError(status, message, response);
  }
};
