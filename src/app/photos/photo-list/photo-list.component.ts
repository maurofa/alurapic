import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];

  constructor(
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const user = this.activatedRoute.snapshot.params.userName;
    this.photoService
      .listaDoUsuario(user)
      .subscribe(photos => this.photos = photos);
  }

}
