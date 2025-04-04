import { Component } from '@angular/core';
import { Producto } from '../producto/producto.model';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from '../formulario/formulario.component';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-listado-productos',
  imports: [FormsModule, FormularioComponent, ProductoComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css',
})
export class ListadoProductosComponent {
  productos: Producto[] = [
    new Producto('Pantalon', 130.0),
    new Producto('Camisa', 80.0),
    new Producto('Playera', 40.0),
  ];

  agregarProducto(producto: Producto) {
    this.productos.push(producto);
  }
}
