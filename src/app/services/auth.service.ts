import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterDto } from '../models/dtos/registerDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl:string;

  constructor(
    private httpClient : HttpClient
  ) { }

  register(registerDto:RegisterDto){
    let api ="https://localhost:7043/api/Auth/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,registerDto);
  }

  login(loginModel:LoginModel){
    let api ="https://localhost:7043/api/Auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,loginModel);
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }
    else{
      return false;
    }
  }
}
