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
    fecha:'',
    hora:'',
    estado:'pendiente',
    id_cliente_turnos:null
  };
  
  constructor(private servicio: ServicioService){}

  ngOnInit(){
    this.cargarTurnos();
    this.limpiarCajas();
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
    
    this.turno.fecha = new Date(t.fecha).toISOString().split('T')[0]; // 👈 solución
    this.turno.hora = t.hora;
    this.turno.estado = t.estado;
    this.turno.id_cliente_turnos = t.id_cliente_turnos
    //copia todo a la lista turno para ponerlo en los entrys despues
}
  limpiarCajas(){

    const ahora = new Date();

    const fecha = ahora.toISOString().split('T')[0]; // yyyy-mm-dd
    const hora = ahora.toTimeString().slice(0,5);    // hh:mm
    
    this.turno.id = 0;
    this.turno.nombre = "";
    this.turno.apellido = "";
   
    this.turno.fecha = ahora.toISOString().split('T')[0]; // fecha actual
    this.turno.hora = ahora.toTimeString().slice(0,5); // hora actual HH:mm
    this.turno.estado = "pendiente";
    this.turno.id_cliente_turnos = null;
  }
}
