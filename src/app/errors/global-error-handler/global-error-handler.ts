import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as StackTrace from 'stacktrace-js';
import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {}
    handleError(error: any): void { 
        console.log('passei por aqui.');

        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService);
        const url = location instanceof PathLocationStrategy
            ? location.path()
            : '';
        const message = error.message ? error.message : error.toString();
        const router = this.injector.get(Router);
        if (environment.production) {
            router.navigate(['']);
        }
        StackTrace.fromError(error)
            .then(stackFrame => {
                const stackAsString = stackFrame
                    .map(st => st.toString())
                    .join('\n');
                console.log(message);
                console.log(stackAsString);
                serverLogService.log({ message, url, userName: userService.getUserName(), stack: stackAsString}).subscribe(
                    () => console.log('Erro informado no LogServer.'),
                    err => {
                        console.log(err);
                        console.log('Não foi possível enviar o erro ao LogServer.');
                    }
                );
            });
    }
}
