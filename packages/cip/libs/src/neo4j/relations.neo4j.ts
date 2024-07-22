export type RelationsNeo4j =
  | ':TIENE_UN'
  | ':VOLUNTARIO_EN'
  | ':ESTUDIO_EN'
  | ':CERTIFICADO_DE'
  | ':FORMO_PARTE_DE'
  | ':PREMIO_EN'
  | ':ESTA_EN'
  | ':PERTENECE_A'
  | ':ACTIVISTA_EN'
  | ':TRABAJO_EN'
  | ':SIGUE_A'
  | ':PARTICIPO_EN'
  | ':MURIO_EN'
  | ':NACIO_EN'
  | ':FONDO'
  | ':PERFIL'
  | ':UBICADO_EN'
  | ':ASOCIADO'
  | ':TIENE_UNA'
  | ':PUBLICA_UNA'
  | ':OFRECE'
  | ':COMENTA'
  | ':APLICA'
  | ':ESCRIBE_UNA'

export function relToLoweCase(rel: RelationsNeo4j) {
  return rel.slice(1, null).toLowerCase()
}
