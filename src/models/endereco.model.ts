import { TipoLogradouro } from "./tipoLogradouro.model";

export class Endereco {
	public enderecoId: number;
	public cep: string;
	public logradouro: string;
	public numImovel: string;
	public dsComplemento: string;
	public bairro: string;
	public cidade: string;
	public estado: string;
	public tipoLogradouro: TipoLogradouro;

	constructor() {
	}
}