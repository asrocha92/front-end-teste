import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApirestfullService } from './../../config/apirestfull/apirestfull.service';
import { Util } from './../../config/util/util';

@Component({
  selector: 'm1-products',
  templateUrl: './products.component.html',
  styleUrls: [ './../../../assets/scss/lists.scss']
})
export class ProductsComponent implements OnInit {

  listProduts: any = [];
  
  seacher: string = '';
  seacherListProducts: any = [];

  constructor(private router: Router,
    private rest: ApirestfullService,
    public util: Util) { }

  ngOnInit(): void {
    this.listarProducts();
  }

  /**
   * Redirecionar para criar produto
   */
  directNovoProduct() {
    this.router.navigate(['/dashbord/product/create']);
  }

  /**
   * Redirecionar para Editar produto
   */
  directEditarProduct(id:number) {
    this.router.navigate(['/dashbord/product/edit', id]);
  }

  /**
   * Ação Listar produtos
   */
  async listarProducts() {
    await this.rest.api('/products', 'GET')
    .then((res:any) => {
      if (res.lista) {
        this.listProduts = res.lista;
        this.seacherListProducts = res.lista;
        this.pesquisar({value: this.seacher});
      }
    });
  }

  /**
   * Ação para exluir produtos
   */
  async excluirProducts(id: number) {
    if (id !== null && id != undefined) {
      await this.rest.api('/products/'+id, 'DELETE')
      .then((res:any) =>{
        if (res.success) {
          this.listarProducts();
        }
      });
    }
  }

  /**
   * Filtro de produto apresentado em tela por todos os parametros
   */
  pesquisar(event:any) {
    let pesquisa = event.value.trim().toLocaleLowerCase();
    this.seacher = pesquisa;
    this.listProduts = this.seacherListProducts.filter((obj:any)=> {
      try {
        if ((obj.id).toString().includes(pesquisa) ||
        obj.name.toString().toLocaleLowerCase().includes(pesquisa) ||
        obj.price.toString().includes(pesquisa)) {
          return true;
        }
      } catch (error) {
        //console.log(error);
      }
      return false;
    });
    if (this.listProduts.length === 0 && (pesquisa == null || pesquisa === '')) {
      this.listProduts = this.seacherListProducts;
    }
  }

}