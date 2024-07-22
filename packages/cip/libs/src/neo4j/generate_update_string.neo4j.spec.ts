import {generateUpdateString} from "./generate_update_string.neo4j";
import {Blog} from "@/nodes";

describe('updateStringGenerator', () => {

    it('should return all data', () => {
        const ex = generateUpdateString({
            update: {
                id: 'id1',
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
                            id: 'id1',
                            desde: 'desde'
                        }
                    ]
                },
                {
                    id: 'id2',
                    rel_type: ':ASOCIADO',
                    relations: [
                        {
                            id: 'id2',
                            desde: 'desde'
                        }
                    ]
                }
            ]
        })

        const res = `MATCH (t), (p0)-[r00:APLICA]->(t:Blog), (p1)-[r10:ASOCIADO]->(t:Blog) WHERE elementId(t)="id1" AND elementId(r00)="id1" AND elementId(r10)="id2" SET t.url= "url", t.titulo= "titulo", r00.desde= "desde", r10.desde= "desde" RETURN t`
        expect(ex).toBe(res)
    });

    it('should return only blog updated', () => {
        const ex = generateUpdateString({
            update: {
                id: 'id1',
                label: ":Blog",
                data: {
                    url: 'url',
                    titulo: 'titulo'
                } as Blog
            }
        })

        const res = `MATCH (t) WHERE elementId(t)="id1" SET t.url= "url", t.titulo= "titulo" RETURN t`
        expect(ex).toBe(res)
    });
});