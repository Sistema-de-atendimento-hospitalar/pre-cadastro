import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { LoadingService } from './service/loading/loading.service';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private _loading: LoadingService,
        private _snackBar: MatSnackBar
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loading.setLoading(true, request.url);
        return next.handle(request)
            .pipe(catchError((error: HttpErrorResponse) => {
                this._loading.setLoading(false, request.url);
                let errorMessage;
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error: ${error.error.message}`;
                } else if (error.error instanceof ProgressEvent) {
                    errorMessage = `Verifique sua conexão com a internet e tente novamente!`
                }

                if (errorMessage) {
                    this._snackBar.open(errorMessage, "Error");
                }

                return throwError(error);
            }))
            .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    this._loading.setLoading(false, request.url);
                }
                return evt;
            }));
    }
}