import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../../../../models/pre-cadastro/paciente.model'
import { Endereco } from 'src/models/pre-cadastro/endereco.model';
import { Telefone } from 'src/models/pre-cadastro/telefone.model';
import { CartaoSaude } from 'src/models/pre-cadastro/CartaoSaude.model';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = `${environment.apiUrl}/v1/paciente`;
  }
  getPacienteFromCpf(cpf: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.API_URL}/cpf/${cpf}`);
  }

  verifyPacienteFromCpf(cpf: string): Observable<any> {
    return this.http.get<Paciente>(`${this.API_URL}/cpf/${cpf}/verify`);
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

  savePaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.API_URL}`, paciente, httpOptions);
  }

  saveEndereco(enderecos: Endereco[], paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.API_URL}/${paciente.pacienteId}/endereco`, enderecos);
  }

  saveTelefone(telefones: Telefone[], paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.API_URL}/${paciente.pacienteId}/telefone`, telefones);
  }

  saveCartaoSaude(cartaoSaude: CartaoSaude, paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.API_URL}/${paciente.pacienteId}/cartaoSaude`, cartaoSaude);
  }

  updatePaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.API_URL}/${paciente.pacienteId}`, paciente, httpOptions);
  }

  updateEndereco(enderecos: Endereco[], paciente: Paciente): Observable<Endereco[]> {
    return this.http.put<Endereco[]>(`${this.API_URL}/${paciente.pacienteId}/endereco`, enderecos);
  }

  updateTelefone(telefone: Telefone[], paciente: Paciente): Observable<Telefone[]> {
    return this.http.put<Telefone[]>(`${this.API_URL}/${paciente.pacienteId}/telefone`, telefone);
  }

  updateCartaoSaude(cartaoSaude: CartaoSaude, paciente: Paciente): Observable<CartaoSaude> {
    return this.http.put<CartaoSaude>(`${this.API_URL}/${paciente.pacienteId}/cartaoSaude`, cartaoSaude);
  }

  deleteEndereco(endereco: Endereco, paciente: Paciente): Observable<Endereco> {
    return this.http.delete<Endereco>(`${this.API_URL}/${paciente.pacienteId}/endereco/${endereco.enderecoId}`);
  }

  deleteTelefone(telefone: Telefone, paciente: Paciente): Observable<Telefone> {
    return this.http.delete<Telefone>(`${this.API_URL}/${paciente.pacienteId}/telefone/${telefone.telefoneId}`);
  }

  deleteCartaoSaude(cartaoSaude: CartaoSaude, paciente: Paciente): Observable<CartaoSaude> {
    return this.http.delete<CartaoSaude>(`${this.API_URL}/${paciente.pacienteId}/cartaoSaude/${cartaoSaude.convenioId}`);
  }

  validateCodigoConvenio(codigoConvenio: number): Observable<CartaoSaude> {
    let cartaoSaude = new CartaoSaude();
    cartaoSaude.convenio = "Bradesco"
    cartaoSaude.numeroCarteira = this.getRndInteger(1000, 100000);
    cartaoSaude.rede = "Nacional"
    cartaoSaude.tipoContrato = "Empresarial"
    cartaoSaude.dtValidade = new Date();

    return of(cartaoSaude);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
