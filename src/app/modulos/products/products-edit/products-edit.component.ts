import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { ApirestfullService } from './../../../config/apirestfull/apirestfull.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./../../../../assets/scss/forms.scss']
})
export class ProductsEditComponent implements OnInit {

  productForm:any = this.formBuilder.group({
    id: [0],
    name: [''],
    price: ['']
  });

  constructor(private rest: ApirestfullService,
    private routerActive: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.routerActive.snapshot.paramMap.get('id');
    this.consultarProducts(Number(id));
  }

  /**
   * Consulta produto a ser editado
   * @param id 
   */
  async consultarProducts(id: number) {
    await this.rest.api('/products/'+id, 'GET')
    .then((res:any) => {
      if (res.success) {
        this.popular(res.product);
      }
    });
  }

  /**
   * Popula form do objeto produto a ser editado
   * @param product 
   */
  popular(product:any) {
    this.productForm = this.formBuilder.group({
      id: [product.id],
      name: [product.name],
      price: [product.price]
    });
  }

  /**
   * Ação para alterar dados do produto
   */
  async editarProducts() {
    await this.rest.api('/products', 'PUT', this.productForm.value)
    .then((res:any) => {
      if (res.success) {
        this.productForm.reset();
        this.router.navigate(['/dashbord/product']);
      }
    });
  }

}
