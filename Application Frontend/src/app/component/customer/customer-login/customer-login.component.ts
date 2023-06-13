import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ElectronicstoreService } from 'src/app/electronicstore.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit{

  email: string = "";
  password: string = "";
  ccustomerLoginForm = new FormGroup({});
  customerLoginForm:any;

  constructor(
    private router: Router,
    private eservice:ElectronicstoreService,
    private fb: FormBuilder

  ) {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    this.customerLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(pattern)]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });

  }

  ngOnInit(): void {
  }

  
  signIn(): void {

    const body = {
      "emailID": this.customerLoginForm.controls['email'].value,
      "password": this.customerLoginForm.controls['password'].value
    }
    console.log("=======>",body);
    this.eservice.customerSignIn(body).pipe(take(1)).subscribe((res :any) => {
      console.log("*****",res);
      if(res && res?.customerId){
       // alert("Login sucessful");
        this.eservice.storeCustomerAuthorization(res?.customerId);
        let userName = '';
        if (res?.firstName) {
          userName+=res?.firstName;
        }
        if (res?.lastName){
          userName+=' ' + res?.lastName;
        }
        this.eservice.storeCustomerUserName(userName);
        this.router.navigate(['/customer/home']);
       
      }
    },err => {
        console.log("Error ", err);
        console.log(">>> ", err);
        if(err?.error && err?.error.startsWith("Customer  not found with")      ){
          alert("Customer email/password is invalid");
        }
        else{
          alert("Something going wrong in login! pls try again");
        }
    })

  }

  routeToNewUser(): void {
    this.router.navigate(["/customer-signup"]);
  }

  routeToForgotPassword(): void {
    this.router.navigate(["/forgot-password"]);
  }
 
}
