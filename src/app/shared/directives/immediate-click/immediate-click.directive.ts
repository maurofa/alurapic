import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
  selector: '[appImmediateClick]'
})
export class ImmediateClickDirective implements OnInit {

  constructor(
    private element: ElementRef<any>,
    private platformDetector: PlatformDetectorService
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-unused-expression
    this.platformDetector.isPlatformBrowser() && this.element.nativeElement.click();
  }

}
