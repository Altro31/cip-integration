import type { Perfil } from "~/utils/interface/Perfil"

export function useInjectPerfiles() {
    return inject<Ref<Perfil[]>>(perfilesKey, factory, true)
}

function factory() {
    return ref<Perfil[]>([])
}