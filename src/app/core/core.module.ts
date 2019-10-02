import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './auth/request-interceptor';

import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [ HeaderComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ HeaderComponent ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
