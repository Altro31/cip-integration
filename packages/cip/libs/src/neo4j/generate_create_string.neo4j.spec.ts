import {generateCreateString} from "./generate_create_string.neo4j";
import {Blog} from "@/nodes";

describe('createStringGenerator', () => {

    it('should return all data', () => {
        const ex = generateCreateString({
            create: {
                label: ":Blog",
                data: {
                    url: 'url',
                    titulo: 'titulo'
                } as Blog
            },
            parents: [
                {
                    id: 'id1',
                    rel_type: ':APLICA',
                    relations: [
                        {
                            desde: 'desde'
                        }
                    ]
                },
                {
                    id: 'id2',
                    rel_type: ':ASOCIADO',
                    relations: [
                        {
                            desde: 'desde'
                        }
                    ]
                }
            ]
        })

        const res = `MATCH (p0), (p1) WHERE elementId(p0)="id1" AND elementId(p1)="id2" CREATE (t:Blog { url: "url", titulo: "titulo" }), (p0)-[:APLICA { desde: "desde" }]->(t), (p1)-[:ASOCIADO { desde: "desde" }]->(t) RETURN t`
        expect(ex).toBe(res)
    });

    it('should return only blog creation', () => {
        const ex = generateCreateString({
            create: {
                label: ":Blog",
                data: {
                    url: 'url',
                    titulo: 'titulo'
                } as Blog
            }
        })

        const res = `CREATE (t:Blog { url: "url", titulo: "titulo" }) RETURN t`
        expect(ex).toBe(res)
    });

    it('should return blog creation without data', () => {
        const ex = generateCreateString({
            create: {
                label: ":Blog"
            }
        })

        const res = `CREATE (t:Blog) RETURN t`
        expect(ex).toBe(res)
    });

    it('should return only one relation by parent', () => {
        const ex = generateCreateString({
            create: {
                label: ":Blog",
                data: {
                    url: 'url',
                    titulo: 'titulo'
                } as Blog
            },
            parents: [
                {
                    id: 'id1',
                    rel_type: ':APLICA',
                },
                {
                    id: 'id2',
                    rel_type: ':ASOCIADO',
                }
            ]
        })

        const res = `MATCH (p0), (p1) WHERE elementId(p0)="id1" AND elementId(p1)="id2" CREATE (t:Blog { url: "url", titulo: "titulo" }), (p0)-[:APLICA]->(t), (p1)-[:ASOCIADO]->(t) RETURN t`
        expect(ex).toBe(res)
    });

    it('should return 2 relationships to parent 1 one relation by parent', () => {
        const ex = generateCreateString({
            create: {
                label: ":Blog",
                data: {
                    url: 'url',
                    titulo: 'titulo'
                } as Blog
            },
            parents: [
                {
                    id: 'id1',
                    rel_type: ':APLICA',
                    relations: [
                        {
                            desde: 'desde'
                        },
                        {
                            hasta: 'hasta'
                        }
                    ]
                },
                {
                    id: 'id2',
                    rel_type: ':ASOCIADO',
                }
            ]
        })

        const res = `MATCH (p0), (p1) WHERE elementId(p0)="id1" AND elementId(p1)="id2" CREATE (t:Blog { url: "url", titulo: "titulo" }), (p0)-[:APLICA { desde: "desde" }]->(t), (p0)-[:APLICA { hasta: "hasta" }]->(t), (p1)-[:ASOCIADO]->(t) RETURN t`
        expect(ex).toBe(res)
    });
});