import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenRequest } from 'src/models/pre-cadastro/TokenRequest.model';
import { ValidarTokenRequest } from 'src/models/pre-cadastro/ValidarTokenRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AutorizationService {
  private API_URL: string;

  constructor(private http: HttpClient) { 
    this.API_URL = `${environment.apiUrlNotification}/notification/v1/autorization`;
  }

  createToken(tokenRequest: TokenRequest) {
    return this.http.post<any>(`${this.API_URL}/token`, tokenRequest);
  }

  validToken(validarTokenRequest: ValidarTokenRequest) {
    return this.http.post<any>(`${this.API_URL}/token/valid`, validarTokenRequest);
  }
}
