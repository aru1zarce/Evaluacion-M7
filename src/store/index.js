import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    cursos: [
      { id: 1, img: 'https://i.pinimg.com/originals/b5/57/64/b55764416830e7d8b0133c7c0eeaf445.png', nombre: 'JavaScript Avanzado', costo: 30000, duracion: '2 meses', cupos: 20, inscritos: 10, completado: false , fecha_registro: '06/03/2022', descripcion: 'Curso con las nuevas actualizaciones de JavaScript.' },
      { id: 2, img: 'https://lineadecodigo.com/wp-content/uploads/2014/04/css.png', nombre: 'CSS para principiantes', costo: 10000, duracion: '1 mes', cupos: 35, inscritos: 23, completado: false, fecha_registro: '05/03/2022', descripcion: 'Aprendiendo estilos con CSS desde el nivel más básico.' },
      { id: 3, img: 'https://1000marcas.net/wp-content/uploads/2020/11/JavaScript-logo.jpg', nombre: 'JavaScript Básico de 0 a 100', costo: 20000, duracion: '2 meses', cupos: 25, inscritos: 0, completado: true, fecha_registro: '05/03/2022', descripcion: 'Programando para la web con JavaScript.' },
    ]
  },
  getters: {
    getAlumnosInscritos: (state) => {
      return state.cursos.reduce((acc, curso) => acc + parseInt(curso.inscritos), 0)
    },
    getTotalCupos: (state) => {
      return state.cursos.reduce((acc, curso) => acc + parseInt(curso.cupos) , 0)
    },
    getCuposDisponibles: (state, getters) => {
      return parseInt(getters.getTotalCupos - getters.getAlumnosInscritos)
    },
    getCursosCompletados: (state) => {
      return state.cursos.reduce((acc, curso) => acc + !!curso.completado, 0)
  },
  getCursosActivos: (state) => {
    return state.cursos.reduce((acc, curso) => acc + !curso.completado, 0)
},
getTotalCursos: (state) => {
  return state.cursos.length
}
  },
  mutations: {
    editarCurso(state, curso) {
      const index = state.cursos.findIndex(c => c.id === curso.id)
      state.cursos.splice(index, 1, curso)
    },
    eliminarCurso(state, id) {
      state.cursos = state.cursos.filter(curso => curso.id !== id)
    },
    agregarCurso(state, curso) {
      state.cursos.push(curso)
    }
  },
  actions: {
    eliminarCurso({ commit }, id) {
      commit('eliminarCurso', id)
      },
    agregarCurso({ commit }, curso) {
      commit('agregarCurso', curso)
    },
    editarCurso({ commit }, curso) {
      commit('editarCurso', curso)
    }
  },
  modules: {
  }
})
