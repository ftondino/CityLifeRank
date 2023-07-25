import "../css/style.css";
import { City } from "./cityData";
import { showChart } from "./chart";

const button = document.querySelector(".search-bar__btn");
const input = document.querySelector(".search-bar__input");

/* Function to render the HTML */
const renderCity = function (element, className, content, where) {
  const createElement = document.createElement(element);
  createElement.classList.add(className);
  createElement.innerHTML = content;
  where.append(createElement);
};

async function showCity() {
  const city = new City();
  try {
    const cityData = await city.getInfo();
    if (!cityData) {
      throw new Error("error");
    }

    /* The HTML created with the data */
    renderCity("section", "section-card", "", document.body);
    const sectionCard = document.querySelector(".section-card");
    renderCity("div", "card-container", "", sectionCard);
    const container = document.querySelector(".card-container");
    renderCity("a", "card-container__close", "&times;", container);
    const closeCard = document.querySelector(".card-container__close");
    closeCard.setAttribute("href", "#container");
    renderCity("img", "card-container__img", "", container);
    document
      .querySelector(".card-container__img")
      .setAttribute("src", cityData.imgWeb);
    renderCity("h2", "card-container__heading", cityData.cityName, container);
    renderCity("div", "card-container__text", cityData.summary, container);
    renderCity(
      "span",
      "mayor",
      `The mayor's name is ${cityData.mayor}.`,
      document.querySelector(".card-container__text")
    );
    renderCity("div", "chart-container", "", container);

    const imgMobile = cityData.imgMobile;
    if (window.innerWidth <= 934) {
      document.querySelector(".card-container__img").src = imgMobile;
    }

    showChart(cityData);

    /* Function to close the card */
    const closeup = function () {
      document.body.removeChild(sectionCard);
    };
    closeCard.addEventListener("click", closeup);
  } catch (err) {
    console.log(err);
  }
}

button.addEventListener("click", showCity);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    showCity();
  }
});
