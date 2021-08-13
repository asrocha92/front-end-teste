

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Util {

  /**
   * Ajustar mascara, valor
   * @param valor 
   * @returns 
   */
  public ajustarValor(valor: any) {
    try {
      if (valor !== null && valor !== undefined && valor !== '0') {
        valor = valor.toFixed(2);
        let resultado = (valor + "").replace(".", ",") + "";
        if (resultado.indexOf(",") < 0) {
          return resultado + ",00";
        }
        return resultado;
      } else if (valor == '0') {
        return "0,00";
      }
    } catch (error) {
      return valor;
    }
    return valor;
  }

}
