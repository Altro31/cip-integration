import {TieneUn} from "@/relationships/tiene_un.relationship";
import {ApiProperty} from "@nestjs/swagger";

export class BlogActualizarInput {

    titulo?: string

    url?: string

    @ApiProperty({type: [TieneUn]})
    tiene_un?: TieneUn[]

}