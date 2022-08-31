import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecipeBook } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {
  @ViewChild("fileSelector") fileSelector: ElementRef;
  @ViewChild("downloadInitializer") downloadTrigger: ElementRef;

  constructor(private recipeBook: RecipeBook, private shoppingList: ShoppingListService) {}

  load(): void {
    this.fileSelector.nativeElement.click();
  }

  loadFile(files : FileList) {
    if(files.length == 1) {
      files[0]
      .text()
      .then(JSON.parse)
      .then(parsed => {
        this.recipeBook.load(parsed.recipes);
        this.shoppingList.load(parsed.shoppingList);
      });
    }
  }

  save(): void {
    let blob = new Blob([
      JSON.stringify({
        recipes: this.recipeBook.getCurrentRecipes(),
        shoppingList: this.shoppingList.getCurrentItems()
      })
    ], {
      type: "application/json"
    });
    let downloadTrigger: HTMLAnchorElement = this.downloadTrigger.nativeElement;
    downloadTrigger.href = URL.createObjectURL(blob);
    downloadTrigger.click();
    URL.revokeObjectURL(downloadTrigger.href);
    downloadTrigger.href = null;
  }
}