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
    this.ingredientsDropBtn = document.querySelector(".ingredientsDropBtn");
    this.ustensilsDropBtn = document.querySelector(".ustensilsDropBtn");
    this.appliancesDropBtn = document.querySelector(".appliancesDropBtn");
    this.myDropdownInputIngredients = document.querySelector(
      "#myDropdownInputIngredients"
    );
    this.myDropdownInputAppliances = document.querySelector(
      "#myDropdownInputAppliances"
    );
    this.myDropdownInputUstensils = document.querySelector(
      "#myDropdownInputUstensils"
    );
    this.mySearchInput = document.querySelector("#mySearchInput");
  }

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
      if (a.ustensils < b.ustensils) {
        return -1;
      }
      if (a.ustensils > b.ustensils) {
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

    //this creates cards
    cardsDataById
      .map((card) => new Card(card))
      .forEach((card) => {
        const templateCards = new CardTemplate(card);
        cardsSection.appendChild(templateCards.createCard());
      });

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
          const ustensilNameFirst = ustensil.charAt(0).toUpperCase();
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
    // console.log(arrayOfEverything);

    //
    //functional programming
    //
    this.searchInput.addEventListener("input", () => {
      this.handleSearchBarInputChange();
    });

    this.faMark.addEventListener("click", () => {
      this.handleClearInput();
    });

    this.ingredientsDropBtn.addEventListener("click", () => {
      document.getElementById("ingredientsDropdown").classList.toggle("show");
    });
    this.ustensilsDropBtn.addEventListener("click", () => {
      document.getElementById("ustensilsDropdown").classList.toggle("show");
    });
    this.appliancesDropBtn.addEventListener("click", () => {
      document.getElementById("appliancesDropdown").classList.toggle("show");
    });
    //
    document.addEventListener("click", function (event) {
      const appliancesDropdown = document.getElementById("appliancesDropdown");
      const elem = document.getElementById("dropDownAppliances");

      if (appliancesDropdown.classList.contains("show")) {
        const outsideClick = !elem.contains(event.target);

        if (outsideClick) {
          appliancesDropdown.classList.remove("show");
        } else {
          appliancesDropdown.classList.add("show");
        }
      }
    });
    document.addEventListener("click", function (event) {
      const appliancesDropdown = document.getElementById("ustensilsDropdown");
      const elem = document.getElementById("dropDownUstensils");

      if (appliancesDropdown.classList.contains("show")) {
        const outsideClick = !elem.contains(event.target);

        if (outsideClick) {
          appliancesDropdown.classList.remove("show");
        } else {
          appliancesDropdown.classList.add("show");
        }
      }
    });
    document.addEventListener("click", function (event) {
      const appliancesDropdown = document.getElementById("ingredientsDropdown");
      const elem = document.getElementById("dropDownIngredients");

      if (appliancesDropdown.classList.contains("show")) {
        const outsideClick = !elem.contains(event.target);

        if (outsideClick) {
          appliancesDropdown.classList.remove("show");
        } else {
          appliancesDropdown.classList.add("show");
        }
      }
    });

    this.myDropdownInputIngredients.addEventListener("input", () => {
      this.filterDropdownInputIngredients();
    });
    this.myDropdownInputAppliances.addEventListener("input", () => {
      this.filterDropdownInputAppliances();
    });
    this.myDropdownInputUstensils.addEventListener("input", () => {
      this.filterDropdownInputUstensils();
    });

    this.mySearchInput.addEventListener("input", () => {
      this.filterSearchbarInput(arrayOfEverything, cardsDataById);
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

  filterDropdownInputIngredients() {
    let ingredientsDropdownElement;
    let aElement;
    let txtValue;
    var input, filterDropdown, i;
    input = document.getElementById("myDropdownInputIngredients");
    filterDropdown = input.value.toUpperCase();
    //
    ingredientsDropdownElement = document.getElementById("ingredientsDropdown");
    console.log(ingredientsDropdownElement);
    aElement = ingredientsDropdownElement.getElementsByTagName("a");
    for (i = 0; i < aElement.length; i++) {
      txtValue = aElement[i].textContent || aElement[i].innerText;
      if (txtValue.toUpperCase().indexOf(filterDropdown) > -1) {
        aElement[i].style.display = "";
      } else {
        aElement[i].style.display = "none";
      }
    }
  }
  filterDropdownInputAppliances() {
    let appliancesDropdownElement;
    let aElement;
    let txtValue;
    var input, filterDropdown, i;
    input = document.getElementById("myDropdownInputAppliances");
    filterDropdown = input.value.toUpperCase();
    //
    appliancesDropdownElement = document.getElementById("appliancesDropdown");
    console.log(appliancesDropdownElement);
    aElement = appliancesDropdownElement.getElementsByTagName("a");
    for (i = 0; i < aElement.length; i++) {
      txtValue = aElement[i].textContent || aElement[i].innerText;
      if (txtValue.toUpperCase().indexOf(filterDropdown) > -1) {
        aElement[i].style.display = "";
      } else {
        aElement[i].style.display = "none";
      }
    }
  }
  filterDropdownInputUstensils() {
    let ustensilsDropdownElement;
    let aElement;
    let txtValue;
    var input, filterDropdown, i;
    input = document.getElementById("myDropdownInputUstensils");
    filterDropdown = input.value.toUpperCase();
    //
    ustensilsDropdownElement = document.getElementById("ustensilsDropdown");
    console.log(ustensilsDropdownElement);
    aElement = ustensilsDropdownElement.getElementsByTagName("a");
    for (i = 0; i < aElement.length; i++) {
      txtValue = aElement[i].textContent || aElement[i].innerText;
      if (txtValue.toUpperCase().indexOf(filterDropdown) > -1) {
        aElement[i].style.display = "";
      } else {
        aElement[i].style.display = "none";
      }
    }
  }

  filterSearchbarInput(arrayOfEverything, cardsApiData) {
    this.searchInput.addEventListener("input", () => {
      let input = this.searchInput.value;
      let filterSearchBar = input.toUpperCase();

      // Declare matchingElements here
      let matchingElements;

      matchingElements = arrayOfEverything.filter((element) => {
        return element.toUpperCase().includes(filterSearchBar);
      });

      this.updateCardsOnSearchBarInput(matchingElements, cardsApiData);
    });
  }

  //todo : compare arrays and see why everyhting is not appearing on filter

  updateCardsOnSearchBarInput(matchingElements, cardsApiData) {
    // Mapping over each element in matchingElements and converting to uppercase
    let matchingElementsUppercase = matchingElements.map((element) =>
      element.toUpperCase()
    );

    // Filtering cardsApiData to keep only objects that contain matching elements
    let newMatchingElements = cardsApiData.filter((card) => {
      // Convert all properties of the card object to uppercase
      let cardUppercase = Object.fromEntries(
        Object.entries(card).map(([key, value]) => [
          key,
          String(value).toUpperCase(),
        ])
      );

      // Check if any property of the card object contains any matching element
      return matchingElementsUppercase.some((matchingElement) => {
        return Object.values(cardUppercase).some((property) =>
          property.includes(matchingElement)
        );
      });
    });

    // Console.log cardsDataById that match
    console.log(newMatchingElements);

    // Update your cardsSection with the filtered data
    this.updateCards(newMatchingElements);
  }

  // Add a method to update the cards in the UI
  updateCards(cardsData) {
    const cardsSection = document.querySelector(".cards");
    cardsSection.innerHTML = ""; // Clear existing cards

    cardsData
      .map((card) => new Card(card))
      .forEach((card) => {
        const templateCards = new CardTemplate(card);
        cardsSection.appendChild(templateCards.createCard());
      });
  }
}

const initApp = async () => {
  const app = new App();
  app.main();
};

initApp();
