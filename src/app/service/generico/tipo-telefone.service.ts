import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TipoTelefone } from 'src/models/tipoTelefone.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoTelefoneService {

  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = `${environment.apiUrl}/v1`;
   }

  getTipoTelefone(): Observable<TipoTelefone[]> {
    return this.http.get<TipoTelefone[]>(`${this.API_URL}/tipo-telefone`);
  }
}
