import type { ContentfulStatusCode } from 'hono/utils/http-status';

export class AppError extends Error {
  constructor(
    message: string,
    public status: ContentfulStatusCode = 400,
    public code: string = 'APP_ERROR',
  ) {
    super(message);
  }
}
