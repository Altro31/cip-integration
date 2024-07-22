import {LabelsNeo4j} from "@/neo4j/labels.neo4j";
import {Node} from "@/interfaces/neo4j/node.interface";
import {Neo4jService} from "nest-neo4j/dist";
import {Relationship} from "@/interfaces/neo4j/relationship.interface";

export abstract class CRUDService {

    protected neo: Neo4jService

    protected constructor(private tail: LabelsNeo4j, private head: LabelsNeo4j) {
    }

    async buscarUno(parent_id: string, id: string): Promise<any | undefined> {

        const res = await this.neo.read(`
            MATCH (p${this.tail})-[r]->(c${(this.head)})
            WHERE elementId(p)="${parent_id}" AND elementId(c)="${id}"
            RETURN c, collect(r) AS r
        `)

        const node: Node<any> = res.records[0]?.get('c')
        if (!node) return;

        const rels: Relationship<any>[] = res.records[0]?.get('r')

        return rels.reduce((prev, curr) => {
            const type = curr.type.toLowerCase()
            const properties = curr.properties
            const id = curr.elementId
            if (!prev[type]) prev[type] = []
            prev[type].push({...properties, id})
            return prev
        }, {...node.properties, id: node.elementId})
    }

    async buscarTodos(parent_id: string): Promise<any | undefined> {

        const res = await this.neo.read(`
            MATCH (p${this.tail})-[r]->(c${(this.head)})
            WHERE elementId(p)="${parent_id}"
            RETURN c, collect(r) as rels
        `)

        const nodes = res.records
        if (nodes.length <= 0) return;

        const rels: Node<any>[] = res.records[0]?.get('rels')

        return (<Node<any>[]>nodes[0].get('rels')).map((node, i) => ({
            //...nodes[i].properties,
            ...rels[i].properties,
            id: node.elementId
        }))
    }

    abstract crear(parent_id: string, input: any): Promise<any | undefined>

    abstract actualizar(parent_id: string, id: string, input: any): Promise<any | undefined>

    async eliminar(id: string): Promise<any | undefined> {
        const res = await this.neo.write(`
            MATCH (c${(this.head)})
            WHERE elementId(c)="${id}"
            DETACH DELETE c
            RETURN c
        `)
        return res.records[0]?.get('c')
    }
}