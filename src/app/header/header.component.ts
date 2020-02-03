import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl : 'header.component.html',
    styleUrls: ['header.component.css']

})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub:Subscription; 
    constructor(private dataStorageService: DataStorageService,
                private authSerivce:AuthService) {

    }
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }   

    onFetchData() {
        this.dataStorageService.fetchRecipes()
            .subscribe();
    }

    onLogout() {
        this.authSerivce.logout();
    }

    ngOnInit() {
        this.userSub = this.authSerivce.user.subscribe(
            user => {
                this.isAuthenticated = !!user;                
            }
        )
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}