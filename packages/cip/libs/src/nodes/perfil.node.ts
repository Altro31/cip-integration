export interface Perfil {
  id: string;
  nombre: string
  sudonimo: string
  extracto: string
  activo: boolean
  nacionalidad: string
  curriculum: string
  categoria_cientifica: string
  nivel_academico: string
  categoria_docente: string
  telefono: string
  estado_civil: string
  sexo: Sexo
}

type Sexo = 'Masculino' | 'Femenino' | 'Otro'