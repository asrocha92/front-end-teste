import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ApirestfullService } from './../../../config/apirestfull/apirestfull.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./../../../../assets/scss/forms.scss']
})
export class ProductsCreateComponent implements OnInit {
  
  productForm = this.formBuilder.group({
    name: '',
    price: ''
  });

  constructor(private rest: ApirestfullService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Ação para cadastrar produto
   */
  async cadastrarProducts() {
    await this.rest.api('/products', 'POST', this.productForm.value)
    .then((res: any) => {
      if (res.success) {
        this.productForm.reset();
        this.router.navigate(['/dashbord/product']);
      }
    });
    
  }
}
