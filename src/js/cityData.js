import axios from "axios";
const _ = require("lodash");

export class City {
  async cityInfo(inputValue) {
    const cityInfoURL = `https://api.teleport.org/api/urban_areas/slug:${inputValue}/`;
    return axios.get(cityInfoURL);
  }
  async imagesInfo(inputValue) {
    const imagesURL = `https://api.teleport.org/api/urban_areas/slug:${inputValue}/images/`;
    return axios.get(imagesURL);
  }
  async scoresInfo(inputValue) {
    const scoresURL = `https://api.teleport.org/api/urban_areas/slug:${inputValue}/scores`;
    return axios.get(scoresURL);
  }

  async getInfo() {
    try {
      const searchInput = document.querySelector(".search-bar__input").value;
      const inputValue = searchInput.toLowerCase().replace(/ /g, "-");

      if (inputValue === "") {
        alert("Please enter a valid city name.");
        return;
      }

      const city = await this.cityInfo(inputValue);
      const images = await this.imagesInfo(inputValue);
      const scores = await this.scoresInfo(inputValue);

      if (!city.data || !images.data || !scores.data) {
        throw new Error("Something went wrong, please try reloading the page");
      }

      return {
        cityName: _.get(
          city,
          "data.full_name",
          "Invalid city name. Please enter a valid city name."
        ),
        mayor: _.get(city, "data.mayor", "Error loading the information"),
        imgMobile: _.get(
          images,
          "data.photos[0].image.mobile",
          "Error loading the information"
        ),
        imgWeb: _.get(
          images,
          "data.photos[0].image.web",
          "Error loading the information"
        ),
        summary: _.get(scores, "data.summary", "Error loading the information"),
        categories: _.get(
          scores,
          "data.categories",
          "Error loading the information"
        ),
      };
    } catch (error) {
      if (error instanceof TypeError) {
        alert(error);
      } else {
        alert(`${error.response.data.message}`);
      }
    }
  }
}
