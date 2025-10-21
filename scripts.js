// ===============================
// Orbital Insights Ltd - scripts.js
// ===============================

// ----- Live Mission Clock -----
function updateClock() {
  const clock = document.getElementById("clock");
  if (clock) {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }
}
setInterval(updateClock, 1000);
updateClock();

// ----- Highlight Active Navigation -----
document.addEventListener("DOMContentLoaded", () => {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(a => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });
});

// ----- Contact Form (simple feedback alert) -----
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value || "there";
    alert(`✅ Thank you, ${name}! Your message has been received successfully.`);
    form.reset();
  });
});

// ----- Live Telemetry Chart -----
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("telemetryChart");
  if (!ctx || typeof Chart === "undefined") return;

  const data = {
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        borderColor: "#004080",
        backgroundColor: "rgba(0,64,128,0.12)",
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 3
      },
      {
        label: "Altitude (km)",
        data: [],
        borderColor: "#2a7bdc",
        backgroundColor: "rgba(42,123,220,0.10)",
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        yAxisID: 'y2'
      }
    ]
  };

  const chart = new Chart(ctx, {
    type: "line",
    data,
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#004080" } },
        title: { display: true, text: "Live Satellite Telemetry Feed", color: "#004080" }
      },
      scales: {
        x: {
          ticks: { color: "#004080" },
          title: { display: true, text: "Time", color: "#004080" }
        },
        y: {
          ticks: { color: "#004080" },
          title: { display: true, text: "Temperature (°C)", color: "#004080" }
        },
        y2: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: "#004080" },
          title: { display: true, text: "Altitude (km)", color: "#004080" }
        }
      }
    }
  });

  function pushPoint() {
    const now = new Date().toLocaleTimeString();
    const temp = +(15 + Math.random() * 10).toFixed(2); // 15–25°C
    const alt = +(500 + Math.random() * 12).toFixed(2); // 500–512 km

    data.labels.push(now);
    data.datasets[0].data.push(temp);
    data.datasets[1].data.push(alt);

    if (data.labels.length > 12) {
      data.labels.shift();
      data.datasets.forEach(d => d.data.shift());
    }
    chart.update();
  }

  // Start the live graph updates
  setInterval(pushPoint, 3000);
  pushPoint();
});
