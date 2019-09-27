import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PhotoListModule,
    PhotoFormModule
  ],
  exports: [  ]
})
export class PhotosModule { }
