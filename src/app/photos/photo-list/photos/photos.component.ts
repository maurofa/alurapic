import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from '../../photo/photo';
import { PhotosModule } from '../../photos.module';
import { RelativeInjectorLocationFlags } from '@angular/core/src/render3/interfaces/injector';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = [];
  rows: Photo[][] = [];

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.photos) {
      this.rows = this.agrupaColunas(this.photos);
    }
  }

  agrupaColunas(photos: Photo[]) {
    const retorno = [];
    for (let i = 0; i < photos.length; i += 3) {
      retorno.push(photos.slice(i, i + 3));
    }
    return retorno;
  }
}
