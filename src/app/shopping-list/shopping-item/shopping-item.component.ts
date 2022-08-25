import { Component, Input, OnInit } from '@angular/core';
import { IngredientVolume } from '../ingredientvolume.model';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {
  @Input() ingredient: string;
  @Input() amount: IngredientVolume;

  constructor() { }

  ngOnInit(): void {
  }

}
