import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ShoppingItemComponent } from "./shopping-item/shopping-item.component";
import { ShoppingListAddComponent } from "./shopping-list-add/shopping-list-add.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
        ShoppingListAddComponent,
        ShoppingItemComponent
    ],
    imports: [
        BrowserModule,
        ShoppingListRoutingModule,
        FormsModule
    ]
})
export class ShoppingListModule { }