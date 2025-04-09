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
  // Si usamos viewchild...
  // @ViewChild('descripcionInput') descripcionInput!: ElementRef;
  // @ViewChild('precioInput') precioInput!: ElementRef;
  // @Output() nuevoProducto = new EventEmitter<Producto>();

  productoId: number | null = null;
  descripcionInput: string = '';
  precioInput: number | null = null;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Verificamos  si debemos cargar un producto ya existenta
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const producto = this.productoService.getProductoById(Number(id));
      // Si encontramos el producto, lo cargamos en el formulario
      if (producto) {
        this.productoId = producto.id;
        this.descripcionInput = producto.descripcion;
        this.precioInput = producto.precio;
      } else {
        console.log('Producto no encontrado');
      }
    }
  }

  // Si usamos viewchild...
  // agregarProducto(evento: Event) {
  //   evento.preventDefault(); // Evitar el envío del formulario

  //   if (
  //     this.descripcionInput.nativeElement.value.trim() === '' ||
  //     this.precioInput == null ||
  //     this.precioInput.nativeElement.value <= 0
  //   ) {
  //     console.log('Error: Descripción o precio inválido');
  //     return;
  //   }

  //   const producto = new Producto(
  //     this.descripcionInput.nativeElement.value,
  //     this.precioInput.nativeElement.value
  //   );

  //   // Emitir el evento del nuevo producto
  //   this.nuevoProducto.emit(producto);

  //   this.descripcionInput.nativeElement.value = '';
  //   this.precioInput.nativeElement.value = null;
  // }

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

    const producto = new Producto(
      this.productoId,
      this.descripcionInput,
      this.precioInput
    );

    // Agregamos el nuevo producto usando el servicio
    this.productoService.guardarProducto(producto);

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
    if (this.productoId !== null) {
      this.productoService.eliminarProducto(this.productoId);
      this.limpiarFormulario();
      this.router.navigate(['/']);
    }
  }

  limpiarFormulario() {
    this.productoId = null;
    this.descripcionInput = '';
    this.precioInput = null;
  }
}
