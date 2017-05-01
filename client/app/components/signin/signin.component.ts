import { Component  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.services';

declare var require;
@Component({
    selector: 'signin',
    template: require('./signin.component.html'),
    styles: [require('./signin.component.css')]
})

export class SigninComponent{
    signinForm: FormGroup;
    constructor(fb: FormBuilder, private as: AppService) {
        this.signinForm = fb.group({
            'username': '',
            'password': ''
        })
     }

     onSignin(value){
         this.as.onSignin(value).then(data => console.log('@@@@@ Signin #######', data))
            .catch((err) => console.log('Invalid usernameeeee', err));
        //  console.log('##### Signin ########', value);
     }
}