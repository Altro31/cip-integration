import { Injectable } from '@nestjs/common';
import { Ubicar } from "@repo/cip-libs/dist/dtos/ubicacion";
import { toCrearData } from "@repo/cip-libs/dist/neo4j";
import { UbicadoEn } from "@repo/cip-libs/dist/relationships";
import { Neo4jService } from "nest-neo4j/dist";

@Injectable()
export class UbicacionService {

    constructor(private readonly neo: Neo4jService) {
    }

    async locate(id: string, data: Omit<Ubicar, 'id'>) {
        if (!data.ubicado_en) data.ubicado_en = {} as UbicadoEn
        const { ubicado_en, ...rest } = data
        const ubicado_en_str = toCrearData(ubicado_en)
        const data_str = toCrearData(rest)

        const query = `
            MATCH (p)
            WHERE elementId(p)="${id}"
            CREATE (p)-[:UBICADO_EN ${ubicado_en && `{ ${ubicado_en_str} }`}]->(u:Ubicacion ${data_str && `{ ${data_str}`})
        `

        await this.neo.write(query)
    }
}