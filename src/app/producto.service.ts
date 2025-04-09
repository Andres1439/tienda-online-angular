import { Injectable } from '@angular/core';
import { Producto } from './producto/producto.model';
import { DatosService } from './datos.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  productos: { [llave: string]: Producto } = {};
  productosActualizados = new Subject<{ [llave: string]: Producto }>();

  constructor(private datosService: DatosService) {}

  listarProductos() {
    return this.datosService.listarProductos();
  }

  // Agregar o modificar un producto existente
  guardarProducto(producto: Producto, llave: string | null = null) {
    if (llave === null) {
      // caso agregar
      this.datosService.agregarProducto(producto).subscribe(() => {
        this.refrescarProductos();
      });
    } else {
      // caso actualizar
      this.datosService.modificarProducto(producto, llave).subscribe(() => {
        this.refrescarProductos();
      });
    }
  }

  refrescarProductos() {
    this.listarProductos().subscribe(
      (productos: { [llave: string]: Producto }) => {
        this.setProductos(productos);
      }
    );
  }

  setProductos(productos: { [llave: string]: Producto }) {
    this.productos = productos;
    this.productosActualizados.next(this.productos); // emitir la actualizacion de la lista
  }

  getProductoByLlave(llave: string): Producto | undefined {
    return this.productos[llave];
  }

  eliminarProducto(llave: string) {
    this.datosService.eliminarProducto(llave).subscribe(() => {
      this.refrescarProductos();
    });
  }
}
