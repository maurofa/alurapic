import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoService } from './photo.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PhotoListModule,
    PhotoFormModule
  ],
  providers: [ PhotoService ],
  declarations: []
})
export class PhotosModule { }
