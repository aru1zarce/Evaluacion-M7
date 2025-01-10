<template>
    <v-container>
      <h1 class="titulo">Lista de cursos</h1>
      <br>
    <v-row>
      <v-col v-for="curso in cursos" :key="curso.id" cols="12" sm="8" md="6" lg="4">
        <v-card width="400">
          <v-img height="200px" :src="curso.img" contain>
          </v-img>

          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
              {{curso.nombre}}
              <br>
              <span>Información:</span>
            </div>

            <v-timeline align-top dense>
              <v-timeline-item color="purple" small>
                <div>
                  <div class="font-weight-normal">
                    <span>Costo: </span><strong>${{ curso.costo}}</strong>
                  </div>
                  <div> <span>Duración: </span>{{ curso.duracion }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <div>
                  <div class="font-weight-normal">
                   <span>Cupos: </span> <strong>{{ curso.cupos }}</strong>
                  </div>
                  <span>Completado: {{ curso.completado ? 'Sí' : 'No' }}</span>
                </div>
              </v-timeline-item>
              <v-timeline-item color="purple" small>
                <div>
                  <div class="font-weight-normal">
                    <span>Fecha de Registro:</span>
                  </div>
                  <div>{{ curso.fecha_registro}}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <div>
                  <div class="font-weight-normal">
                    <span>Descripción:</span>
                  </div>
                  <div>{{ curso.descripcion}}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HelloWorld",

  computed: {
    ...mapState(["cursos"]),
  },
};
</script>

<style scoped>
/* Container and Row Styling */
.v-container {
  padding: 24px;
  background-color: #f9f9f9;
}

.v-row {
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* Title Styling */
.titulo {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #4a4a4a;
  margin-bottom: 16px;
 }

/* Card Styling */
.v-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  transition: transform 0.2s, box-shadow 0.2s;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

/* Image Styling */
.v-img {
  border-bottom: 2px solid #e0e0e0;
}

/* Card Text Styling */
.v-card-text {
  padding: 16px;
  font-family: 'Roboto', sans-serif;
  color: #333333;
}

/* Font and Text Styling */
.font-weight-bold {
  font-size: 18px;
  color: #2c3e50;
}

.font-weight-normal {
  font-size: 14px;
  color: #616161;
}

.ml-8 {
  margin-left: 8px;
}

.mb-2 {
  margin-bottom: 8px;
}

/* Timeline Styling */
.v-timeline {
  margin-top: 16px;
}

.v-timeline-item {
  border-radius: 4px;
  background-color: #f7f7f7;
  padding: 8px 12px;
  margin-bottom: 12px;
}

.v-timeline-item span {
  font-size: 14px;
  color: #757575;
}

.v-timeline-item strong {
  font-size: 14px;
  color: #424242;
}

/* Colors for Timeline Items */
.v-timeline-item[color="purple"] {
  border-left: 4px solid #8e44ad;
}

.v-timeline-item[color="green"] {
  border-left: 4px solid #27ae60;
}

/* Responsiveness */
@media (max-width: 768px) {
  .titulo {
    font-size: 24px;
  }

  .v-card {
    width: 100%;
  }
}

</style>
