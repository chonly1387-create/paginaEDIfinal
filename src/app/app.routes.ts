import { Routes } from '@angular/router';
import { Componente1Component } from './componente1/componente1.component';
import { Componente2Component } from './componente2/componente2.component';
import { BarraComponent } from './barra/barra.component';
import { ClientesComponent } from './clientes/clientes.component';
export const routes: Routes = [
    {
    // Ruta principal (cuando la URL es solo: localhost:4200/)
    path: '',
     // El componente que se carga en esa ruta principal
    component: BarraComponent,
    // children significa que son rutas hijas dentro de BarraComponent
    // o sea que BarraComponent actúa como una especie de "layout"
    children: [
      { path: '', component: Componente1Component },
      { path: '1', component: Componente1Component },
      { path: '2', component: Componente2Component },
      { path: '3', component: ClientesComponent }
    ]
  }

];
