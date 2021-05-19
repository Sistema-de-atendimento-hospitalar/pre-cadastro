import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MethodsGlobalService {

  constructor() { }

  converteToControlName(field, indice) {
    if (indice === 0) {
      return field;
    }
    return `${field}-${indice}`;
  }

  // showError(field: string) {
  //   return this.form.get(field).invalid && !this.form.get(field).untouched;
  // }
}
