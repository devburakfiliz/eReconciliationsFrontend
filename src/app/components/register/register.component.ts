import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterDto } from 'src/app/models/dtos/registerDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  isRegisterButtonActive: boolean = true;
  registerDto:RegisterDto={
    "userForRegister":{
      email:"",
      name:"",
      password:""
    },
    "company":{
      addedAt:(this.datePipe.transform(Date(),'yyyy-MM-dd')),
      adress:"",
      id:0,
      identityNumber:"",
      name:"",
      taxDepertment:"",
      taxIdNumber:"",
      isActive:true
    }
  };

  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private datePipe:DatePipe

  ){}
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      companyName: ["", Validators.required],
      adress: ["", Validators.required],
      taxDepartment: [""],
      taxIdNumber: [""],
      identityNumber: [""],
      addedAt: [Date.now()],
      isActive:[true]
    })
  }
  register(){
    if (this.registerForm.valid) {
      this.isRegisterButtonActive = false;
       let registerModel = Object.assign({},this.registerForm.value);
      this.registerDto.userForRegister.name=registerModel.name;
      this.registerDto.userForRegister.email=registerModel.email;
      this.registerDto.userForRegister.password=registerModel.password;
      this.registerDto.company.name=registerModel.companyName;
      this.registerDto.company.adress=registerModel.adress;
      this.registerDto.company.identityNumber=registerModel.identityNumber;
      this.registerDto.company.taxDepertment=registerModel.taxDepartment;
      this.registerDto.company.taxIdNumber=registerModel.taxIdNumber;

      console.log(this.registerDto)

      // this.authService.login(registerModel).subscribe((res )=>{
      //   if (this.authService.redirectUrl) {
      //     this.router.navigate([this.authService.redirectUrl])
      //   }
      //   else{
      //     this.router.navigate([""])
      //   }
      //   localStorage.setItem("token",res.data.token)
      //   this.toastr.success(res.message)
      // },(err)=>{
      //   this.isRegisterButtonActive = true;
      //   this.toastr.error(err.error)
      // })
    }else{
      this.toastr.error("Eksik bilgileri doldurun!","Hata!")
    }
  }
}
