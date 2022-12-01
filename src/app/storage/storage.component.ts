import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as ShoppingList from '../shopping-list/store/shopping-list.action';
import * as App from '../store/app.action';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {
  @ViewChild("fileSelector") fileSelector: ElementRef;
  @ViewChild("downloadInitializer") downloadTrigger: ElementRef;

  constructor(private store: Store<AppState>, private router: Router) { }

  import(): void {
    this.fileSelector.nativeElement.click();
  }

  importFile(files: FileList) {
    if (files.length == 1) {
      this.store.dispatch(new App.StartLoadAction(files[0]))
    }
  }

  private exportSaveData(data: App.SaveData): Observable<Blob> {
    let blob = new Blob([
      JSON.stringify(data)
    ], {
      type: "application/json"
    });
    let downloadTrigger: HTMLAnchorElement = this.downloadTrigger.nativeElement;
    downloadTrigger.href = URL.createObjectURL(blob);
    downloadTrigger.click();
    URL.revokeObjectURL(downloadTrigger.href);
    downloadTrigger.href = null;
    return of(blob);
  }

  export(): void {
    this.store.dispatch(new App.SaveAction(d => this.exportSaveData(d)));
  }
}
