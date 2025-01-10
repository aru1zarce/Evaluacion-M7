<template>
  <v-container>
    <div class="text-center">
      <h1>Administración de Cursos</h1>
      <br>
      <v-btn color="primary" @click="showForm">Agregar Curso</v-btn>
    </div>
    <br>
    <div class="table-container  d-none d-md-flex">
      <v-table height="300px" fixed-header class="table ">
        <thead>
          <tr>
            <th class="text-left">Curso</th>
            <th class="text-left">Cupos</th>
            <th class="text-left">Inscritos</th>
            <th class="text-left">Duración</th>
            <th class="text-left">Costo</th>
            <th class="text-left">Terminado</th>
            <th class="text-left">Fecha</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="curso in cursos" :key="curso.id">
            <td>{{ curso.nombre }}</td>
            <td>{{ curso.cupos }}</td>
            <td>{{ curso.inscritos }}</td>
            <td>{{ curso.duracion }}</td>
            <td><span class="common-style">${{ curso.costo }}</span></td>
            <td><span :class="curso.completado ? 'Si' : 'No'">{{ curso.completado ? 'Sí' : 'No' }}</span></td>
            <td><span class="common-style">{{ curso.fecha_registro }}</span></td>
            <td>
              <div class="actions">
                <i class="fa-solid fa-pencil" style="color: orange" @click="searchCurso(curso.id)"></i>
                <i class="fa-solid fa-trash" style="color: #f20202;" @click="elminarCurso(curso.id)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>

    </div>
    <div class="d-flex flex-column d-md-none">
      <v-card v-for="curso in cursos" :key="curso.id" class="mb-3">
        <v-card-title class="d-flex justify-space-between">
          <span>{{ curso.nombre }}</span>

        </v-card-title>
        <v-card-subtitle>
          <strong>Cupos:</strong> {{ curso.cupos }} <br />
          <strong>Inscritos:</strong> {{ curso.inscritos }} <br />
          <strong>Duración:</strong> {{ curso.duracion }} <br />
          <strong>Costo:</strong> ${{ curso.costo }} <br />
          <strong>Terminado:</strong> {{ curso.completado ? 'Sí' : 'No' }} <br />
          <strong>Fecha:</strong> {{ curso.fecha_registro }}
        </v-card-subtitle>
        <div class="actions">
          <i class="fa-solid fa-pencil" style="color: orange" @click="searchCurso(curso.id)"></i>
          <i class="fa-solid fa-trash" style="color: #f20202;" @click="elminarCurso(curso.id)"></i>
        </div>
      </v-card>
    </div>
    <hr>
    <br>
    <v-alert color="purple" outlined><i class="fa-solid fa-user-group"></i> Cantidad total de alumnos permitidos:
      <strong>{{ getTotalCupos }}</strong> alumnos. </v-alert>
    <v-alert color="blue" outlined><i class="fa-solid fa-user-check"></i> Cantidad total de alumnos inscritos:
      <strong>{{ getAlumnosInscritos }}</strong> </v-alert>
    <v-alert color="red" outlined><i class="fa-solid fa-user-plus"></i> Cantidad total de cupos restantes: <strong>{{
        getCuposDisponibles }}</strong> </v-alert>
    <v-alert color="pink" outlined><i class="fa-solid fa-ban"></i> Cantidad total de cursos terminados: <strong>{{
        getCursosCompletados }}</strong> </v-alert>
    <v-alert color="green" outlined><i class="fa-solid fa-bell"></i> Cantidad total de cursos activos: <strong>{{
        getCursosActivos }}</strong> </v-alert>
    <v-alert color="orange" outlined><i class="fa-solid fa-bell fa-shake"></i> Cantidad total de cursos: <strong>{{
        getTotalCursos }}</strong> </v-alert>


    <div class="overlay" v-if="show">
      <v-sheet v-if="show" class="mx-auto pa-5" elevation="10" max-height="80%"
        style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; max-width: 600px; background-color: #fff;">
        <v-form ref="form" id="form">
          <v-container>
            <v-row dense>
              <!-- Nombre del curso -->
              <v-col cols="12">
                <v-text-field :rules="rules" label="Nombre del curso" variant="outlined" v-model="curso.nombre"
                  required></v-text-field>
              </v-col>

              <!-- URL de la imagen -->
              <v-col cols="12">
                <v-text-field :rules="rules" label="URL de la imagen" variant="outlined"
                  v-model="curso.img"></v-text-field>
              </v-col>

              <!-- Cupos y Inscritos -->
              <v-col cols="6">
                <v-text-field :rules="[v => v > 0 || 'Debe ser mayor a 0']" label="Cupos del curso" type="number"
                  variant="outlined" v-model="curso.cupos"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field :rules="[v => v >= 0 || 'No puede ser negativo']" label="Inscritos en el curso"
                  type="number" variant="outlined" v-model="curso.inscritos"></v-text-field>
              </v-col>

              <!-- Duración del curso -->
              <v-col cols="12">
                <v-text-field :rules="rules" label="Duración del curso" variant="outlined"
                  v-model="curso.duracion"></v-text-field>
              </v-col>

              <!-- Fecha de inicio del curso -->
              <v-col cols="12">
                <v-text-field :rules="rules" label="Fecha de inicio del curso" variant="outlined"
                  v-model="curso.fecha_registro"></v-text-field>
              </v-col>

              <!-- Costo del curso -->
              <v-col cols="12">
                <v-text-field :rules="[v => v > 0 || 'El costo debe ser mayor a 0']" label="Costo del curso ($)"
                  type="number" variant="outlined" v-model="curso.costo"></v-text-field>
              </v-col>

              <!-- Descripción -->
              <v-col cols="12">
                <v-textarea label="Descripción del curso" variant="outlined" v-model="curso.descripcion"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <div class="d-flex justify-space-around mt-4">
            <v-btn color="success" @click="agregarNuevoCurso">Agregar</v-btn>
            <v-btn color="error" @click="ocultarForm">Cancelar</v-btn>
          </div>
        </v-form>
      </v-sheet>

    </div>
    <div class="overlay" v-if="showEdit">
      <v-sheet v-if="showEdit" class="mx-auto pa-5" elevation="10"
        style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; max-width: 600px; background-color: #fff;">
        <v-form ref="form" id="formEdit">
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field :rules="rules" label="Nombre del curso" variant="outlined" v-model="cursoEdit.nombre"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field :rules="rules" label="URL de la imagen" variant="outlined"
                  v-model="cursoEdit.img"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field :rules="[v => v > 0 || 'Debe ser mayor a 0']" label="Cupos del curso" type="number"
                  variant="outlined" v-model="cursoEdit.cupos"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field :rules="[v => v >= 0 || 'No puede ser negativo']" label="Inscritos en el curso"
                  type="number" variant="outlined" v-model="cursoEdit.inscritos"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field :rules="rules" label="Duración del curso" variant="outlined"
                  v-model="cursoEdit.duracion"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field :rules="rules" label="Fecha de registro" variant="outlined"
                  v-model="cursoEdit.fecha_registro"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-switch label="¿El curso está completado?" v-model="cursoEdit.completado"></v-switch>
              </v-col>
              <v-col cols="12">
                <v-text-field :rules="[v => v > 0 || 'El costo debe ser mayor a 0']" label="Costo del curso ($)"
                  type="number" variant="outlined" v-model="cursoEdit.costo"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Descripción del curso" variant="outlined"
                  v-model="cursoEdit.descripcion"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <div class="d-flex justify-space-between mt-4">
            <v-btn color="success" @click="editarCurso">Editar</v-btn>
            <v-btn color="error" @click="ocultarFormEdit">Cerrar</v-btn>
          </div>
        </v-form>
      </v-sheet>

    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import alert from 'sweetalert2';
