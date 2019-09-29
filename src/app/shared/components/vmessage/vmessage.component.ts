import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vmessage',
  templateUrl: './vmessage.component.html',
  styleUrls: ['./vmessage.component.css']
})
export class VmessageComponent {

  @Input() text = '';

  constructor() { }

}
