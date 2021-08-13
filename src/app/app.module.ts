import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**api restfull */
import { ApirestfullService } from './config/apirestfull/apirestfull.service';

/**mensagens */
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

/**máscara para dinheiro */
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
 
const customCurrencyMaskConfig: any = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
};

import {
  DashbordComponent, 
  ProductsComponent,
  ProductsCreateComponent,
  ProductsEditComponent,
  OrdersComponent,
  OrdersCreateEditComponent
} from './modulos';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
    OrdersComponent,
    OrdersCreateEditComponent,
    DashbordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    SweetAlert2Module
  ],
  providers: [ ApirestfullService ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
