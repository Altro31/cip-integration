declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST: string
            DB_PORT: number
            DB_DB: string
            DATABASE_URL: string
            SALT_ROUNDS: number
            JWT_SECRET: string
        }
    }
}