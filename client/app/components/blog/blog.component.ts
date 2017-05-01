import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppService } from '../../services/app.services';
import 'rxjs/add/operator/switchMap';
import { FlashMessagesService } from 'angular2-flash-messages';

declare var require
@Component({
    selector: 'blog',
    template: require('./blog.component.html'),
    styles: [require('./blog.component.css')]
})

export class BlogComponent implements OnInit {
    uExist;
    id;
    blogDetail;
    data$;
    constructor(private route: ActivatedRoute, private as: AppService) {
        this.uExist = this.as.checkCookie();
    }
    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.as.getPostByID(id)
                    .subscribe((data) => {
                        this.blogDetail = data[0];
                        console.log('##### PostByID #####3', this.blogDetail);
                    })
            })
    }

    onComment(body, id){
        console.log('######### Comment ##########', id);
        this.as.addComment(body, id);
    }

    onDelete(id, cID){
        console.log('#### delete id 3##############', id);
        this.as.deleteComment(id, cID);
    }

    onReplyCmt(body, id, cID){
        console.log('###############3 REply ' + body + ' ####### post id ######3' + id + '####### Comment ID' + cID);
        this.as.replyCmt(body, id, cID);
        //  .subscribe((res) => {
        //      console.log('######## Replied to Comment ######3')
        // });;
    }
}