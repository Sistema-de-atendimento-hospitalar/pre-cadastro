import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MethodsGlobalService {

  constructor() { }

  /**
   * 
   * @param field 
   * @param indice 
   * @returns 
   */
  converteToControlName(field, indice) {
    if (indice === 0) {
      return field;
    }
    return `${field}-${indice}`;
  }

  /**
   * 
   * @param field 
   * @param form 
   * @returns 
   */
  showError(field: string, form: FormGroup) {
    return form.get(field).invalid && !form.get(field).untouched;
  }

  /**
   * 
   * @param form 
   * @param model 
   * @returns 
   */
  converterToModel(form: FormGroup, model) {
    let namesForm = Object.keys(form.controls);
    let namesPaciente = Object.keys(model);

    namesPaciente.forEach(nameModel => {
      namesForm.forEach(nameForm => {
        if (nameForm === nameModel) {
          model[nameForm] = form.get(nameForm).value
        }
      });
    });
  
    return model;
  }
}
