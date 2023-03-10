import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private toastrService: ToastrService,
        private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((response) => {
                    let errorMessage = '';

                    if (response.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${response.error.message}`;
                    } else {

                        // server-side error
                        if (response.status === 0) {
                            errorMessage = 'Connection refused (0)';
                            this.router.navigate(['/error/0']);
                        } else {
                            if (response.status === 500 || response.status === 401 || response.status === 404) {
                                this.router.navigate(['/error/' + response.status]);
                            } else {
                                errorMessage = response.error.title;
                            }
                        }
                    }

                    if (errorMessage !== '') {
                        this.toastrService.error(errorMessage, 'Error');
                    }

                    return throwError(() => new Error(errorMessage));
                })
            );
    }
}
