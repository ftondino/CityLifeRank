import Chart from "chart.js/auto";

export async function showChart(cityData) {
  const chart = document.createElement("canvas");
  chart.setAttribute("id", "chart");
  document.querySelector(".chart-container").append(chart);

  const categories = cityData.categories.map((category) => {
    return {
      label: category.name,
      data: [category.score_out_of_10],
      backgroundColor: category.color,
    };
  });

  new Chart(document.getElementById("chart"), {
    type: "bar",
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      data: {
        labels: [""],
        datasets: categories,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
    },
    data: {
      labels: categories.map((category) => category.label),
      datasets: [
        {
          label: `Score`,
          data: categories.map((category) => category.data[0]),
          backgroundColor: categories.map(
            (category) => category.backgroundColor + "33"
          ),
          borderColor: categories.map(
            (category) => category.backgroundColor + "90"
          ),
          borderWidth: 1,
        },
      ],
    },
  });
}
