import { CartaoSaude } from "./CartaoSaude.model";
import { Endereco } from "./endereco.model";
import { Telefone } from "./telefone.model";

export class Paciente {
    public pacienteId: number;
    public nome: string;
    public cpf: string;
    public email: string;
    public rg: string;
    public orgExpedidorRg: string;
    public emissaoRg: Date;
    public dtNascimento: Date;
    public sexo: string;
    public telefone: Telefone[];
    public endereco: Endereco[];
    public cartaoSaude?: CartaoSaude;

    constructor() { }
}