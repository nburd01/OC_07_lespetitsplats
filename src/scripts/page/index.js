import { CardsApi } from "../api/api.js";
import { Card } from "../class/cards.js";
import { CardTemplate } from "../templates/cardList.js";

class App {
  constructor() {
    this.cardsApi = new CardsApi("/src/data/recipes.json");
    this.cardsSection = document.querySelector(".cards");
    this.searchInput = document.querySelector(".search-input");
    this.faMark = document.querySelector(".fa-solid");
  }

  async main() {
    this.faMark.style.display = "none";
    const cardsApiData = await this.cardsApi.getCards();
    const cardsSection = document.querySelector(".cards");

    cardsApiData
      .map((card) => new Card(card))
      .forEach((card) => {
        const template = new CardTemplate(card);
        cardsSection.appendChild(template.createCard());
      });

    this.searchInput.addEventListener("input", () => {
      this.handleSearchInputChange();
    });

    this.faMark.addEventListener("click", () => {
      this.handleClearInput();
    });
  }

  handleSearchInputChange() {
    if (this.searchInput.value !== "") {
      this.faMark.style.display = "block";
    } else {
      this.faMark.style.display = "none";
      this.searchInput.placeholder =
        "Rechercher une recette, un ingrédient, ...";
    }
  }

  handleClearInput() {
    this.searchInput.value = "";
    this.faMark.style.display = "none";
    this.searchInput.placeholder = "Rechercher une recette, un ingrédient, ...";
  }
}

const initApp = async () => {
  const app = new App();
  app.main();
};

initApp();
