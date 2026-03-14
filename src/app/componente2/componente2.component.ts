import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-componente2',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './componente2.component.html',
  styleUrl: './componente2.component.css'
})
export class Componente2Component {
 title = 'paginaEDIfinal';

  turnos:any[] = [];
  turno:any = {
    id:0,
    nombre:'',
    apellido:'',
    
    fecha:'',
    hora:'',
    estado:'pendiente'
  };
  
  constructor(private servicio: ServicioService){}

  ngOnInit(){
    this.cargarTurnos();
    
  }

  cargarTurnos(){
    // obtiene la fecha actual
    const hoy = new Date().toISOString().split('T')[0];

    this.servicio.getAll("turnos").subscribe(data=>{


      //data.filter -> recorre todos los turnos y elegi solo algunos
      //t:any representa cada turno ejemplo t.fecha t.nombre etc
      //new Date(t.fecha) convierte la fecha del turno a formate fecha de javascript
      //.toISOString() convierte a formato de hora:2026-03-13T00:00:00.000Z
      //Divide el texto en dos partes:2026-03-13 | 00:00:00.000Z y toma la siguiente parte:2026-03-13
      // === hoy compara con la fecha actual
      
      this.turnos = data.filter((t:any)=>new Date(t.fecha).toISOString().split('T')[0]===hoy);
      console.log(this.turnos)
    });
  }


  
 
 
  
}
