import { Component  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.services';

declare var require;
@Component({
    selector: 'add-post',
    template: require('./addPost.component.html'),
    styles: [require('./addPost.component.css')]
})

export class AddPostComponent{
    blogForm: FormGroup;
    constructor(fb: FormBuilder, private as: AppService) {
        this.blogForm = fb.group({
            'title': '',
            'body': '',
            'category':'',
            // 'author':''
        })
     }

     onPost(value){
         event.preventDefault();
         console.log('######## Post VAlue ########3', value);
         this.as.postBlog(value);
     }

     onChange(e) {
            var file = e.path[0].files[0];
            var fullPath = e.path[0].value;
            this.as.onFileUpload(file, fullPath);
         }
}