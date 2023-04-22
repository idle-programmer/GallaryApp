import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HomeServiceService } from 'src/app/services/home-service.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public signupForm!: FormGroup;
  public loginForm!: FormGroup;
  
  constructor(private fb:FormBuilder,private http:HttpClient, private service:HomeServiceService, private router: Router){}

  ngOnInit():void{
    this.homeForm();
  }
  public homeForm():void{
    this.signupForm= this.fb.group({
      username:[''], 
      email:[''],
      password:['']
    })
    this.loginForm= this.fb.group({
      username:[''],
      password:['']
    })
  }
  get signupdata() {return this.signupForm.value;}
  get logindata() {return this.loginForm.value;}

  public onsignUp(): void{
        this.service.signUp(this.signupForm.value.username,this.signupForm.value.email,
          this.signupForm.value.password).pipe(first()).subscribe(
      (data) => {
        console.log("logindata", data);
        if(data.userID){
          alert("User has been Added please login through Login Form")
          location.reload();
        }
      },
      (error) => {
        if (error.error.username){
          alert("Username: " + error.error.username)
          location.reload();
        }
        else if (error.error.password){
          alert("Password: " + error.error.username)
          location.reload();
        }
        else if (error.error.email){
          alert("Email: " + error.error.username)
          location.reload();
        }      
      }
      
    )
  }

  public onlogin(): void{
    this.service.logIn(this.loginForm.value.username,this.loginForm.value.password).pipe(first()).subscribe(
    (data) => {
      console.log("logindata", data);
      if(data.username){
        sessionStorage.setItem("username",data.username);
        sessionStorage.setItem("token",JSON.stringify(data.tokens));
        this.router.navigate(['/dashboard']);
      }
    },
  (error) => {
    if (error.error.detail){
      alert("Failed: " + error.error.detail)
      location.reload();
    }  
  }
  
)
}
  
}
