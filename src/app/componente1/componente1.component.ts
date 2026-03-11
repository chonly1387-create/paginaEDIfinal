import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-componente1',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './componente1.component.html',
  styleUrl: './componente1.component.css'
})
export class Componente1Component {
 title = 'paginaEDIfinal';

  turnos:any[] = [];
  turno:any = {
    id:0,
    nombre:'',
    apellido:'',
    telefono:'',
    fecha:'',
    hora:'',
    estado:'pendiente'
  };
  
  constructor(private servicio: ServicioService){}

  ngOnInit(){
    this.cargarTurnos();
  }

  cargarTurnos(){
    this.servicio.getAll("turnos").subscribe(data=>{
      this.turnos = data;
      console.log(this.turnos)
    });
  }


  crearTurno(){
      this.servicio.create("turnos",this.turno).subscribe(data=>{
        this.cargarTurnos()//actualiza la tabla para que aparezca el nuevo turno
        this.limpiarCajas()//limpia los entrys 
        
      });

  }
  eliminarTurno(){
      this.servicio.delete("turnos",this.turno.id).subscribe(data=>{
        this.cargarTurnos()//actualiza la tabla para que aparezca el nuevo turno
        this.limpiarCajas()//limpia los entrys 
      })
    
  }
  modificarTurno(){
    // turno
    this.turno.fecha = new Date(this.turno.fecha).toISOString().split('T')[0];

    this.servicio.update("turnos",this.turno.id,this.turno).subscribe(data=>{

      this.cargarTurnos()//actualiza la tabla para que aparezca el nuevo turno
      this.limpiarCajas()//limpia los entrys 
    })



  }
  seleccionarTurno(t:any){

    this.turno.id = t.id;
    this.turno.nombre = t.nombre;
    this.turno.apellido = t.apellido;
    this.turno.telefono = t.telefono;
    this.turno.fecha = t.fecha;
    this.turno.hora = t.hora;
    this.turno.estado = t.estado;
    //copia todo a la lista turno para ponerlo en los entrys despues
}
  limpiarCajas(){
    this.turno.id = 0;
    this.turno.nombre = "";
    this.turno.apellido = "";
    this.turno.telefono = 0;
    this.turno.fecha = 0;
    this.turno.hora = 0;
    this.turno.estado = 0;
  }
}
