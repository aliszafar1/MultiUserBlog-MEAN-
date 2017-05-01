import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.services';

declare var require;
@Component({
    selector: 'dashboard',
    template: require('./dashboard.component.html'),
    styles: [require('./dashboard.component.css')]
})

export class DashboardComponent implements OnInit{
    blogValue = '';
    searchValue = '';
    
    constructor(private as: AppService){ }

    ngOnInit(){
        this.as.allPosts()
            .subscribe((data) => {
                this.blogValue = data;

                console.log('###### Blog Value ######33', this.blogValue);
            })
    }
}