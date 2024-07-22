import {UbicadoEn} from "@/relationships";

export interface Ubicar {
    id: string
    ubicado_en?: Omit<UbicadoEn, 'id'>
}

