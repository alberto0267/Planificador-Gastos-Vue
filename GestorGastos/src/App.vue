<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import Filtro from "./components/Filtros.vue";
import Presupuesto from "./components/Presupuesto.vue";
import Gastos from "./components/Gastos.vue";
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import iconoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import Modals from "./components/Modals.vue";
import { idRandom } from "./helpers";
import { fechaBonita } from "./helpers";
const presupuesto = ref(0);
const filtro = ref("");
const gastos = ref([]);

const gasto = reactive({
  nombre: "",
  cantidad: "",
  categoria: "",
  id: null,
  fecha: fechaBonita(),
});
watch(
  gastos,
  () => {
    guardarLocalStore();
  },
  {
    deep: true,
  }
);

const guardarLocalStore = () => {
  localStorage.setItem("gastos", JSON.stringify(gastos.value));
};

watch(presupuesto, () => {
  localStorage.setItem("presupuesto", presupuesto.value);
});

onMounted(() => {
  const presupuestoStorage = localStorage.getItem("presupuesto");
  const gastosStorage = localStorage.getItem("gastos");

  if (presupuestoStorage) {
    presupuesto.value = Number(presupuestoStorage);
  }

  if (gastosStorage) {
    gastos.value = JSON.parse(gastosStorage);
  }
});

const totalGastado = computed(() => {
  return gastos.value.reduce(
    (total, gasto) => total + Number(gasto.cantidad),
    0
  );
});

const disponible = computed(() => {
  return presupuesto.value - totalGastado.value;
});
const gastosFiltrados = computed(() => {
  if (filtro.value) {
    return gastos.value.filter((gasto) => gasto.categoria === filtro.value);
  }
  return gastos.value;
});
watch(totalGastado, (nuevoValor) => {
  console.log("desde watch", nuevoValor);
  // localStorage.setItem("totalGastado", nuevoValor);
});

const modal = reactive({
  mostrar: false,
  animar: false,
});

const mostrarModal = () => {
  (modal.mostrar = true), (modal.animar = true);
};
const ocultarModal = () => {
  (modal.mostrar = false), (modal.animar = false);
  reiniciarForm();
};
const definirPresupuesto = (cantidad) => {
  presupuesto.value = cantidad;
};

const enviarGastos = () => {
  if (gasto.id) {
    console.log("entras en gasto.id");
    const { id } = gasto;

    const i = gastos.value.findIndex((gasto) => gasto.id === id);

    gastos.value[i] = { ...gasto };
  } else {
    gastos.value.push({
      ...gasto,
      id: idRandom(),
    });
  }

  console.log(gastos);

  Object.assign(gasto, {
    nombre: "",
    cantidad: "",
    categoria: "",
    id: null,
    fecha: fechaBonita(),
  });
};

const editarGasto = (id) => {
  console.log("presionando el id", id);

  const editar = gastos.value.find((gasto) => gasto.id === id);

  //
  Object.assign(gasto, editar);

  mostrarModal();
  return;
};

const reiniciarForm = () => {
  Object.assign(gasto, {
    nombre: "",
    cantidad: "",
    categoria: "",
    id: null,
    fecha: fechaBonita(),
  });
};

const eliminarGasto = () => {
  console.log("Eliminando Gasto");
  if (confirm("Eliminar?")) {
    gastos.value = gastos.value.filter((eliminar) => eliminar.id !== gasto.id);
    ocultarModal();
    return;
  }
};

const reiniciarTodo = () => {
  console.log("Reiniciando...");
  if (confirm("De verdad quieres reiniciar ?")) {
    localStorage.removeItem("gastos");
    localStorage.removeItem("presupuesto");
    location.reload();
  }
};
</script>

<template>
  <div class="container">
    <div :class="modal.mostrar ? 'fijar' : ''">
      <header>
        <h1>Control de Gastos</h1>

        <div class="contenedor-header contenedor sombra">
          <Presupuesto
            v-if="presupuesto === 0"
            @definir-presupuesto="definirPresupuesto"
          />
          <ControlPresupuesto
            v-else
            @reiniciar="reiniciarTodo"
            :presupuesto="presupuesto"
            :disponible="disponible"
            :totalGastado="totalGastado"
          />
        </div>
      </header>
      <div>
        <main v-if="presupuesto > 0">
          <Filtro v-model:filtro="filtro" />
          <div class="listado-gastos contenedor">
            <h2>
              {{ gastosFiltrados.length > 0 ? "Gastos" : "No hay Gastos" }}
            </h2>

            <Gastos
              v-for="gasto in gastosFiltrados"
              :key="gasto.id"
              :gasto="gasto"
              @editar-gasto="editarGasto"
            />
          </div>

          <div class="crear-gasto">
            <img
              :src="iconoNuevoGasto"
              alt="nuevoGasto"
              @click="mostrarModal"
            />
          </div>
          <Modals
            :modal="modal"
            :id="gasto.id"
            :disponible="disponible"
            v-model:nombre="gasto.nombre"
            v-model:cantidad="gasto.cantidad"
            v-model:categoria="gasto.categoria"
            @ocultar-modal="ocultarModal"
            @enviar-gasto="enviarGastos"
            @eliminar-gasto="eliminarGasto"
          />
        </main>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #fff;
  --gris-claro: #f5f5f5;
  --gris: #94a3b8;
  --gris-oscuro: #64748b;
  --negro: #000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--gris-claro);
}
h1 {
  font-size: 4rem;
}
h2 {
  font-size: 3rem;
}
header {
  background-color: var(--azul);
  /* height: 20remº; */
}
header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}
.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
  /* background-color: var(--azul); */
}
.contenedor-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}
.sombra {
  box-shadow: 0px 0px 32px 57px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
}

.crear-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}
.crear-gasto img {
  width: 5rem;
  cursor: pointer;
}

.listado-gastos {
  margin-top: 10rem;
}
.listado-gastos h2 {
  font-weight: 900;
  color: var(--gris-oscuro);
}
.fijar {
  overflow: hidden;
  height: 100vh;
}
</style>