import sweetalert2 from 'sweetalert2/dist/sweetalert2';
export default {
  name: 'AdminComponent',
  data: () => ({
    show: false,
    showEdit: false,
    rules: [
      v => !!v || 'Este campo es requerido',

    ],

    curso: {
      id: 0,
      nombre: '',
      img: '',
      descripcion: '',
      cupos: 0,
      costo: 0,
      duracion: '',
      completado: false,
      fecha_registro: new Date().toLocaleDateString(),
      inscritos: 0,
    },
    cursoEdit: {
      id: 0,
      nombre: '',
      img: '',
      descripcion: '',
      cupos: 0,
      costo: 0,
      duracion: '',
      completado: Boolean,
      fecha_registro: '',
      inscritos: 0,
    },

  }),
  computed: {
    ...mapState(['cursos']),
    ...mapGetters(['getAlumnosInscritos']),
    ...mapGetters(['getTotalCupos']),
    ...mapGetters(['getCuposDisponibles']),
    ...mapGetters(['getCursosCompletados']),
    ...mapGetters(['getCursosActivos']),
    ...mapGetters(['getTotalCursos']),
    ...mapActions(['agregarCurso'])
  },
  methods: {

    searchCurso(id) {
      this.$store.state.cursos.find(curso => {
        if (curso.id === id) {
          this.cursoEdit = { ...curso };
        }
      });
      this.showEdit = true;
    },
    editarCurso() {
      if (!this.$refs.form.validate()) {
        return; // Detener si hay errores
      } else if (this.cursoEdit.inscritos > this.cursoEdit.cupos) {
        alert.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El número de inscritos no puede ser mayor al número de cupos!',
        });
        return;
      } else if (this.cursoEdit.completado === true) {
        this.cursoEdit.completado = true;
        this.cursoEdit.inscritos = 0;
      } else if (this.cursoEdit.completado === false) {
        this.cursoEdit.completado = false;
      }
      this.$store.dispatch('editarCurso', this.cursoEdit);
      this.showEdit = false;
    },
    elminarCurso(id) {
      alert.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!'
      }).then((result) => {


        if (result.isConfirmed) {
          this.$store.dispatch('eliminarCurso', id);
          sweetalert2.fire(
            'Eliminado!',
            'El curso ha sido eliminado.',
            'success'
          )
        }
      })

    },
    ocultarForm() {
      this.show = false;
    },
    ocultarFormEdit() {
      this.showEdit = false;
    },
    showForm() {
      this.show = true;
    },
    agregarNuevoCurso() {
      if (!this.$refs.form.validate()) {
        return; // Detener si hay errores
      } else if (this.curso.inscritos > this.curso.cupos) {
        alert.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El número de inscritos no puede ser mayor al número de cupos!',
        });
        return;
      } else if (this.cursoEdit.inscritos > this.cursoEdit.cupos) {
        alert.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El número de inscritos no puede ser mayor al número de cupos!',
        });
        return;
      } else {

        const nuevoCurso = {
          id: this.cursos.length + 1,
          nombre: this.curso.nombre,
          img: this.curso.img,
          descripcion: this.curso.descripcion,
          cupos: this.curso.cupos,
          costo: this.curso.costo,
          duracion: this.curso.duracion,
          completado: this.curso.completado,
          fecha_registro: this.curso.fecha_registro,
          inscritos: this.curso.inscritos,
        };

        this.$store.dispatch('agregarCurso', nuevoCurso);
        this.show = false;

      }
    },

  },
};
</script>

