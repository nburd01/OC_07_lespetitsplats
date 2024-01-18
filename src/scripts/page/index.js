import { CardsApi } from "../api/api.js";
import { Card } from "../class/cards.js";
import { CardTemplate } from "../templates/cardList.js";

class App {
  constructor() {
    // Get data
    this.cardsApi = new CardsApi("/src/data/recipes.json");

    // Get element
    this.cardsSection = document.querySelector(".cards-section");
  }

  async main() {
    const cardsApiData = await this.cardsApi.getCards();
    cardsApiData
      .map((card) => new Card(card))
      .forEach((card) => {
        const template = new CardTemplate(card);
        this.cardsSection.appendChild(template.createCard(card));
      });
  }
}
const initApp = async () => {
  const app = new App();
  app.main();
};
initApp();
