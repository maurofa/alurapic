import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  debounce: Subject<string> = new Subject<string>();
  @Output() outTyping  = new EventEmitter<string>();
  @Input() filter = '';

  constructor() { }

  ngOnInit() {
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(dado => this.outTyping.emit(dado));
  }

  ngOnDestroy() {
    this.debounce.unsubscribe();
  }

}
