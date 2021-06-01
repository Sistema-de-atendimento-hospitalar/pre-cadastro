import { TipoLogradouro } from "./tipoLogradouro.model";

export class Endereco {
	public enderecoId: number = null;
	public cep: string = null;
	public logradouro: string = null;
	public numImovel: string = null;
	public dsComplemento: string = null;
	public bairro: string = null;
	public cidade: string = null;
	public estado: string = null;
	public tipoLogradouro: TipoLogradouro = null;

	//
	public orderForm: number;

	constructor() {
	}
}