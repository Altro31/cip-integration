import type { Medio } from '~/utils/interface/Medio'

export const mockMedios: Medio[] = [
  {
    id: '1',
    nombre: 'Granma',
    descripcion: 'Descripcion 1',
    precio: 100,
    frecuencia: 'Semanal',
    alcance: 'Local',
    img: '/medios/granma.jpg'
  },
  {
    id: '2',
    nombre: 'Medio 2',
    descripcion: 'Descripcion 2',
    precio: 200,
    frecuencia: 'Semanal',
    alcance: 'Local',
    img: '/medios/juventud.jpg'
  },
  {
    id: '3',
    nombre: 'Medio 3',
    descripcion: 'Descripcion 3',
    precio: 300,
    frecuencia: 'Semanal',
    alcance: 'Local',
    img: '/medios/trabajadores.jpg'
  },
  {
    id: '4',
    nombre: 'Medio 4',
    descripcion: 'Descripcion 4',
    precio: 400,
    frecuencia: 'Semanal',
    alcance: 'Local',
    img: '/medios/tribuna.jpg'
  }
]
