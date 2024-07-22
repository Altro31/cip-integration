import {OmitType} from "@nestjs/swagger";

export class FormoParteDe {
    id: string;
    ocupacion: string
    desde: Date
    hasta: Date
}

export class FormoParteDeWithoutId extends OmitType(FormoParteDe, ["id"]) {
}