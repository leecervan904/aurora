import type { Observable } from 'rxjs'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common'
import {
  Injectable,
} from '@nestjs/common'
import { getResponserOptions } from '@app/decorators/responser.decorator'
import { CustomError } from '@app/errors/custom.error'
import * as TEXT from '@app/constants/text.constant'

/**
 * @class ErrorInterceptor
 * @classdesc catch error when controller Promise rejected
 */
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle()
    const target = context.getHandler()
    const { errorCode, errorMessage } = getResponserOptions(target)
    return call$.pipe(
      catchError((error) => {
        return throwError(
          () =>
            new CustomError(
              { message: errorMessage || TEXT.HTTP_DEFAULT_ERROR_TEXT, error },
              errorCode,
            ),
        )
      }),
    )
  }
}
