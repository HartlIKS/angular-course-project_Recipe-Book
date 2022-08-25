import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() currentPageChange = new EventEmitter<string>();
  _currentPage: string;
  @Input() get currentPage(): string {
    return this._currentPage;
  };
  set currentPage(value: string) {
    this._currentPage = value;
    this.currentPageChange.emit(value);
  }

  @Input() tabs: { [property: string]: string };

  constructor() { }

  ngOnInit(): void {
  }
}
