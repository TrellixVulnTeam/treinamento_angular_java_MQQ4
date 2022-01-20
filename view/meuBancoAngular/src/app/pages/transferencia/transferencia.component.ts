import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContaService } from 'src/app/services/conta.service';
import { Router } from '@angular/router';
import { Transferencia } from 'src/app/interfaces/transferencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  constructor(private contaService: ContaService, private router: Router) { }

  ngOnInit(): void {
  }

  formGroup: FormGroup = new FormGroup({
    agenciaDestino: new FormControl('', Validators.required),
    agenciaOrigem: new FormControl('', Validators.required),
    numeroContaDestino: new FormControl('', Validators.required),
    numeroContaOrigem: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
  });

  transferir() {
    const transferencia: Transferencia = this.formGroup.value;
    this.contaService.transferencia(transferencia).subscribe(contaApi => {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Transferência realizada com sucesso',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/contas']);
    }, error => {
      console.error(error)
    });

  }
}
