import { CardsApi } from "../api/api.js";
import { Card } from "../class/cards.js";
import { CardTemplate } from "../templates/cardList.js";

class App {
  constructor() {
    // Get data
    this.cardsApi = new CardsApi("/src/data/recipes.json");

    // Get element
    this.cardsSection = document.querySelector(".cards");
  }

  async main() {
    const cardsApiData = await this.cardsApi.getCards();
    const cardsSection = document.querySelector(".cards");

    cardsApiData
      .map((card) => new Card(card))
      .forEach((card) => {
        const template = new CardTemplate(card);
        cardsSection.appendChild(template.createCard());
      });
  }

  // input = document.querySelector("input");
  // if (input value != null) {

  // }
}
const initApp = async () => {
  const app = new App();
  app.main();
};
initApp();
