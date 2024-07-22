import {FormoParteDe, FormoParteDeWithoutId} from "@/relationships";
import {ApiProperty} from "@nestjs/swagger";


export class ProyectoCrearInput {

    nombre: string
    url: string
    descripcion: string

    @ApiProperty({type: [FormoParteDeWithoutId]})
    formo_parte_de: FormoParteDeWithoutId[]

}