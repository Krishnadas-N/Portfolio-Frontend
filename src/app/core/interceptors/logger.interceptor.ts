import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { tap } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const logger =inject(NGXLogger)
  logger.log('Request URL: ' + req.url);
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      logger.log(req.url, 'returned a response with status', event.status)
    }
  }));
};
