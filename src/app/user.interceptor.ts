import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from './services/cache.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(
    private cacheService: CacheService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const cachedData = this.cacheService.get(request.url)
    if (cachedData) return of(cachedData)
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          this.cacheService.put(request.url, event)
        }
      }));
  }
}
