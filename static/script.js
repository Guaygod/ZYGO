let saldo = 5000;

function actualizarSaldo() {
  document.getElementById("saldo").textContent = `$${saldo}`;
}

function recargarSaldo() {
  saldo += 2000;
  actualizarSaldo();
  alert("Saldo recargado: $2000");
}

function comprar(tipo) {
  const costo = 800;
  if (saldo >= costo) {
    saldo -= costo;
    actualizarSaldo();
    alert(`Pasaje de ${tipo} comprado por $${costo}`);
  } else {
    alert("Saldo insuficiente");
  }
}

function mostrarSeccion(id) {
  const secciones = document.querySelectorAll(".seccion");
  secciones.forEach(sec => sec.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
}
function inicializarMapa() {
  const mapa = new google.maps.Map(document.getElementById("mapaZYGO"), {
    center: { lat: -33.4489, lng: -70.6693 }, // Santiago
    zoom: 12,
  });

  const trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(mapa);
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarSaldo();

  const container = document.getElementById("container");

  // Swipe táctil
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe(touchStartX, touchEndX);
  });

  // Drag con mouse
  let mouseDown = false;
  let mouseStartX = 0;
  let mouseEndX = 0;

  document.addEventListener("mousedown", e => {
    mouseDown = true;
    mouseStartX = e.screenX;
  });

  document.addEventListener("mouseup", e => {
    if (!mouseDown) return;
    mouseDown = false;
    mouseEndX = e.screenX;
    handleSwipe(mouseStartX, mouseEndX);
  });

  function handleSwipe(startX, endX) {
    const swipeDistance = endX - startX;

    if (swipeDistance > 100) {
      container.classList.remove("sidebar-hidden"); // abrir
    } else if (swipeDistance < -100) {
      container.classList.add("sidebar-hidden"); // cerrar
    }
  }
});
