import {Test, TestingModule} from "@nestjs/testing";
import {PerfilService} from "@/perfil/perfil.service";
import {Neo4jModule, Neo4jScheme, Neo4jService} from "nest-neo4j/dist";
import {Perfil} from "@repo/cip-libs/dist/nodes";
import {toCrearData} from "@repo/cip-libs/dist/neo4j";
import {Node} from "@repo/cip-libs/dist/interfaces/neo4j";
import {ConfigModule} from "@nestjs/config";


describe('PerfilService', () => {

    let perfilService: PerfilService
    let neoany

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
    let testPerfil_id = undefined

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
            ],
            providers: [PerfilService]
        }).compile()

        perfilService = module.get<PerfilService>(PerfilService)
        neo = module.get<Neo4jService>(Neo4jService)
    })

    describe('buscarUno', () => {
        beforeAll(async () => {
            const query = `
                CREATE (p:Perfil { ${toCrearData(testPerfil)} }) 
                RETURN p
            `
            const res = await neo.write(query)
            const node: Node<Perfil> = res.records[0]?.get('p')
            if (node) testPerfil_id = node.elementId
        })
        afterAll(async () => {
            const query = `
                MATCH (p:Perfil)
                WHERE elementId(p)="${testPerfil_id}"
                DETACH DELETE p
            `
            await neo.write(query)
        })
        it('deberia devolver el perfil de prueba', async () => {
            const {
                id,
                ...perfil
            } = await perfilService.buscarUno(testPerfil_id)
            expect(perfil).toStrictEqual(testPerfil)
        })
    })

    describe('crear', () => {
        it('deberia crear un perfil', async () => {

            const {
                id,
                ...created
            } = await perfilService.crear(testPerfil)

            const {
                id: _,
                ...expected
            } = await perfilService.buscarUno(id)

            expect(created).toStrictEqual(expected)
        });
    });
})