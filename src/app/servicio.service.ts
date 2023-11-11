import {Injectable} from '@angular/core';
import {EncuentroNacionalInput, ListadoGQL, ListadoQuery, RegistroGQL, RegistroMutation} from "../gql/generated";
import {Observable, of} from "rxjs";
import {SingleExecutionResult} from "@apollo/client";

@Injectable({
  providedIn: 'root'
})
export class ServicioService
{

  constructor(private registroGQL: RegistroGQL, private listadoGQL: ListadoGQL) { }

  registro(datos: EncuentroNacionalInput): Observable<SingleExecutionResult<RegistroMutation>>
  {
    return this.registroGQL.mutate({datos});
  }

  listado(): Observable<SingleExecutionResult<ListadoQuery>>
  {
    return this.listadoGQL.fetch()
  }
}
