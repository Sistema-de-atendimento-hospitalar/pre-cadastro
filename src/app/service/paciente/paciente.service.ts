import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../../../models/paciente.model'
import { Endereco } from 'src/models/endereco.model';
import { Telefone } from 'src/models/telefone.model';
import { CartaoSaude } from 'src/models/CartaoSaude.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private API_URL: string = "http://localhost:8080/v1/paciente";
  private API_URL_V2: string = "http://localhost:8080/v2/paciente"


  constructor(private http: HttpClient) { }

  verifyPacienteFromCpf(cpf: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.API_URL}/cpf/${cpf}`);
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
    return this.http.post<Paciente>(`${this.API_URL}`, paciente);
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
    return this.http.put<Paciente>(`${this.API_URL}/${paciente.pacienteId}`, paciente);
  }

  updateEndereco(enderecos: Endereco[], paciente:Paciente): Observable<Endereco[]> {
    return this.http.put<Endereco[]>(`${this.API_URL}/${paciente.pacienteId}/endereco`, enderecos);
  }

  updateTelefone(telefone:Telefone[], paciente: Paciente): Observable<Telefone[]> {
    return this.http.put<Telefone[]>(`${this.API_URL}/${paciente.pacienteId}/telefone`, telefone);
  }
  
  updateCartaoSaude(cartaoSaude: CartaoSaude, paciente: Paciente): Observable<CartaoSaude> {
    return this.http.put<CartaoSaude>(`${this.API_URL}/${paciente.pacienteId}/cartaoSaude`, cartaoSaude);
  }

  deleteEndereco(endereco:Endereco, paciente:Paciente):Observable<Endereco>{
    return this.http.delete<Endereco>(`${this.API_URL}/${paciente.pacienteId}/endereco/${endereco.enderecoId}`);
  }

  deleteTelefone(telefone:Telefone, paciente:Paciente):Observable<Telefone>{
    return this.http.delete<Telefone>(`${this.API_URL}/${paciente.pacienteId}/telefone/${telefone.telefoneId}`);
  }

  deleteCartaoSaude(cartaoSaude:CartaoSaude, paciente:Paciente):Observable<CartaoSaude>{
    return this.http.delete<CartaoSaude>(`${this.API_URL}/${paciente.pacienteId}/cartaoSaude/${cartaoSaude.convenioId}`);
  }

  validateCodigoConvenio(codigoConvenio: number): Observable<CartaoSaude> {
    let cartaoSaude = new CartaoSaude();
    cartaoSaude.convenio = "Bradesco"
    cartaoSaude.numeroCarteira = 123456
    cartaoSaude.rede = "Nacional"
    cartaoSaude.tipoContrato = "Empresarial"
    cartaoSaude.validade = new Date();

    return of(cartaoSaude);
  }

}
