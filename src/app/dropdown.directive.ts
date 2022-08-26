import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') foldout: boolean = false;

  constructor() { }

  @HostListener('click') public onClick(): void {
    this.foldout = ! this.foldout;
  }

}
