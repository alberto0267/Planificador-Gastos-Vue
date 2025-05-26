<script setup>
// import imagen from "../assets/img/grafico.jpg";
import { computed } from "vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";

//Se creo esto para hacer una const de moneda, asi reutilizarla.
import { formatearCantidad } from "../helpers";

const emit = defineEmits(["reiniciar"]);

const props = defineProps({
  presupuesto: {
    type: Number,
    required: true,
  },
  disponible: {
    type: Number,
    required: true,
  },
  totalGastado: {
    type: Number,
    required: true,
  },
});
const porcentaje = computed(() => {
  return parseInt(
    ((props.presupuesto - props.disponible) / props.presupuesto) * 100
  );
});
</script>

<template>
  <div class="dos-columnas">
    <div class="contenedor-graficos">
      <!-- <img :src="imagen" alt="" /> -->
      <p class="porcentaje">{{ porcentaje }} %</p>
      <CircleProgress
        :percent="porcentaje"
        :size="250"
        :border-width="30"
        :border-bg-width="30"
      />
    </div>
    <div class="contenedor-presupuesto">
      <p>
        <span>Presupuesto: </span>
        {{ formatearCantidad(presupuesto) }}
      </p>
      <p>
        <span>Disponible: </span>
        {{ formatearCantidad(disponible) }}
      </p>
      <p>
        <span>Gastado: </span>
        {{ formatearCantidad(totalGastado) }}
      </p>
      <button class="reset-app" @click="$emit('reiniciar')">Resetear</button>
    </div>
  </div>
</template>

<style scoped>
.contenedor-graficos {
  position: relative;
}
.porcentaje {
  position: absolute;
  margin: auto;
  top: calc(50% - 5rem);
  left: 0;
  right: 0;
  text-align: center;
  color: var(--gris-oscuro);
}
.dos-columnas {
  display: flex;
  flex-direction: column;
}
@media (min-width: 768px) {
  .dos-columnas {
    display: flex;
    flex-direction: row;
  }
  .dos-columnas :first-child {
    margin-bottom: 2.5rem;
  }
  .reset-app {
    background-color: #db2777;
    border: none;
    padding: 1rem;
    width: 100%;
    color: var(--blanco);
  }
  .reset-app:hover {
    cursor: pointer;
    background-color: #c11d67;
  }
  .contenedor-presupuesto {
    width: 100%;
  }
  .dos-columnas span {
    color: var(--azul);
    font-size: 3rem;
    font-weight: bold;
    padding: 1rem;
  }
  .dos-columnas p {
    /* color: var(--azul); */
    font-size: 3rem;
    font-weight: bold;
    padding: 1rem;
    /* border-bottom: 1px solid black; */
  }
}
</style>
