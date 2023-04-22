import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl:string;

  constructor(
    private httpClient : HttpClient
  ) { }

  login(loginModel:LoginModel){
    let api ="https://localhost:7043/api/Auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,loginModel);
  }
}
