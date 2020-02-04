import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root'
})

export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private dataStoragaService: DataStorageService, private recipeSerive: RecipeService, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) {
        const recipes = this.recipeSerive.getRecipes();

        if (recipes.length == 0) {
            return this.dataStoragaService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}