import { CardsApi } from "../api/api.js";
import { Card } from "../class/cards.js";
import { CardTemplate } from "../templates/cardList.js";

class App {
  constructor() {
    this.cardsApi = new CardsApi("/src/data/recipes.json");
    this.cardsSection = document.querySelector(".cards");
    this.searchInput = document.querySelector(".search-input");
    this.faMark = document.querySelector(".fa-solid");
    this.dropBtn = document.querySelector(".dropbtn");
    this.dropDown = document.querySelector("myDropdown");
    this.myInput = document.querySelector("#myInput");
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

    this.dropBtn.addEventListener("click", () => {
      document.getElementById("myDropdown").classList.toggle("show");
    });

    this.myInput.addEventListener("input", () => {
      this.filterFunction();
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

  filterFunction() {
    let divV;
    let aA;
    let txtValue;
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    divV = document.getElementById("myDropdown");
    aA = divV.getElementsByTagName("a");
    for (i = 0; i < aA.length; i++) {
      txtValue = aA[i].textContent || aA[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        aA[i].style.display = "";
      } else {
        aA[i].style.display = "none";
      }
    }
  }
}

const initApp = async () => {
  const app = new App();
  app.main();
};

initApp();
