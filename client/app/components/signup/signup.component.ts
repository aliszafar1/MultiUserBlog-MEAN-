import { Component  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.services';

declare var require;
@Component({
    selector: 'signup',
    template: require('./signup.component.html'),
    styles: [require('./signup.component.css')]
})

export class SignupComponent{
    signupForm: FormGroup;
    text: Object = { msg: "", 'file-name': "", extension: "" };
    fileUpload: boolean = false;
    url:String = '';

    constructor(fb: FormBuilder, private as: AppService) {
        this.signupForm = fb.group({
            'firstname': '',
            'lastname': '',
            'username':'',
            'email':'',
            'password': '',
            'cpassword': '',
        });
     }

     onSignup(value){
         event.preventDefault();
         this.as.onSignup(value).then(res => {
             console.log('@########@@@@ Signup #########@@@@@@@@####', res);
         });
     }

      onChange(e) {
            var file = e.path[0].files[0];
            var fullPath = e.path[0].value;
            this.as.onFileUpload(file, fullPath);
         }
}