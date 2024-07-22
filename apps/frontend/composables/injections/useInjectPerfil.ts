import type { Perfil } from "~/utils/interface/Perfil"

export function useInjectPerfil() {
    return inject<Ref<Perfil>>(perfilKey)
}