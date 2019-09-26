import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter = '';
  debounce: Subject<string> = new Subject<string>();
  temMais = true;
  login: string;
  pagina = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.login = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data.photos;
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(dado => this.filter = dado);
  }

  ngOnDestroy() {
    this.debounce.unsubscribe();
  }

  carregaMais() {
    this.photoService.listaDoUsuarioPaginada(this.login, ++this.pagina)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
        if (!photos.length) {
          this.temMais = false;
        }
      });
  }
}
