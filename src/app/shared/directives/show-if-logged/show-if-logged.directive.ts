import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
  selector: '[appShowIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

  displayAtual: string;

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.displayAtual = getComputedStyle(this.element.nativeElement).display;
    this.userService.getUser().subscribe(user => {
      if(user) {
        this.renderer.setStyle(this.element.nativeElement, 'display', this.displayAtual);
      } else {
        this.displayAtual = getComputedStyle(this.element.nativeElement).display;
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
      }
    });
  }
}
