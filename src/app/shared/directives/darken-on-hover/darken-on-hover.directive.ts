import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDarkenOnHover]'
})
export class DarkenOnHoverDirective {

  @Input() brightness = '70%';
  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }

  @HostListener('mouseover')
  darkeOn() {
    this.render.setStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
  }

  @HostListener('mouseleave')
  darkOff() {
    this.render.setStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
  }
}
