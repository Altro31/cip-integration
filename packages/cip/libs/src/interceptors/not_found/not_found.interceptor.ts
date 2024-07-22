import {CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'

export function NotFoundInterceptor(message: string) {

  @Injectable()
  class NotFound implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next
        .handle()
        .pipe(map(this.filter))
    }

    filter(value: any) {
      if (!value) throw new NotFoundException(message)
      return value
    }
  }


  return NotFound
}
