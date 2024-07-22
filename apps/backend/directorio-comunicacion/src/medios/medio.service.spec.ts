import {Neo4jModule, Neo4jScheme, Neo4jService} from "nest-neo4j/dist";
import {Test, TestingModule} from "@nestjs/testing";
import {ConfigModule} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {MediaDTO} from "@app/medios/dtos/media.dto";
import {MedioService} from "@app/medios/medio.service";
import {toCrearData} from "@lib/qeq_lib/neo4j";
import {Medio} from "@lib/qeq_lib/nodes";
import {Node} from "@lib/qeq_lib/interfaces/neo4j";

describe('MedioService', () => {

    let medioService: MedioService
    let neo: Neo4jService

    const testMedio: MediaDTO = {
        scope: "alcance de prueba",
        description: "descripcion de prueba",
        frecuency: "frecuencia de prueba",
        name: "nombre de prueba",
        cost: 0.50
    }
    let testMedio_id = undefined

    beforeAll(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                //Config
                ConfigModule.forRoot({
                    envFilePath: '.env.production.production',
                }),

                Neo4jModule.forRoot({
                    scheme: <Neo4jScheme>process.env.NEO4J_SCHEME,
                    host: process.env.NEO4J_HOST,
                    password: process.env.NEO4J_PASSWORD,
                    port: process.env.NEO4J_PORT,
                    username: process.env.NEO4J_USERNAME,
                    database: process.env.NEO4J_DB,
                }),

                ClientsModule.register([
                    {
                        name: 'EMPLEO_SERVICE',
                        transport: Transport.TCP,
                        options: { port: parseInt(process.env.MS_EMPLEO_PORT) }
                    }
                ])
            ],
            providers: [MedioService]
        }).compile()

        medioService = module.get<MedioService>(MedioService)
        neo = module.get<Neo4jService>(Neo4jService)
    })

    describe('buscarUno', () => {
        beforeAll(async () => {
            const query = `
                CREATE (m:Medio { ${toCrearData(testMedio)} }) 
                RETURN m
            `
            const res = await neo.write(query)
            const node: Node<Medio> = res.records[0]?.get('m')
            if (node) testMedio_id = node.elementId
        })
        afterAll(async () => {
            const query = `
                MATCH (m:Medio)
                WHERE elementId(m)="${testMedio_id}"
                DETACH DELETE m
            `
            await neo.write(query)
        })
        it('deberia devolver el medio de prueba', async () => {
            const {
                id,
                ...medio
            } = await medioService.getByID(testMedio_id)
            const expected = {...testMedio}
            expect(medio).toStrictEqual(expected)
        })
    })

    describe('crear', () => {
        it('deberia crear un medio', async () => {

            const {
                id,
                ...created
                // @ts-ignore
            } = await medioService.insertMedia(testMedio)

            const {
                id: _,
                ...expected
            } = await medioService.getByID(id)

            expect(created).toStrictEqual(expected)
        });
    });
})