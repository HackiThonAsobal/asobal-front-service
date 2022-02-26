import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ILoginRequest } from 'src/app/models/login-request.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  sendEmail: boolean;

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    sessionStorage.removeItem('token');
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email])
      }
    );
  }

  login() {
    const body: ILoginRequest = {
      'email': this.loginForm.get('email').value
    };
    this.loginService.postLogin(body).subscribe(
      () => {
        this.sendEmail = true;
      },
      (err) => {
        console.log('Error service login', err.status);
        this.sendEmail = false;        
      }
    );
  }

}
