import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  isLoginButtonActive:boolean = true;
  email:string = "";
  password:string = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder : FormBuilder,
    private toastr:ToastrService
  ){}
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",(Validators.required,Validators.email)],
      password: ["",Validators.required],
    })
  }
  login(){
    if (this.loginForm.valid) {
      this.isLoginButtonActive = false;
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe((res )=>{
        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl])
        }
        else{
          this.router.navigate([""])
        }
        localStorage.setItem("token",res.data.token)
        this.toastr.success(res.message)
      },(err)=>{
        this.isLoginButtonActive = true;
        this.toastr.error(err.error)
      })
    }else{
      this.toastr.error("Eksik bilgileri doldurun!","Hata!")
    }
  }

  changeInputClass(text:string){
    if (text != "") {
      return "input-group input-group-outline my-3 is-valid"
    }else{
      return "input-group input-group-outline my-3 is-invalid"
    }
  }

}
