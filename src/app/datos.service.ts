import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto/producto.model';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  url = 'https://tienda-online-9f2d2-default-rtdb.firebaseio.com/';

  constructor(private httpClient: HttpClient) {}

  listarProductos(): Observable<{ [llave: string]: Producto }> {
    return this.httpClient.get<{ [llave: string]: Producto }>(
      this.url + 'datos.json'
    );
  }

  agregarProducto(producto: Producto): Observable<any> {
    // Aqui se genera el valod de la llave de manera automatica
    return this.httpClient.post(`${this.url}datos.json`, producto);
  }

  modificarProducto(producto: Producto, llave: string): Observable<any> {
    const url_modificar = `${this.url}datos/${llave}.json`;
    return this.httpClient.put(url_modificar, producto);
  }

  eliminarProducto(llave: string): Observable<any> {
    const url_eliminar = `${this.url}datos/${llave}.json`;
    return this.httpClient.delete(url_eliminar);
  }
}
