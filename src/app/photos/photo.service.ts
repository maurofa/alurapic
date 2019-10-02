import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo/photo';

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
}
