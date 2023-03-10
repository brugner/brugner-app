import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            url: this.getUrl(request.url),
            setHeaders: {
                Accept: 'application/json'
            }
        });

        return next.handle(request);
    }

    private getUrl(url: string): string {
        url = this.isAbsoluteUrl(url) ? url : environment.apiUrl + '/' + url;

        return url.replace(/([^:]\/)\/+/g, '$1');
    }

    private isAbsoluteUrl(url: string): boolean {
        const absolutePattern = /^https?:\/\//i;

        return absolutePattern.test(url);
    }
}
