import {Injectable} from "@nestjs/common";
import {Neo4jService} from "nest-neo4j/dist";
import {toActualizarData, toCrearData} from "@lib/qeq_lib/neo4j";
import {Medio} from "@lib/qeq_lib/nodes";
import {Node} from '@lib/qeq_lib/interfaces/neo4j'
import {MediaDTO} from "@app/medios/dtos/media.dto";
import {PublishDTO} from "@app/medios/dtos/publish.dto";
import {EmpleoService} from "@lib/qeq_services/empleo";

@Injectable()
export class MedioService {

    constructor(
        private neo: Neo4jService,
        private empleoService: EmpleoService
    ) {
    }

    async getAll(): Promise<any> {
        const promise = await this.neo.write(`
            MATCH (m:Medio)
            RETURN collect(m) AS medios
         `)

        return promise.records[0]?.get('medios')

    }

    async insertMedia(input: MediaDTO): Promise<any> {
        const data = toCrearData(input)
        const promise = await this.neo.write(`CREATE (m:Medio {${data}})
         RETURN m`)

        const res: Node<Medio> = await promise.records[0]?.get('m')
        return res && {...res.properties, id: res.elementId}
    }

    async getByID(id: string): Promise<any> {
        const promise = await this.neo.write(`
            MATCH (m:Medio)
            WHERE elementId(m)="${id}"
            RETURN m
        `)

        const res: Node<Medio> = await promise.records[0]?.get('m')
        return res && {...res.properties, id: res.elementId}
    }

    async updateMedia(id: string, input: MediaDTO): Promise<any> {
        const data = toActualizarData(input)
        const promise = await this.neo.write(`
            MERGE (m:Medio)
            WHERE elementId(m)="${id}" 
            ON CREATE SET (m {"${data}"})
            RETURN m
        `)
        return promise.records[0]?.get('m')
    }

    async deleteByID(id: string): Promise<any> {
        const promise = await this.neo.write(`
            MATCH (m:Medio{id: ${id} }) 
            DETACH DELETE m
            RETURN m
        `)
        return promise.records[0]?.get('m')
    }

    async assosiateMedia(id: string, other: string): Promise<any> {
        const promise = await this.neo.write(`
            MATCH (m:Medio), (n:Medio)
            WHERE elementId(m)="${id}" AND elementId(n)="${other}",
            (n)<-[:ASOCIADO {desde: "fecha_actual"}]-(m)
            RETURN m`)
        return promise.records[0].get('m')
    }

    async publishFile(id: string, input: PublishDTO): Promise<any> {
        const {perfil_id, write_date, imagen, ...rest} = input
        const data = toCrearData(rest)
        const promise = await this.neo.write(`
            MATCH (m:Medio), (p:Perfil)
            WHERE elementId(m)="${id}" AND elementId(p)="${perfil_id}"
            CREATE (f:Ficha {"${data}"}), (f)<-[:PUBLICA_UNA {fecha: "fecha_actual"}]-(m), (f)<-[:ESCRIBE_UNA {fecha: "fecha_actual"}]-(P)
            RETURN m
        `)
        return promise.records[0]?.get('m')
    }

    async offerJob(id: string, data) {
        return this.empleoService.publish(id, data)
    }
}