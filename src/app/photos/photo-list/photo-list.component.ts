import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter = '';
  temMais = true;
  login: string;
  pagina = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.login = params.userName;
      this.photos = this.activatedRoute.snapshot.data.photos;
    });
  }

  carregaMais() {
    this.photoService.listaDoUsuarioPaginada(this.login, ++this.pagina)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length) {
          this.temMais = false;
        }
      });
  }

  imprime(dado) {
    console.log(dado);
  }
}
