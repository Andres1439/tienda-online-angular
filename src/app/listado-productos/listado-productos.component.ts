import { Component } from '@angular/core';
import { Producto } from '../producto/producto.model';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from '../formulario/formulario.component';
import { ProductoComponent } from '../producto/producto.component';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-productos',
  imports: [FormsModule, FormularioComponent, ProductoComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css',
})
export class ListadoProductosComponent {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit() {
    // Inicializar los productos
    this.productos = this.productoService.productos;
  }

  agregarProducto() {
    this.router.navigate(['/agregar']);
  }
}
