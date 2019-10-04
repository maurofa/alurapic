import { Component, OnInit, Input } from '@angular/core';

const CLOUD = 'http://localhost:3000/imgs/';

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
