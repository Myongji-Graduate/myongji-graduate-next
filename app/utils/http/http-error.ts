type ErrorConstrutor = {
  message?: string;
  statusCode?: number;
  response?: Partial<Response>;
};

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
    readonly response?: Partial<Response>,
  ) {
    super(message);
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
