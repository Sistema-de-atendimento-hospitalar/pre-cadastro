import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../../../models/paciente.model'
import { Endereco } from 'src/models/endereco.model';
import { Telefone } from 'src/models/telefone.model';
import { CartaoSaude } from 'src/models/CartaoSaude.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
  )
};

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private API_URL: string = "http://localhost:8080/v1/paciente";

  constructor(private http: HttpClient) { }

  verifyPacienteFromCpf(cpf: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.API_URL}/cpf/${cpf}`, httpOptions).pipe();
  }

  savePaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.API_URL}`, paciente).pipe();
  }

  saveEndereco(enderecos: Endereco[], paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.API_URL}/${paciente.pacienteId}/endereco`, enderecos).pipe();
  }

  saveTelefone(telefones: Telefone[], paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.API_URL}/${paciente.pacienteId}/telefone`, telefones).pipe();
  }

  saveCartaoSaude(cartaoSaude: CartaoSaude, paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.API_URL}/${paciente.pacienteId}/cartaoSaude`, cartaoSaude).pipe();
  }

  getPacienteFromLocalStore(): Paciente {
    let pacienteJsonConfirm = localStorage.getItem("paciente")
    let paciente: Paciente;

    if (pacienteJsonConfirm) {
      paciente = JSON.parse(pacienteJsonConfirm);
    } else {
      paciente = new Paciente();

    }
    return paciente;
  }


}
