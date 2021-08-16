import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatStepper } from "@angular/material/stepper";
import { ModalGenericComponent } from "./modal/modal-generic/modal-generic.component";

enum TYPE_MODAL {
    INFO = 1,
    WARNING = 2,
    DANGER = 3,
}

export class GenericComponent {
    protected erros: any;
    public detailErrorResponse: string;
    public form: FormGroup;

    constructor(
        public dialog?: MatDialog) {
    }

    showError(field: string, indice?: number) {
        if (indice != null) {
            field = this.converteToControlName(field, indice)
        }
        return this.form.get(field).invalid && !this.form.get(field).untouched;
    }

    hasError(field: string, indice?: number) {
        if (indice != null) {
            field = this.converteToControlName(field, indice)
        }
        return (this.form.get(field).invalid && !this.form.get(field).untouched) || (!!this.erros && this.erros[field]);
    }

    getError(field: string, indice?: number) {
        let message;
        if (indice != null) {
            field = this.converteToControlName(field, indice)
        }

        if (!!this.erros && !!this.erros[field]) {
            message = this.erros[field]
        } else {
            let erros = this.form.get(field).errors;
            if (erros.required) {
                message = `campo ${field} obrigatório`;
            } else if (erros.mask) {
                message = `campo ${field} não respeita a mascara ${erros.mask.requiredMask}`;
            } else if (erros.email) {
                message = `E-mail inválido`;
            } else if (erros.minlength) {
                message = `campo ${field} deve ter ao menos ${erros.minlength.requiredLength} caracteres`;
            } else if (erros.pattern && field.search('dt') >= 0) {
                message = `campo ${field} inválido`
            }
        }

        return message;
    }

    goForward(stepper: MatStepper) {
        stepper.next();
    }

    converteToControlName(field, indice) {
        if (indice === 0) {
            return field;
        }
        return `${field}-${indice}`;
    }

    openGenericDialog(titleDialogo: string, content: string, typeModal?: TYPE_MODAL, callback?: any) {
        const config = new MatDialogConfig()
        config.height = '30%'
        config.width = '50%'

        if (typeModal == null) {
            typeModal = TYPE_MODAL.INFO
        }

        config.data = {
            title: titleDialogo,
            content,
            typeModal
        }

        this.dialog.open(ModalGenericComponent, config);
        if (callback != null) {
            callback();
        }        
    }

    catchError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error.errors) {
            this.erros = errorResponse.error.errors
        } else {
            this.detailErrorResponse = errorResponse.error.detail;
        }
    }

}