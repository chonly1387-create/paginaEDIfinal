import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../servicio.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
 title = 'paginaEDIfinal';

  clientes:any[] = [];
  cliente:any = {
    id_cliente:0,
    nombre:'',
    apellido:'',
    fecha_registro:''
  };
  
  constructor(private servicio: ServicioService){}

  ngOnInit(){
    this.cargarCliente();
    this.limpiarCajas();
  }

  cargarCliente(){
    this.servicio.getAll("clientes").subscribe(data=>{
      this.clientes = data;
      console.log(this.clientes)
    });
  }


  crearCliente(){
      this.servicio.create("clientes",this.cliente).subscribe(data=>{
        this.cargarCliente()//actualiza la tabla para que aparezca el nuevo turno
        this.limpiarCajas()//limpia los entrys 
        
      });

  }
  eliminarCliente(){
      this.servicio.delete("clientes",this.cliente.id_cliente).subscribe(data=>{
        this.cargarCliente()//actualiza la tabla para que aparezca el nuevo turno
        this.limpiarCajas()//limpia los entrys 
      })
    
  }
  modificarCliente(){
    // turno
    this.cliente.fecha_registro = new Date(this.cliente.fecha_registro).toISOString().split('T')[0];

    this.servicio.update("clientes",this.cliente.id_cliente,this.cliente).subscribe(data=>{

      this.cargarCliente()//actualiza la tabla para que aparezca el nuevo turno
      this.limpiarCajas()//limpia los entrys 
    })



  }
  seleccionarTurno(t:any){

    this.cliente.id_cliente = t.id_cliente;
    this.cliente.nombre = t.nombre;
    this.cliente.apellido = t.apellido;
    this.cliente.fecha_registro = new Date(t.fecha_registro).toISOString().split('T')[0]; // 👈 solución
    //copia todo a la lista cliente para ponerlo en los entrys despues
}
  limpiarCajas(){

    const ahora = new Date();

    const fecha_registro = ahora.toISOString().split('T')[0]; // yyyy-mm-dd
    
    this.cliente.id_cliente = 0;
    this.cliente.nombre = "";
    this.cliente.apellido = "";
    this.cliente.fecha_registro = fecha_registro;
  }
}
