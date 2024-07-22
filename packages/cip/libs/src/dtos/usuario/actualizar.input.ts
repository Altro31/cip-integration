import {TieneUn} from "@/relationships/tiene_un.relationship";

export class ActualizarInput {

    nombre: string
    email: string
    rol: string

    tiene_un?: TieneUn[]

}