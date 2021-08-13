import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApirestfullService } from './../../config/apirestfull/apirestfull.service';
import { Util } from './../../config/util/util';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss','./../../../assets/scss/lists.scss']
})
export class OrdersComponent implements OnInit {

  listOrders: any = [];
  
  seacher: string = '';
  seacherListOrders: any = [];

  constructor(private router: Router,
    private rest: ApirestfullService,
    public util: Util) { }

  ngOnInit(): void {
    this.listarOrders();
  }

  /**
   * Redirecionar para criar order
   */
  directNovaOrder() {
    this.router.navigate(['/dashbord/order/create']);
  }

  /**
   * Redirecionar para Editar order
   */
  directEditarOrder(id:number) {
    this.router.navigate(['/dashbord/order/edit', id]);
  }

  /**
   * Ação Listar orders
   */
  async listarOrders() {
    await this.rest.api('/orders', 'GET')
    .then((res:any) => {
      if (res.lista) {
        this.listOrders = res.lista;
        this.seacherListOrders = res.lista;
        this.pesquisar({value: this.seacher});
      }
    });
  }

  /**
   * Ação para exluir order
   */
  async excluirOrder(id: number) {
    if (id !== null && id != undefined) {
      await this.rest.api('/orders/'+id, 'DELETE')
      .then((res:any) =>{
        if (res.success) {
          this.listarOrders();
        }
      });
    }
  }

  /**
   * Filtro de order apresentado em tela por todos os parametros
   */
  pesquisar(event:any) {
    let pesquisa = event.value.trim().toLocaleLowerCase();
    this.seacher = pesquisa;
    this.listOrders = this.seacherListOrders.filter((obj:any)=> {
      try {
        if ((obj.id).toString().includes(pesquisa) ||
        obj.totalPrice.toString().toLocaleLowerCase().includes(pesquisa)) {
          return true;
        }
      } catch (error) {
        //console.log(error);
      }
      return false;
    });
    if (this.listOrders.length === 0 && (pesquisa == null || pesquisa === '')) {
      this.listOrders = this.seacherListOrders;
    }
  }

}