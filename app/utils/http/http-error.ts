import { ERROR_CODE } from '../api/constant';

type ErrorConstrutor = {
  message?: string;
  statusCode?: number;
  response?: Partial<Response>;
};

interface HttpResponse extends Response {
  data: { errorCode: keyof typeof ERROR_CODE | string };
}

// Refactor: fetch가 NetworkError랑 TimeoutError 또 자동으로 에러로 던져서 처리가 더 애매하다.
// export class NetworkError extends Error {
//   constructor(readonly message = 'Network Error') {
//     super(message);
//     this.name = 'NetworkError';
//   }
// }

// export class TimeoutError extends Error {
//   constructor(readonly message = 'Timeout Error') {
//     super(message);
//     this.name = 'TimeoutError';
//   }
// }

export class HttpError extends Error {
  constructor(
    readonly statusCode?: number,
    message?: string,
    readonly response?: Partial<HttpResponse>,
  ) {
    super(message);
  }

  getErrorMessage(): string {
    const errorCode = this.response?.data?.errorCode;
    if (!errorCode) return ERROR_CODE.INTERNAL_SEVER_ERROR;
    return errorCode in ERROR_CODE ? ERROR_CODE[errorCode as keyof typeof ERROR_CODE] : errorCode;
  }
}

export class BadRequestError extends HttpError {
  constructor({ message = 'Bad Request', statusCode = 400, response }: ErrorConstrutor) {
    super(statusCode, message, response);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends HttpError {
  constructor({ message = 'Unauthorized', statusCode = 401, response }: ErrorConstrutor) {
    super(statusCode, message, response);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends HttpError {
  constructor({ message = 'Forbidden', statusCode = 403, response }: ErrorConstrutor) {
    super(statusCode, message, response);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends HttpError {
  constructor({ message = 'Not Found', statusCode = 404, response }: ErrorConstrutor) {
    super(statusCode, message, response);
    this.name = 'NotFoundError';
  }
}

export class InternetServerError extends HttpError {
  constructor({ message = 'Internal Server Error', statusCode = 500, response }: ErrorConstrutor) {
    super(statusCode, message, response);
    this.name = 'InternetServerError';
  }
}
