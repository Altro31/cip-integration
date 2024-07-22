import { Injectable } from '@nestjs/common';
import {Neo4jService} from "nest-neo4j/dist";
import {PublicarEmpleo} from "@repo/cip-libs/dist/dtos/empleo";
import {toCrearData} from "@repo/cip-libs/dist/neo4j";
import {Node} from "@repo/cip-libs/dist/interfaces/neo4j";
import {Empleo} from "@repo/cip-libs/dist/nodes";

@Injectable()
export class EmpleoService {

    constructor(private readonly neo: Neo4jService) {
    }

    async publish(id: string, data: Omit<PublicarEmpleo, 'id'>) {
        const data_str = toCrearData(data)
        const query = `
            MATCH (p)
            WHERE elementId(p)="${id}"
            CREATE (p)-[pe:OFRECE { fecha_publicacion: "${new Date()}"}]->(e:Empleo { ${data_str} })
            RETURN e
        `
        const res = await this.neo.write(query)
        const node: Node<Empleo> = res.records[0]?.get('e')
        return node && {
            ...node.properties,
            id: node.elementId
        }

    }

    async apply(empleo_id: string, usuario_id: string) {

        const query = `
            MATCH (e:Empleo), (p:Perfil)
            WHERE elementId(e)="${empleo_id}" AND elementId(p)="${usuario_id}"
            CREATE (p)-[:APLICA_A { fecha: "${new Date()}" }]->(e)
        `

        await this.neo.write(query)
    }
}