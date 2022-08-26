import { Component } from '@angular/core';
import { RecipeBook } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  constructor(public recipeBook: RecipeBook) {}
}