<style scoped>
.table-container {
  position: relative;
  display: flex;
  justify-content: center;
  /* Centra horizontalmente */
  margin: 20px;
  /* Espaciado alrededor de la tabla */
  width: 100%;
}

.table {
  width: 100%;
  /* O un ancho específico, como 80% */
  max-width: 800px;
  /* Limita el ancho máximo de la tabla */
}

td {
  position: relative;
  text-align: start;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

td span {
  display: block;
  /* Hace que el span ocupe todo el ancho del td */
  width: 100%;
  /* Ocupa el 100% del ancho del td */
  height: 100%;
  /* Ocupa el 100% del alto del td */
  text-align: center;
  /* Centra el texto horizontalmente */
  line-height: 100%;
  /* Centra el texto verticalmente */
  padding: 0;
  /* Elimina el padding para que ocupe todo el espacio */
  margin: 0;
  /* Elimina el margen para que ocupe todo el espacio */
}

th {
  text-align: start;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.common-style {
  color: white;
  background-color: rgb(47, 201, 55);
  border-radius: 15px;
  padding: 5px;
}


.Si {
  color: white;
  background-color: rgb(17, 127, 230);
  border-radius: 15px;
  padding: 5px;
}

.No {
  color: white;
  background-color: rgba(141, 140, 140, 0.822);
  border-radius: 15px;
  padding: 5px;
}

.actions {
  display: flex;
  justify-content: end;
  cursor: pointer;
}

.actions i {
  margin: 0 10px;
  padding: 10px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.v-sheet {
  max-width: 95%;
  /* Ocupa casi todo el ancho de la pantalla */
  max-height: 90%;
  /* Ocupa casi todo el alto de la pantalla */
  overflow-y: auto;
  /* Permite el desplazamiento vertical */
}
</style>