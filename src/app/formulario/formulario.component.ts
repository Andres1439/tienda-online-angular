import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../producto/producto.model';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  llaveProducto: string | null = null;
  descripcionInput: string = '';
  precioInput: number | null = null;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Verificamos  si debemos cargar un producto ya existenta
    const llave = this.route.snapshot.paramMap.get('llave');

    if (llave) {
      const producto = this.productoService.getProductoByLlave(llave);
      // Si encontramos el producto, lo cargamos en el formulario
      if (producto) {
        this.llaveProducto = llave;
        this.descripcionInput = producto.descripcion;
        this.precioInput = producto.precio;
      } else {
        console.log('Producto no encontrado');
      }
    }
  }

  guardarProducto(evento: Event) {
    evento.preventDefault(); // Evitar el envío del formulario

    if (
      this.descripcionInput.trim() === '' ||
      this.precioInput == null ||
      this.precioInput <= 0
    ) {
      console.log('Error: Descripción o precio inválido');
      return;
    }

    const producto = new Producto(this.descripcionInput, this.precioInput);

    // Agregamos el nuevo producto usando el servicio
    this.productoService.guardarProducto(producto, this.llaveProducto);

    // Limpiamos los comapos de los formularios
    this.limpiarFormulario();

    // Redirigimos al listado
    this.router.navigate(['/']);
  }

  cancelar() {
    // Redirigimos al listado
    this.router.navigate(['/']);
  }

  eliminarProducto() {
    if (this.llaveProducto !== null) {
      this.productoService.eliminarProducto(this.llaveProducto);
      this.limpiarFormulario();
      this.router.navigate(['/']);
    }
  }

  limpiarFormulario() {
    this.llaveProducto = null;
    this.descripcionInput = '';
    this.precioInput = null;
  }
}
