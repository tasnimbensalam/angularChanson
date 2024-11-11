import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user = new User();
  myForm!: FormGroup;
  err!: any;
  loading: boolean = false;

  confirmPassword?:string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
    
    );
  }

  onRegister()
  {
    this.loading=true;
  this.authService.registerUser(this.user).subscribe({
  next:(res)=>{
    this.authService.setRegistredUser(this.user);
    ///alert("veillez confirmer votre email");
    this.loading=false;
    this.toastr.success('veillez confirmer votre email', 'Confirmation');
     this.router.navigate(["/verifEmail"]);
    },
    error:(err:any)=>{
    if(err.status===400){
    this.err= err.error.message;
    }
    }
    }
    )
    }


}

