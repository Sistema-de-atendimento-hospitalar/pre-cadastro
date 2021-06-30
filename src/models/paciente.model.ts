import { CartaoSaude } from "./CartaoSaude.model";
import { Endereco } from "./endereco.model";
import { Telefone } from "./telefone.model";

export class Paciente {
    public pacienteId: number = null;
    public nome: string = null;
    public cpf: string = null;
    public email: string = null;
    public rg: string = null;
    public orgExpedidorRg: string = null;
    public estadoExpedidor: string = null;
    public emissaoRg: Date = null;
    public dtNascimento: Date = null;
    public sexo: string = null;
    public deficiencia:string = null;
    public telefones: Telefone[] = null;
    public enderecos: Endereco[] = null;
    public cartaoSaude?: CartaoSaude = null;

    constructor() { }
}