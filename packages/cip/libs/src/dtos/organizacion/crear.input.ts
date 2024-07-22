import {PerteneceA, PerteneceAWithoutId} from "@/relationships";
import {ApiProperty} from "@nestjs/swagger";


export class OrganizacionCrearInput {

    nombre: string

    @ApiProperty({type: [PerteneceAWithoutId]})
    pertenece_a: PerteneceAWithoutId[]

}