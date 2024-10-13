import { Component, NgModule } from '@angular/core';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
user = new User();
erreur=0;
constructor(private authService : AuthService,
  private router: Router) { }
  onLoggedin(){
    console.log(this.user);
     let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser)
    this.router.navigate(['/']);
    else
    this.erreur = 1;
    }
}
