<script setup>
import { ref } from "vue";
import CerrarModal from "../assets/img/cerrar.svg";
import Alerta from "./Alerta.vue";
//Se tiene que poner update para actualizar los valores de form
const emit = defineEmits([
  "ocultar-modal",
  "enviar-gasto",
  "update:nombre",
  "update:cantidad",
  "update:categoria",
  "eliminar-gasto",
]);

const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  disponible: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    default: null,
    required: false,
  },
});
// console.log(typeof + "cantidad");
const disponibleOld = props.cantidad;
console.log("la cantidad old  es: ", disponibleOld);
// console.log("el disponible actual es: ", props.disponible);
console.log("id funcion", props.id);
const error = ref("");
const agregarGastos = () => {
  console.log("agregando");

  //Destructurar
  const { nombre, cantidad, categoria, disponible, id } = props;

  //Validar que no hay campos vacios
  if ([nombre, cantidad, categoria].includes("")) {
    // console.log("estan vacios.");
    error.value = "Todos los campos son obligatorios ❌";
    setTimeout(() => {
      error.value = "";
    }, 1000);
    return;
  }

  //Validar la cantidad
  if (cantidad <= 0) {
    error.value = "Venga ya, cantidad errada❌";
    setTimeout(() => {
      error.value = "";
    }, 1000);
    return;
  }

  //Validar que gasto no sea mayor que disponible

  if (id) {
    console.log("el disponible actual en id es: ", props.disponible);

    console.log("Entra en Id");

    // if(cantidad + disponible>)
  } else {
    if (cantidad > disponible) {
      error.value =
        "No puedes gastar mas de lo que tienes disponible = " + disponible;
      setTimeout(() => {
        error.value = "";
      }, 1000);
      return;
    }
  }

  console.log("Enviando...");

  emit("enviar-gasto");

  setTimeout(() => {
    emit("ocultar-modal");
  }, 1000);
};
</script>

<template>
  <div class="modal" v-if="modal.mostrar">
    <div class="cerrar-modal">
      <img :src="CerrarModal" alt="" @click="$emit('ocultar-modal')" />
    </div>
    <div class="contenedor">
      <form action="" @submit.prevent="agregarGastos">
        <legend>{{ id ? "Editando Gasto" : "Añadir Gasto" }}</legend>
        <Alerta v-if="error">
          {{ error }}
        </Alerta>
        <div class="campo">
          <label for="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el Nombre del Gasto"
            :value="nombre"
            @input="$emit('update:nombre', $event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="Cantidad">Cantidad</label>
          <input
            type="number"
            id="Cantidad"
            placeholder="Añade la Cantidad"
            :value="cantidad"
            @input="$emit('update:cantidad', Number($event.target.value))"
          />
        </div>
        <div class="campo">
          <label for="categoria">Categoria</label>
          <select
            name=""
            id="categoria"
            :value="categoria"
            @input="$emit('update:categoria', $event.target.value)"
          >
            <option value="" disabled selected>-- Selecciona --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" :value="[id ? 'Editar Gasto' : 'Añadir Gasto']" />
      </form>
      <button
        type="button"
        class="btn-eliminar"
        v-if="props.id"
        @click="$emit('eliminar-gasto')"
      >
        Eliminar Gasto
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 /0.9);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.cerrar-modal {
  position: absolute;
  right: 3rem;
  top: 3rem;
}
.cerrar-modal img {
  width: 3rem;
  cursor: pointer;
}
.contenedor {
  display: flex;
  flex-direction: column;
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding-top: 15rem;
}

legend {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
}

.campo label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #fff;
}

.campo input,
.campo select {
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  border: none;
  font-size: 1.6rem;
}

input[type="submit"] {
  background-color: #3b82f6;
  color: white;
  padding: 1.5rem;
  border: none;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

input[type="submit"]:hover {
  background-color: #2563eb;
}
.btn-eliminar {
  margin-top: 8rem;
  background-color: rgba(190, 17, 17, 0.846);
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-eliminar:hover {
  background-color: red;
}
</style>
