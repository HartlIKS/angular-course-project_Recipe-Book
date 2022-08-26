import { Component } from '@angular/core';
import { RecipeBook } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  constructor(public recipeBook: RecipeBook) { }
}
