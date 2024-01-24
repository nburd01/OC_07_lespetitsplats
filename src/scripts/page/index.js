import { CardsApi } from "../api/api.js";
import { Card } from "../class/cards.js";
import { CardTemplate } from "../templates/cardList.js";
import { SortTemplate } from "../templates/filterList.js";

class App {
  constructor() {
    this.cardsApi = new CardsApi("/src/data/recipes.json");
    this.cardsSection = document.querySelector(".cards");
    this.searchInput = document.querySelector(".mySearchInput");
    this.faMark = document.querySelector(".fa-solid");
    this.dropBtn = document.querySelector(".dropbtn");
    this.ingredientsDropDown = document.querySelector("ingredientsDropdown");
    this.appliancedDropDown = document.querySelector("appliancesDropdown");
    this.myDropdownInput = document.querySelector("#myDropdownInput");
    this.mySearchInput = document.querySelector("#mySearchInput");
  }
  //
  //imperative programming
  //
  async main() {
    const sortTemplate = new SortTemplate();

    this.faMark.style.display = "none";
    const cardsSection = document.querySelector(".cards");
    //Fetch data
    const cardsApiData = await this.cardsApi.getCards();
    // tri by 'name'
    const cardsDataByIngredient = [...cardsApiData].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    // tri by 'appliance'
    const cardsDataByAppliance = [...cardsApiData].sort((a, b) => {
      if (a.appliance < b.appliance) {
        return -1;
      }
      if (a.appliance > b.appliance) {
        return 1;
      }
      return 0;
    });
    // tri by 'appliance'
    const cardsDataByUstensil = [...cardsApiData].sort((a, b) => {
      if (a.ustensil < b.ustensil) {
        return -1;
      }
      if (a.ustensil > b.ustensil) {
        return 1;
      }
      return 0;
    });
    // tri by 'everything'
    const cardsDataByEverything = [...cardsApiData].sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

    // tri by 'id'
    const cardsDataById = [...cardsApiData].sort((a, b) => a.id - b.id);

    //cards function
    cardsDataById
      .map((card) => new Card(card))
      .forEach((card) => {
        const templateCards = new CardTemplate(card);
        cardsSection.appendChild(templateCards.createCard());
      });

    //sort ingredients, appliances and ustensils for searchbar

    const arrayOfIngredients = [];
    const arrayOfAppliances = [];
    const arrayOfUstensils = [];

    //sort appliance function
    cardsDataByAppliance
      .map((card) => new Card(card))
      .forEach((card) => {
        const appliance = card._appliance || [];
        const applianceNameFirst = appliance.charAt(0);
        const applianceNameRest = appliance.slice(1);
        const applianceName = applianceNameFirst + applianceNameRest;
        let pluralapplianceName = applianceName + "s";
        if (
          !arrayOfAppliances.includes(applianceName) &&
          !arrayOfAppliances.includes(pluralapplianceName)
        ) {
          arrayOfAppliances.push(applianceName);
        }
      });
    arrayOfAppliances.forEach((appliance) => {
      sortTemplate.appendAppliancesName(appliance);
    });
    sortTemplate.updateDropdownAppliances();

    //sort ingredient function
    cardsDataByIngredient
      .map((card) => new Card(card))
      .forEach((card) => {
        const ingredients = card._ingredients || [];
        ingredients.forEach((ingredient) => {
          const ingredientNameFirst = ingredient.ingredient.charAt(0);
          const ingredientNameRest = ingredient.ingredient.slice(1);
          const ingredientName = ingredientNameFirst + ingredientNameRest;
          let pluralIngredientName = ingredientName + "s";
          if (
            !arrayOfIngredients.includes(ingredientName) &&
            !arrayOfIngredients.includes(pluralIngredientName)
          ) {
            arrayOfIngredients.push(ingredientName);
          }
        });
      });
    arrayOfIngredients.forEach((ingredient) => {
      sortTemplate.appendIngredientsName(ingredient);
    });
    sortTemplate.updateDropdownIngredients();

    //sort ustensil function
    cardsDataByUstensil
      .map((card) => new Card(card))
      .forEach((card) => {
        const ustensils = card._ustensils || [];
        ustensils.forEach((ustensil) => {
          const ustensilNameFirst = ustensil.charAt(0);
          const ustensilNameRest = ustensil.slice(1);
          const ustensilName = ustensilNameFirst + ustensilNameRest;
          let pluralustensilName = ustensilName + "s";
          if (
            !arrayOfUstensils.includes(ustensilName) &&
            !arrayOfUstensils.includes(pluralustensilName)
          ) {
            arrayOfUstensils.push(ustensilName);
          }
        });
      });
    arrayOfUstensils.forEach((ustensil) => {
      sortTemplate.appendUstensilsName(ustensil);
    });
    sortTemplate.updateDropdownUstensils();

    //sort everything function
    const arrayOfEverything = [
      ...arrayOfIngredients,
      ...arrayOfAppliances,
      ...arrayOfUstensils,
    ];
    console.log(arrayOfEverything);

    //
    //functional programming
    //
    this.searchInput.addEventListener("input", () => {
      this.handleSearchBarInputChange();
    });

    this.faMark.addEventListener("click", () => {
      this.handleClearInput();
    });

    this.dropBtn.addEventListener("click", () => {
      document.getElementById("ingredientsDropdown").classList.toggle("show");
    });

    this.myDropdownInput.addEventListener("input", () => {
      this.filterDropdown();
    });

    this.mySearchInput.addEventListener("input", () => {
      this.filterSearchbar();
    });
  }

  handleSearchBarInputChange() {
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

  filterDropdown() {
    let divV;
    let aA;
    let txtValue;
    var input, filter, ul, li, a, i;
    input = document.getElementById("myDropdownInput");
    filter = input.value.toUpperCase();
    divV = document.getElementById("ingredientsDropdown");
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

  filterSearchbar() {
    let input = this.searchInput.value;
    if (input !== "") {
      console.log(this.searchInput.value);
    }
  }
}

const initApp = async () => {
  const app = new App();
  app.main();
};

initApp();
