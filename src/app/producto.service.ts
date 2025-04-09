import { Injectable } from '@angular/core';
import { Producto } from './producto/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  // Variables para el id siguiente y unico
  private idSiguiente = 1;

  productos: Producto[] = [];

  constructor() {
    // Inicializar el idSiguiente con el id del primer producto
    this.inicializarProductos();
  }

  inicializarProductos() {
    const producto1 = new Producto(this.idSiguiente++, 'Pantalon', 130.0);
    const producto2 = new Producto(this.idSiguiente++, 'Camisa', 80.0);
    const producto3 = new Producto(this.idSiguiente++, 'Playera', 50.0);

    this.productos.push(producto1, producto2, producto3);
  }

  // Agregar o modificar un producto existente
  guardarProducto(producto: Producto) {
    if (producto.id === null) {
      producto.id = this.idSiguiente++;
      this.productos.push(producto);
    } else {
      const indice = this.productos.findIndex((p) => p.id === producto.id);
      if (indice !== -1) {
        this.productos[indice] = producto;
      }
    }
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find((producto) => producto.id === id);
  }

  eliminarProducto(id: number) {
    const indice = this.productos.findIndex((producto) => producto.id === id);
    if (indice !== -1) {
      this.productos.splice(indice, 1);
    }
  }
}
