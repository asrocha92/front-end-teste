import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApirestfullService } from '../../../config/apirestfull/apirestfull.service';
import { Util } from '../../../config/util/util';

@Component({
  selector: 'app-orders-create',
  templateUrl: './orders-create-edit.component.html',
  styleUrls: ['./orders-create-edit.component.scss', './../../../../assets/scss/forms.scss']
})
export class OrdersCreateEditComponent implements OnInit {

  orderForm = this.formBuilder.group({
    id: [0],
    priceTotal: [0],
    listProducts: new FormArray([])
  });

  listProduts: any = [];
  seacherListProducts: any = [];
  listProductsSelected: any = [];
  isModelSelectedProduct = false;

  isEdit = false;

  constructor(private rest: ApirestfullService,
    private formBuilder: FormBuilder,
    private router: Router,
    private routerActive: ActivatedRoute,
    public util:Util) { }

  ngOnInit(): void {
    const id = this.routerActive.snapshot.paramMap.get('id');
    if (id != null) {
      this.consultarOrder(Number(id));
    }
  }

  /**
   * requisita cadastro de ordem
   */
  async cadastrarOrders() {
    await this.rest.api('/orders', 'POST', this.orderForm.value)
    .then((res: any) => {
      if (res.success) {
        this.orderForm.reset();
        this.router.navigate(['/dashbord/order']);
      }
    }); 
  }

  /**
   * Editar Order
   */
  async editarOrders() {
    await this.rest.api('/orders', 'PUT', this.orderForm.value)
    .then((res:any) => {
      if (res.success) {
        this.orderForm.reset();
        this.router.navigate(['/dashbord/order']);
      }
    });
  }

  /**
   * Consultar order
   * @param id 
   */
   async consultarOrder(id: number) {
    this.isEdit = true;
    await this.rest.api('/orders/'+id, 'GET')
    .then((res:any) => {
      if (res.success) {
        this.popular(res.order);
      }
    });
  }

  /**
   * Lista produtos
   */
  async listarProducts() {
    await this.rest.api('/products', 'GET')
    .then((res:any) => {
      if (res.lista) {
        this.listProduts = res.lista;
        this.seacherListProducts = res.lista;
      }
    });
  }

  /**
   * Popula ordem após consulta
   * @param product 
   */
  popular(order: any) {
    this.orderForm = this.formBuilder.group({
      id: [order.id],
      priceTotal: [order.priceTotal],
      listProducts: new FormArray([])
    });
    for (let i = 0; i < order.listProducts.length; i++) {
      const el = order.listProducts[i];
      (this.orderForm.get('listProducts') as FormArray).push(new FormControl(el));
    }
  }

  

  /**
   * pesquisa produto no model
   * @param event 
   */
  pesquisarProduct(event:any) {
    let pesquisa = event.value.trim().toLocaleLowerCase();
    this.listProduts = this.seacherListProducts.filter((obj:any)=> {
      try {
        if ((obj.id).toString().includes(pesquisa) ||
        obj.name.toString().toLocaleLowerCase().includes(pesquisa) ||
        obj.price.toString().includes(pesquisa)) {
          return true;
        }
      } catch (error) {}
      return false;
    });
    if (this.listProduts.length === 0 && (pesquisa == null || pesquisa === '')) {
      this.listProduts = this.seacherListProducts;
    }
  }

  /**
   * Adiciona produto selecionado a uma lista temporaria, até fechar model
   * @param item 
   * @param event 
   */
  addListProductSelected(item: any, event:any) {
    var checked = event.target.checked;
    if (checked){
      this.listProductsSelected.push(item);
    } else {
      let obj = this.listProductsSelected.filter((obj:any) => {return  obj.id == item.id})[0];
      let positionObj =  this.listProductsSelected.indexOf(obj);
      this.listProductsSelected = this.listProductsSelected.filter((obj:any, index:number)=>{return index !== positionObj; });
    } 
  }

  /**
   * abre seleção de produtos para ordem
   */
  showModelListProduct() {
    this.isModelSelectedProduct = true;
    this.listProductsSelected = [];
    this.listarProducts();
  }

  /**
   * fecha seleção de produto da ordem
   */
  hideModelListProduct() {
    this.isModelSelectedProduct = false;
    this.listProductsSelected = [];
    this.listProduts = [];
    this.seacherListProducts = [];
  }

  /**
   * faz a comparação dos produtos adicionado a ordem e adiciona somente os que são diferentes
   */
  selectedProductList() {
    const formArray: FormArray = this.orderForm.get('listProducts') as FormArray;

    for (let i = 0; i < this.listProductsSelected.length; i++) {
      const el = this.listProductsSelected[i];

      let existe: boolean = false;

      formArray.controls.forEach((ctrl: any) => {
        if(ctrl.value.id == el.id) {
          // Remove the unselected element from the arrayForm
          existe = true;
          return;
        }
      });

      if (!existe) {
        formArray.push(new FormControl(el));
      }
    }
    this.somarTotalPrice();
    this.hideModelListProduct();
  }

  somarTotalPrice() {
    const formArray: FormArray = this.orderForm.get('listProducts') as FormArray;

    let totalPrice:number = 0.0

    formArray.controls.forEach((ctrl: any) => {
      totalPrice+= ctrl.value.price;
    });
    (<FormControl> this.orderForm.controls['priceTotal']).setValue(totalPrice);
  }

  get formControlProducts(): any { return <FormArray>this.orderForm.get('listProducts'); }

  /**
   * remove produto da listaProduct que pertence a ordem 
   * @param index 
   */
  removeProductList(index:number) {
    const formArray: FormArray = this.orderForm.get('listProducts') as FormArray;
    formArray.removeAt(index);
    this.somarTotalPrice();
  }

}