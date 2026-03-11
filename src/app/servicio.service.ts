import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';
// injectable (esta clase puede ser inyectada como servicio en otros componentes)
//observables es para manejar datos
//httpclient este es el modulo que permite hacer peticiones HTTP:get,post,put,delete

@Injectable({
  providedIn: 'root'
})
//injectable o decorador de arriba significa que el servicio esta disponible en toda la aplicacion
export class ServicioService {
  //direccion del backend
  private API_URL = 'http://localhost:5000/api';
  //el contructor sirve para injectar el httpclient y entonces dentro del servicio puedes usar http.get post put delete etc
  constructor(private http: HttpClient) { }

  // ➕ CREAR endpoint(pizza,data:[1,2,3])
  create(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${endpoint}`, data);
  }

  // ✏️ MODIFICAR
  update(endpoint: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${endpoint}/${id}`, data);
  }

  // ❌ ELIMINAR
  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${endpoint}/${id}`);
  }

  // OBTENER TODOS LOS DATOS
  getAll(endpoint: string): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/${endpoint}`);
  }

  // OBTENER UN SOLO DATO
  getById(endpoint: string,id:number): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/${endpoint}/${id}`);
  }
  //el <any> significa que la respuesta del servidor puede ser cualquier tipo de dato






}
