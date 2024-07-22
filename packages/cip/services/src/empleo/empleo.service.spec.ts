import {Test, TestingModule} from "@nestjs/testing";
import {EmpleoService} from "./empleo.service";
import {ConfigModule} from "@nestjs/config";
import {Neo4jModule, Neo4jScheme, Neo4jService} from "nest-neo4j/dist";
import {toCrearData} from "@repo/cip-libs/dist/neo4j";
import {PerfilService} from "@app/perfil/perfil.service";
import {PublicarEmpleo} from "@repo/cip-libs/dist/dtos/empleo";
import {Node} from "@repo/cip-libs/dist/interfaces/neo4j";

describe('EmpleoService', () => {

    let empleoService: EmpleoService
    let perfilService: PerfilService
    let neo: Neo4jService

    const testPublicarEmpleo: Omit<PublicarEmpleo, "id"> = {
        descripcion: "descripcion de prueba",
        nombre: "nombre de prueba",
        requisitos: ["requisito 1", "requisito 2", "requisito 3"],
        salario: "salario de prueba",
        ubicacion: "ubicacion de prueba"
    }

    const testMedio = {
        scope: "alcance de prueba",
        description: "descripcion de prueba",
        frecuency: "frecuencia de prueba",
        name: "nombre de prueba",
        cost: 0.50
    }

    beforeAll(async () => {

        const testingModule: TestingModule = await Test.createTestingModule({
            imports: [

                //Config
                ConfigModule.forRoot({
                    envFilePath: '.env.production.production',
                }),

                //neo4j
                Neo4jModule.forRoot({
                    scheme: <Neo4jScheme>process.env.NEO4J_SCHEME,
                    host: process.env.NEO4J_HOST,
                    password: process.env.NEO4J_PASSWORD,
                    port: process.env.NEO4J_PORT,
                    username: process.env.NEO4J_USERNAME,
                    database: process.env.NEO4J_DB,
                })

            ],
            providers: [EmpleoService, PerfilService]
        }).compile()

        empleoService = testingModule.get(EmpleoService)
        perfilService = testingModule.get(PerfilService)
        neo = testingModule.get(Neo4jService)
    })

    let testId: string
    beforeAll(async () => {
        const query = `
                CREATE (m:Medio { ${toCrearData(testMedio)} }) 
                RETURN m
            `
        const res = await neo.write(query)
        const node: Node<any> = res.records[0]?.get('m')
        if (node) testId = node.elementId
    })
    afterAll(async () => {
        const query = `
                MATCH (m:Medio)
                WHERE elementId(m)="${testId}"
                DETACH DELETE m
            `
        await neo.write(query)
    })

    describe('publish', () => {
        it('deberia publicar un empleo', async () => {
            const {
                id,
                ...actual
            } = await empleoService.publish(testId, testPublicarEmpleo)
            expect(actual).toStrictEqual(testPublicarEmpleo)
        });
    })

    const testPerfil = {
        activo: false,
        categoria_cientifica: "categoria cientifica de prueba",
        categoria_docente: "categoria docente de prueba",
        curriculum: "curriculum de prueba",
        estado_civil: "estado civil de prueba",
        extracto: "extracto de prueba",
        nacionalidad: "nacionalidad de prueba",
        nivel_academico: "nivel academico de prueba",
        nombre: "nombre de prueba",
        sexo: "Masculino",
        sudonimo: "seudonimo de prueba",
        telefono: "telefono de prueba"

    }

    describe('apply', () => {
        let perfiltId_test: string
        let empleoId_test: string
        beforeAll(async () => {
            const perfil = await perfilService.crear(testPerfil)
            perfiltId_test = perfil.id

            const empleo = await empleoService.publish(testId, testPublicarEmpleo)
            empleoId_test = empleo.id
        })
        afterAll(async () => {
            const query = `
                MATCH (p:Perfil),(e:Empleo)
                WHERE elementId(p)="${perfiltId_test}" AND elementId(e)="${empleoId_test}"
                DETACH DELETE p,e
            `
            await neo.write(query)
        })
        it('deberia el perfil aplicar a un empleo', async () => {
            expect(empleoService.apply(empleoId_test, perfiltId_test)).resolves.toBeUndefined()
        });
    })
})