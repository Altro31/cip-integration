import {TieneUn} from "@/relationships";

export class CrearInput {

    nombre: string
    email: string
    rol: string

    tiene_un: Omit<TieneUn, 'id'>[]
}