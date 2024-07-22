import {LabelsNeo4j} from "@/neo4j/labels.neo4j";
import {toCrearData} from "@/neo4j/toData/to_crear_data.neo4j";
import {RelationsNeo4j} from "@/neo4j/relations.neo4j";

interface Parent {
    id: string
    relations?: any[]
    rel_type: RelationsNeo4j
}

interface Args {
    create: {
        data?: any
        label: LabelsNeo4j
    }
    parents?: Parent[]
}

export function generateCreateString(options: Args) {
    const {
        create: {label},
        parents
    } = options

    const data = options.create.data ? toCrearData(options.create.data) : ''

    type STRList = { find: string[], filter: string[], create: string[] }
    const str: STRList = {find: [], filter: [], create: []}
    const res = {find: '', filter: '', create: ''}

    if (parents) {
        parents.forEach((parent, i) => {
            const p = `p${i}`
            str.find.push(`(${p})`)
            str.filter.push(`elementId(${p})="${parent.id}"`)

            const rel_list = []
            if (parent.relations && parent.relations.length > 0)
                rel_list.push(...parent.relations.map(rel => (
                    `(${p})-[${parent.rel_type} { ${toCrearData(rel)} }]->(t)`
                )))
            else
                rel_list.push(`(${p})-[${parent.rel_type}]->(t)`)

            str.create.push(rel_list.join(', '))
        })
        res["find"] = `MATCH ${str.find.join(', ')} `
        res["filter"] = `WHERE ${str.filter.join(' AND ')} `
        res["create"] = `, ${str.create.join(', ')}`
    }

    return `${res["find"]}${res["filter"]}CREATE (t${label}${data && ` { ${data} }`})${res["create"]} RETURN t`
}