<script setup>
import { formatearCantidad } from "../helpers";
import IconoAhorro from "../assets/img/icono_ahorro.svg";
import IconoCasa from "../assets/img/icono_casa.svg";
import IconoComida from "../assets/img/icono_comida.svg";
import IconoGastos from "../assets/img/icono_gastos.svg";
import IconoOcio from "../assets/img/icono_ocio.svg";
import IconoSalud from "../assets/img/icono_salud.svg";
import IconoSuscripciones from "../assets/img/icono_suscripciones.svg";

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};

const props = defineProps({
  gasto: {
    type: Object,
    required: true,
  },
});
defineEmits(["editar-gasto"]);
</script>

<template>
  <div class="gasto sombra">
    <!-- <p>Gastos...</p> -->

    <div class="contenido">
      <img :src="diccionarioIconos[gasto.categoria]" alt="" class="icono" />

      <div class="detalles">
        <div class="categoria">
          <p>{{ gasto.categoria }}</p>
        </div>
        <div class="nombre">
          <p @click="$emit('editar-gasto', gasto.id)">{{ gasto.nombre }}</p>
        </div>
        <div class="fecha">
          <p>{{ gasto.fecha }}</p>
        </div>
      </div>
    </div>
    <p class="cantidad">{{ formatearCantidad(gasto.cantidad) }}</p>
  </div>
</template>

<style scoped>
.gasto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.contenido {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 2rem;
}
.icono {
  width: 12rem;
}
.detalles p {
  margin: 0 0 1rem 0;
}
.categoria {
  color: var(--gris);
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
}

.nombre {
  color: var(--gris-oscuro);
  font-size: 2.4rem;
  font-weight: 700;
  cursor: pointer;
}
.fecha {
  font-weight: 400;
  color: var(--gris-oscuro);
}
.cantidad {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
  margin-right: 4rem;
}
</style>
