import { Injectable } from '@angular/core';
import axios from 'axios';

import { MessageService } from './../message/message.service';

import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ApirestfullService {

  constructor(private message: MessageService) { }

  /**
   * Cria uma instancia axios, para trabalhar com integração de apiRestfull
   * @returns 
   */
  private instace() {
    let instace = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 1000,
      headers: { 'Content-Type': 'application/json' }
    });
    return instace;
  }

  /**
   * tratando requições
   * @param url 
   * @param method 
   * @param data 
   * @returns 
   */
  api(url: string, method: any, data: any = null) {
      this.showLoading();

      let objRequest: any = {
        url: url,
        method: method
      };

      if (data) {
        objRequest.data = data;
      }

      //console.log('objRequest', objRequest)

      return new Promise((resolve, reject) => {
        this.instace()(objRequest)
          .then((response) => {
            this.tratarMessage(response.data);
            resolve(response.data)
          })
          .catch((error) => {
            this.message.msgError('Erro', "Ocorreu uma falha, verifique sua conexão com a internet e tente novamente, se o problema persistir contate: suporte@teste.com.");
            reject(error);
          })
          .finally(() => {
            // always executed
            this.hiddenLoading();
          });
      })
  };

  private tratarMessage(data: any) {
    //console.log(data);
    if (data && data.success && data.message) {
      this.message.msgSuccess('', data.message);
    }
    if (data && data.error && data.error) {
      this.message.msgWarning('', data.message);
    }
  }

  showLoading() {
    $('#loanding').removeClass('display-off').addClass('display-on');
  }

  hiddenLoading() {
    $('#loanding').removeClass('display-on').addClass('display-off');
  }


}
