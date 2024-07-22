import type { Perfil } from "~/utils/interface/Perfil";

export function usePerfilDirection(perfiles: Perfil[]) {
    const route = useRoute()
    const { id } = route.params
    let index = perfiles.findIndex(perfil => perfil.id === id)
    if (index === -1) index = 0
    const hasPrevious = index - 1 >= 0
    const hasNext = index + 1 < perfiles.length
    const activePerfil = useActivePerfilID()
    const router = useRouter()

    function next() {
        if (hasNext) {
            const nextPerfil = perfiles.at(index + 1)
            router.push(`/perfiles/${nextPerfil?.id}`)
            activePerfil.value = nextPerfil?.id
        }
    }

    function previous() {
        if (hasPrevious) {
            const previousPerfil = perfiles.at(index - 1)
            router.push(`/perfiles/${previousPerfil?.id}`)
            activePerfil.value = previousPerfil?.id
        }
    }

    return { hasNext, hasPrevious, next, previous }
}