import { providerFactory } from "./factories/provider.factory"

export const AuthAPI = providerFactory(AUTH_API_URL)
export const QeqAPI = providerFactory(QEQ_API_URL)
export const DirAPI = providerFactory(DIR_API_URL)