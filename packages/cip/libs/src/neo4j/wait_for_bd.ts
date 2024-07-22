import {driver, auth} from 'neo4j-driver';

export async function wait_for_bd(boostrap: Function) {

    console.log('Hola')

    const scheme = process.env.NEO4J_SCHEME
    const host = process.env.NEO4J_HOST
    const port = process.env.NEO4J_PORT
    const uri = `${scheme}://${host}:${port}`
    const username = process.env.NEO4J_USERNAME;
    const password = process.env.NEO4J_PASSWORD;

    const driv = driver(uri, auth.basic(username, password));
    const session = driv.session();

    let pass = false
    while (!pass) {
        try {
            await session.run('RETURN 1');
            pass = true
        } catch (e) {
            console.log('Neo4j no está listo, esperando...');
            await new Promise((resolve => setTimeout(resolve, 3000)))
        }
    }

    boostrap();
}
