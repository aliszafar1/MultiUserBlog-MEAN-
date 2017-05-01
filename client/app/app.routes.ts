import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { AddPostComponent } from './components/addPost/addPost.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

// import { Components } from './components';

import { AuthGuardService } from './authGuard';

export const AppRoutes : Routes = [
      { path: '', component: DashboardComponent }
    , { path: 'blog/:id', component: BlogComponent }
    , { path: 'addPost', component: AddPostComponent,
     canActivate: [ AuthGuardService ] 
    }
    , { path: 'signup', component: SignupComponent }
    , { path: 'signin', component: SigninComponent }
];