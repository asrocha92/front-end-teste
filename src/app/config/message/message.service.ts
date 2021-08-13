import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class MessageService {

    public swal = Swal;
   
    constructor() {
    }

    public msgSuccess (title: string = 'Sucesso', msg: string) {
        this.msgPadrao(title, msg, 'success');
    }

    public msgWarning (title: string = 'Atenção', msg: string) {
        this.msgPadrao(title, msg, 'warning');
    }

    public msgError (title: string = 'Erro', msg: string) {
        this.msgPadrao(title, msg, 'error');
    }

    public msgInfo (title: string = 'Informação', msg: string) {
        this.msgPadrao(title, msg, 'info');
    }

    private msgPadrao(title: string, msg: string, icon:any) {
        Swal.fire({
            title: title,
            text: msg,
            icon: icon,
            confirmButtonText: "OK"
          });
    }


}