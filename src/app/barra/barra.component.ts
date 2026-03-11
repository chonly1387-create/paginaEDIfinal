import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-barra',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule,RouterModule,FooterComponent],
  templateUrl: './barra.component.html',
  styleUrl: './barra.component.css'
})
export class BarraComponent {

}
