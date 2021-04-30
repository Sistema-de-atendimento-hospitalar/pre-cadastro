import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TipoTelefone } from 'src/models/tipoTelefone.model';

@Injectable({
  providedIn: 'root'
})
export class TipoTelefoneService {

  private API_URL: string = "http://localhost:8080/v1";

  constructor(private http: HttpClient) { }

  getTipoTelefone(): Observable<TipoTelefone[]> {
    return this.http.get<TipoTelefone[]>(`${this.API_URL}/tipo-telefone`);
  }
}
