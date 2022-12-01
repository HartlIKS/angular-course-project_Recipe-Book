import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageComponent } from '../storage/storage.component';
import { AppState } from '../store/app.reducer';
import * as App from '../store/app.action';
import { of } from 'rxjs';

const lstore = "recipeBook";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild(StorageComponent, {
    static: false,
    read: StorageComponent
  }) storage: StorageComponent;

  constructor(private store: Store<AppState>) {}

  public saveToLocalStorage() {
    this.store.dispatch(new App.SaveAction(d => {
      localStorage.setItem(lstore, JSON.stringify(d));
      return of(localStorage.getItem(lstore));
    }))
  }

  public loadFromLocalStorage() {
    this.store.dispatch(new App.LoadAction(JSON.parse(localStorage.getItem(lstore))));
  }
}
