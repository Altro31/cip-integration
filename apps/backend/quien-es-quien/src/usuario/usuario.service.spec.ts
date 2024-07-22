import {UsuarioService} from "@/usuario/usuario.service";
import {Neo4jModule, Neo4jScheme, Neo4jService} from "nest-neo4j/dist";
import {Usuario} from "@repo/cip-libs/dist/nodes";
import {Test, TestingModule} from "@nestjs/testing";
import {ConfigModule} from "@nestjs/config";
import {toCrearData} from "@repo/cip-libs/dist/neo4j";
import {Node} from "@repo/cip-libs/dist/interfaces/neo4j";
import {PerfilModule} from "@/perfil/perfil.module";
import {PerfilService} from "@/perfil/perfil.service";

describe('UsuarioService', () => {

    let usuarioService: UsuarioService
    let perfilService: PerfilService
    let neoany

    const testUsuario = {
        email: "email de prueba",
        nombre: "nombre de prueba",
        rol: "rol de prueba",
        tiene_un: []
    }
    let testUsuario_id = undefined

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
                PerfilModule
            ],
            providers: [UsuarioService]
        }).compile()

        usuarioService = module.get(UsuarioService)
        perfilService = module.get(PerfilService)
        neo = module.get<Neo4jService>(Neo4jService)
    })

    describe('buscarUno', () => {
        beforeAll(async () => {
            const query = `
                CREATE (u:Usuario { ${toCrearData(testUsuario)} }) 
                RETURN u
            `
            const res = await neo.write(query)
            const node: Node<Usuario> = res.records[0]?.get('u')
            if (node) testUsuario_id = node.elementId
        })
        afterAll(async () => {
            const query = `
                MATCH (u:Usuario)
                WHERE elementId(u)="${testUsuario_id}"
                DETACH DELETE u
            `
            await neo.write(query)
        })
        it('deberia devolver el usuario de prueba', async () => {
            const {
                id,
                ...usuario
            } = await usuarioService.buscarUno(testUsuario_id)
            const expected = {...testUsuario}
            expect(usuario).toStrictEqual(expected)
        })
    })

    describe('crear', () => {
        it('deberia crear un usuario', async () => {

            const {
                id,
                perfil_id,
                ...created
            } = await usuarioService.crear(testUsuario)

            const {
                id: _,
                ...rest
            } = await usuarioService.buscarUno(id)

            const perfil = await perfilService.buscarUno(perfil_id)

            expect(created).toStrictEqual(rest)
            expect(perfil).toStrictEqual({id: perfil_id})
        });
    });
})