import type { Perfil } from '~/utils/interface/Perfil'

export function usePerfilActiveState (perfil: Perfil) {
  const { params } = useRoute()
  const perfilId = params.id

  return perfilId === perfil.id
}
