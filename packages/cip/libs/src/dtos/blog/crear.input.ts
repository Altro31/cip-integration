import {TieneUn, TieneUnWithoutId} from "@/relationships/tiene_un.relationship";
import {ApiProperty, OmitType} from "@nestjs/swagger";


export class BlogCrearInput {

    titulo: string

    url: string

    @ApiProperty({type: [TieneUnWithoutId]})
    tiene_un?: TieneUnWithoutId[]
}