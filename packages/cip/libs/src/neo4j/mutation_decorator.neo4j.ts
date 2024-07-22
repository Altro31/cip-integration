/* eslint-disable prefer-rest-params */


import { Node } from "@/interfaces/neo4j";
export function Mutation(_: any, __: any, descriptor: PropertyDescriptor) {

    const oldFunc: () => any = descriptor.value

    descriptor.value = async function () {

        let query = await oldFunc.apply(this, arguments)
        let afterFunc: (id: string) => undefined = () => undefined

        if (query instanceof Array) {
            [query, afterFunc] = query
        }

        const res = await this.neo.write(query)

        if (!res.records) return;

        const keys = res.records[0].keys
        const node: Node<any> = res.records[0]?.get(keys[0])

        afterFunc(node.elementId)
        return {
            id: node.elementId,
            ...node.properties
        }
    }

    return descriptor
}

