import type { Perfil } from "~/utils/interface/Perfil"

export async function useFetchPerfiles() {
    return useFetch<Perfil[]>('/api/perfiles')
}