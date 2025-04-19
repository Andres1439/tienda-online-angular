import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private loginService: LoginService) {}

  salir() {
    return this.loginService.logout();
  }

  isAutenticado() {
    return this.loginService.isAutenticado();
  }
  title = 'tienda-online';
}
