import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) slform:NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem: Ingredient;  

  constructor(private slservice: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slservice.startedEditing
      .subscribe(
        (index: number) => {          
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slservice.getIngredient(index);
          this.slform.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;  
    const newIngredient = new Ingredient(value.name, value.amount);  
    if (this.editMode) {
      this.slservice.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slservice.addIngredient(newIngredient);
    }
    form.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.slform.reset();
    this.editMode = false;
  }
  
  onDelete() {
    this.slservice.deleteIngredient(this.editedItemIndex);
    this.onClear(); 
  }
}
