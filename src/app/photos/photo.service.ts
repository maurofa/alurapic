import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Photo } from './photo/photo';
import { PhotoComment } from './photo/photo-comment';

const API = 'http://localhost:3000';

@Injectable()

export class PhotoService {


  constructor(private http: HttpClient) { }

  listaDoUsuario(login: string) {
    return this.http
      .get<Photo[]>(`${API}/${login}/photos`);
  }

  listaDoUsuarioPaginada(login: string, pagina: number) {
    const params = new HttpParams()
        .append('page', pagina.toString());
    return this.http
        .get<Photo[]>(API + '/' + login + '/photos', { params });
  }

  upload(description: string, allowComments: boolean, file: File) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post(API + '/photos/upload', formData);
  }

  findById(photoId: number) {
    return this.http.get<Photo>(API + '/photos/' + photoId);
  }

  getComments(photoId: number) {
    return this.http.get<PhotoComment[]>(API + '/photos/' + photoId + '/comments');
  }

  addComment(photoId: number, commentText: string) {
    return this.http.post(API + '/photos/' + photoId + '/comments', { commentText });
  }

  removePhoto(photoId: number) {
    return this.http.delete(API + '/photos/' + photoId);
  }

  like(photoId: number) {
    return this.http.post(API + '/photos/' + photoId + '/like', {}, {observe: 'response'})
      .pipe(map(res => true))
      .pipe(catchError(err => {
        return err.status == '304' ? of(false) : throwError(err);
      }));
  }
}
