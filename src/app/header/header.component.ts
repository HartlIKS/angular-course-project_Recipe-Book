import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RecipeBook } from '../recipes/recipe.service';
import { StorageComponent } from '../storage/storage.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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

  @ViewChild(StorageComponent, {
    static: false,
    read: StorageComponent
  }) storage: StorageComponent;

  constructor(public recipes: RecipeBook) { }
}
