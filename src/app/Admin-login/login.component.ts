import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  static key=false;

  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nickname: [''],
      password: ['']
    })
  }

  //login method
  login() {
    this._http.get<any>("http://localhost:3000/AdminProfile").subscribe(res => {
      const user = res.find((a: any) => {
        return a.nickname == this.loginForm.value.nickname && a.password == this.loginForm.value.password
      })
      if (user) {

        const username= this.loginForm.value.nickname;
        LoginComponent.key=true;
        alert("התחברת בהצלחה")
        this.loginForm.reset();
        this.router.navigate(['restaurant-admin/',username])

      }
      else {
        alert("משתמש לא נמצא")
      }
    }, err => {
      alert("the user is log in")
    }
    )
  }

  canActivate():boolean {
    // return true;
  
  if(LoginComponent.key){
    return true;
   }
  
  else{
   this.router.navigate(['admin-login']);
    return false;
   }
  return false;
  
  } 
  }


