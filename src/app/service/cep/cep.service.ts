import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnderecoCorreios } from 'src/models/enderecoCorreios.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private API_URL: string = "https://viacep.com.br/ws";

  constructor(private http: HttpClient) { }

  searchCep(cep: string): Observable<EnderecoCorreios> {
    return this.http.get<EnderecoCorreios>(`${this.API_URL}/${cep}/json/`).pipe();
  }
}
