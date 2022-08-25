import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe = null;

  constructor() { }

  ngOnInit(): void {
  }

  public onSelectionChange(event: Recipe): void {
    this.selectedRecipe = event;
  }
}
