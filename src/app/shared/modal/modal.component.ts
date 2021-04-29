import { AfterViewInit, Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
  @Input() title : string;
  @Input() botaoClose : string = 'Fechar';
  @Input() botaoConfirmar : string = 'Salvar';
  @Input() template : TemplateRef<any>;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.container.createEmbeddedView(this.template);
  }

}
