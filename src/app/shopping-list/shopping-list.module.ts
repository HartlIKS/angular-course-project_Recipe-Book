import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../routing.module";
import { ShoppingItemComponent } from "./shopping-item/shopping-item.component";
import { ShoppingListAddComponent } from "./shopping-list-add/shopping-list-add.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const componentTypes = [
    ShoppingListComponent,
    ShoppingListEditComponent,
    ShoppingListAddComponent,
    ShoppingItemComponent
];

@NgModule({
    declarations: componentTypes,
    exports: componentTypes,
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ]
})
export class ShoppingListModule {}