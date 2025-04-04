import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../producto/producto.model';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  @ViewChild('descripcionInput') descripcionInput!: ElementRef;
  @ViewChild('precioInput') precioInput!: ElementRef;
  @Output() nuevoProducto = new EventEmitter<Producto>();

  agregarProducto(evento: Event) {
    evento.preventDefault(); // Evitar el envío del formulario

    if (
      this.descripcionInput.nativeElement.value.trim() === '' ||
      this.precioInput == null ||
      this.precioInput.nativeElement.value <= 0
    ) {
      console.log('Error: Descripción o precio inválido');
      return;
    }

    const producto = new Producto(
      this.descripcionInput.nativeElement.value,
      this.precioInput.nativeElement.value
    );

    // Emitir el evento del nuevo producto
    this.nuevoProducto.emit(producto);

    this.descripcionInput.nativeElement.value = '';
    this.precioInput.nativeElement.value = null;
  }
}
