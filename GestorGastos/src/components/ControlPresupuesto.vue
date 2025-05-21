<script setup>
import imagen from "../assets/img/grafico.jpg";

//Se creo esto para hacer una const de moneda, asi reutilizarla.
import { formatearCantidad } from "../helpers";

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
</script>

<template>
  <div class="dos-columnas">
    <div class="contenedor-graficos">
      <img :src="imagen" alt="" />
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
      <button class="reset-app">Resetear</button>
    </div>
  </div>
</template>

<style scoped>
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
    border-bottom: 1px solid black;
  }
}
</style>
