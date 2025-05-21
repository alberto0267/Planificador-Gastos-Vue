<script setup>
import { ref } from "vue";
import Alerta from "./Alerta.vue";
const error = ref("");

const presupuesto = ref(0);
const emit = defineEmits(["definir-presupuesto"]);
const definirPresupuesto = () => {
  if (presupuesto.value <= 0) {
    console.log("Presupuesto NO valido mi compa");

    error.value = "Presupuesto NO valido ❌";

    setTimeout(() => {
      error.value = "";
    }, 500);
  }
  emit("definir-presupuesto", presupuesto.value);
};
</script>

<template>
  <form action="" class="presupuesto" @submit.prevent="definirPresupuesto()">
    <Alerta v-if="error">
      {{ error }}
      <!-- <h2>hola</h2> -->
    </Alerta>

    <div class="campo">
      <label for="nuevo-presupuesto">Definir Presupuesto</label>
      <input
        type="number"
        id="nuevo-presupuesto"
        class="nuevo-presupuesto"
        placeholder="Add presupuesto"
        min="0"
        v-model="presupuesto"
      />
    </div>
    <input type="submit" value="Definir Presupuesto" />
  </form>
</template>

<style scoped>
.presupuesto {
  width: 100%;
}
.campo {
  display: grid;
  gap: 2rem;
}
.presupuesto input[type="number"] {
  background-color: var(--gris-claro);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
  text-align: center;
}
.presupuesto input[type="submit"] {
  background-color: var(--azul);
  border: none;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
  color: var(--blanco);
  font-weight: 900;
  width: 100%;
  /* transition: background-color; */
}
.presupuesto label {
  font-size: 2.8rem;
  text-align: center;
  color: var(--azul);
}
.presupuesto input[type="submit"]:hover {
  background-color: #1048a4;
  cursor: pointer;
}
</style>
