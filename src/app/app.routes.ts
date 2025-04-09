import { Routes } from '@angular/router';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: ListadoProductosComponent },
  { path: 'listado', component: ListadoProductosComponent },
  { path: 'agregar', component: FormularioComponent },
  { path: 'editar/:llave', component: FormularioComponent },
  { path: 'login', component: LoginComponent },
  // Ruta comodian para cualquier ruta no registrada
  { path: '**', component: ErrorComponent },
];
