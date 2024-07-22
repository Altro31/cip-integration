import {LabelsNeo4j} from "@/neo4j/labels.neo4j";
import {RelationsNeo4j} from "@/neo4j/relations.neo4j";
import {toActualizarData} from "@/neo4j/toData/to_actualizar_data.neo4j";
import {IDable} from "@/interfaces/IDable.interface";


export interface Parent {
    id: string
    relations?: IDable[]
    rel_type: RelationsNeo4j
}

interface Args {
    update: {
        id: string
        data: any
        label: LabelsNeo4j
    }
    parents?: Parent[]
}

export function generateUpdateString(options: Args) {
    const {
        update: {label, id},
        parents
    } = options
    const {id: _, ...rest} = options.update.data
    const data = options.update.data ? toActualizarData(rest, 't') : ''

    type STRList = { find: string[], filter: string[], update: string[] }
    const str: STRList = {find: [], filter: [], update: []}
    const res = {find: '', filter: '', update: ''}

    if (parents) {
        parents.forEach((parent, i) => {
            const p = `p${i}`
            const rel_list = []
            if (parent.relations && parent.relations.length > 0)
                rel_list.push(...parent.relations.map((rel, j) => {
                    const r = `r${i}${j}`
                    const {id, ...rest} = rel
                    str.find.push(`(${p})-[${r}${parent.rel_type}]->(t${label})`)
                    str.filter.push(`elementId(${r})="${id}"`)
                    return toActualizarData(rest, r)
                }))

            str.update.push(rel_list.join(', '))
        })
        res.find = `, ${str.find.join(', ')}`
        res.filter = ` AND ${str.filter.join(' AND ')}`
        res.update = `, ${str.update.join(', ')}`
    }

    return `MATCH (t)${res.find} WHERE elementId(t)="${id}"${res.filter} SET ${data}${res.update} RETURN t`
}