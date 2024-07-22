import {OmitType} from "@nestjs/swagger";

export class TieneUn {
    id: string

}

export class TieneUnWithoutId extends OmitType(TieneUn, ["id"]) {
}

