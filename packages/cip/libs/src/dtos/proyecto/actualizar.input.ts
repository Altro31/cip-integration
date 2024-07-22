import {FormoParteDe} from "@/relationships";

export class ProyectoActualizarInput {

    nombre: string
    url: string
    descripcion: string

    formo_parte_de: FormoParteDe[]

}