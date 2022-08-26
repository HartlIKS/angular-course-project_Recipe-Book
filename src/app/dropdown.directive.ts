import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') foldout: boolean = false;

  @HostListener('click') public onClick(): void {
    this.foldout = ! this.foldout;
  }
}
