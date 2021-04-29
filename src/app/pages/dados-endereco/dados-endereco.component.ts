import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-endereco',
  templateUrl: './dados-endereco.component.html',
  styleUrls: ['./dados-endereco.component.scss']
})
export class DadosEnderecoComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  nextPage() {

    return false;

    this.router.navigate(['/passo3']);
  }

}
