import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

const CLOUD = environment.ApiUrl + '/imgs/';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  _url: string;
  @Input() title: string;

  @Input() set url(url: string) {
    this._url = url;
    if (!url.startsWith('data')) {
      this._url = CLOUD + url;
    }
  }

  get url() {
    return this._url;
  }

  constructor() { }

  ngOnInit() { }

}
