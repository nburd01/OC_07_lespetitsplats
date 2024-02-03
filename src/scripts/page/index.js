import { CardsApi } from "../api/api.js";
import { Card } from "../class/cards.js";
import { CardTemplate } from "../templates/cardList.js";
import { SortTemplate } from "../templates/filterList.js";

export class App {
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
    this.sortTemplate = new SortTemplate();
  }

  async main() {
    const sortTemplate = this.sortTemplate;

    this.faMark.style.display = "none";
    const cardsSection = document.querySelector(".cards");

    // ------------------------
    // Fetching
    // ------------------------

    //Fetch data
    const fetchedDataFromApi = await this.cardsApi.getCards();

    // tri a-z by 'name'
    const sortCardsDataByIngredient = [...fetchedDataFromApi].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    const arrayOfIngredientNames = sortCardsDataByIngredient.flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient)
    );
    // tri a-z by 'appliance'
    const sortCardsDataByAppliance = [...fetchedDataFromApi].sort((a, b) => {
      if (a.appliance < b.appliance) {
        return -1;
      }
      if (a.appliance > b.appliance) {
        return 1;
      }
      return 0;
    });

    const arrayOfApplianceNames = sortCardsDataByAppliance.map(
      (obj) => obj.appliance
    );

    const sortCardsDataByUstensil = [...fetchedDataFromApi].sort((a, b) => {
      if (a.ustensils < b.ustensils) {
        return -1;
      }
      if (a.ustensils > b.ustensils) {
        return 1;
      }
      return 0;
    });

    const arrayOfUstensilNames = sortCardsDataByUstensil.flatMap(
      (recipeData) => recipeData.ustensils
    );

    // tri by 'id'
    const createCards = [...fetchedDataFromApi].sort((a, b) => a.id - b.id);

    //this creates cards
    createCards
      .map((card) => new Card(card))
      .forEach((card) => {
        const templateCards = new CardTemplate(card);
        cardsSection.appendChild(templateCards.createCard());
      });

    const arrayOfIngredients = [];
    const arrayOfAppliances = [];
    const arrayOfUstensils = [];

    // ------------------------
    // Normalizing
    // ------------------------
    const itemArrays = {
      arrayOfApplianceNames: [],
      arrayOfIngredientNames: [],
      arrayOfUstensilNames: [],
    };
    normalizingData(
      arrayOfApplianceNames,
      "appliance",
      sortTemplate,
      itemArrays,
      "arrayOfApplianceNames"
    );

    normalizingData(
      arrayOfIngredientNames,
      "ingredients",
      sortTemplate,
      itemArrays,
      "arrayOfIngredientNames"
    );

    normalizingData(
      arrayOfUstensilNames,
      "ustensils",
      sortTemplate,
      itemArrays,
      "arrayOfUstensilNames"
    );

    //ressort une liste
    function normalizingData(
      normalizeCardsData,
      item,
      sortTemplate,
      itemArrays,
      targetArrayName
    ) {
      let arrayOfItems = [];
      normalizeCardsData.forEach((card, index) => {
        const itemValue = card || "";
        //convert to strings
        //mise en forme : normalise
        const itemNameFirst = itemValue.charAt(0);
        const itemNameRest = itemValue.slice(1);
        const itemName = itemNameFirst + itemNameRest;
        let pluralItemName = itemName + "s";
        //condition
        if (
          !arrayOfItems.includes(itemName) &&
          !arrayOfItems.includes(pluralItemName)
        ) {
          arrayOfItems.push(itemName);
        }
      });
      itemArrays[targetArrayName].push(...arrayOfItems);
      let itemsArrayAppliance = itemArrays.arrayOfApplianceNames;
      let itemsArrayIngredient = itemArrays.arrayOfIngredientNames;
      let itemsArrayUstensil = itemArrays.arrayOfUstensilNames;
      sortTemplate.updateDropdownItems(
        itemsArrayAppliance,
        itemsArrayIngredient,
        itemsArrayUstensil
      );
    }

    //sort everything function
    const arrayOfEverything = [
      ...arrayOfIngredients,
      ...arrayOfAppliances,
      ...arrayOfUstensils,
    ];

    // ------------------------
    // Events
    // ------------------------

    this.searchInput.addEventListener("input", () => {
      this.handleSearchBarInputChange();
      this.filterSearchbarInputForCards(arrayOfEverything, createCards);
    });

    this.faMark.addEventListener("click", () => {
      this.handleClearInput();
    });
    // show dropdown on btn click
    this.ingredientsDropBtn.addEventListener("click", () => {
      document.getElementById("ingredientsDropdown").classList.toggle("show");
    });
    this.ustensilsDropBtn.addEventListener("click", () => {
      document.getElementById("ustensilsDropdown").classList.toggle("show");
    });
    this.appliancesDropBtn.addEventListener("click", () => {
      document.getElementById("appliancesDropdown").classList.toggle("show");
    });

    //Dropdown clicks
    document.addEventListener("click", function (event) {
      handleDropdownHelper(appliancesDropdown, dropDownAppliances);
    });
    document.addEventListener("click", function (event) {
      handleDropdownHelper(ustensilsDropdown, dropDownUstensils);
    });
    document.addEventListener("click", function (event) {
      handleDropdownHelper(ingredientsDropdown, dropDownIngredients);
    });

    //Dropdown input changes
    this.myDropdownInputIngredients.addEventListener("input", () => {
      this.filterDropdownInputHelper(
        myDropdownInputIngredients,
        ingredientsDropdown
      );
    });
    this.myDropdownInputAppliances.addEventListener("input", () => {
      this.filterDropdownInputHelper(
        myDropdownInputAppliances,
        appliancesDropdown
      );
    });
    this.myDropdownInputUstensils.addEventListener("input", () => {
      this.filterDropdownInputHelper(
        myDropdownInputUstensils,
        ustensilsDropdown
      );
    });

    //Main searchbar input changes
    this.mySearchInput.addEventListener("input", () => {
      this.filterSearchbarInputForCards(arrayOfEverything, createCards);
    });

    function handleDropdownHelper(dropdownId, elemId) {
      const dropdown = document.getElementById(dropdownId);
      const elem = document.getElementById(elemId);
      if (dropdownId.classList.contains("show")) {
        const outsideClick = !elemId.contains(event.target);

        if (outsideClick) {
          dropdownId.classList.remove("show");
        } else {
          dropdownId.classList.add("show");
        }
      }
    }

    // Access sortTemplate as this.sortTemplate
    // this.sortTemplate.appendIngredientsName();
    this.sortTemplate.updateDropdownItems();
    this.sortTemplate.handleTagClick(fetchedDataFromApi);
  }

  // ------------------------
  // Helpers
  // ------------------------

  filterDropdownInputHelper(inputId, dropdownElementId) {
    console.log(inputId, dropdownElementId);
    let dropdownElement;
    let aElement;
    let txtValue;
    var input, filterDropdown, i;
    input = document.getElementById(inputId);
    filterDropdown = inputId.value.toUpperCase();
    dropdownElement = document.getElementById(dropdownElementId);

    aElement = dropdownElementId.getElementsByTagName("a");
    for (i = 0; i < aElement.length; i++) {
      txtValue = aElement[i].textContent || aElement[i].innerText;
      if (txtValue.toUpperCase().indexOf(filterDropdown) > -1) {
        aElement[i].style.display = "";
      } else {
        aElement[i].style.display = "none";
      }
    }
  }

  // ------------------------
  // Searchbar
  // ------------------------

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

  filterSearchbarInputForCards(arrayOfEverything, fetchedDataFromApi) {
    console.log("arrayOfEverything", arrayOfEverything);
    console.log("fetchedDataFromApi", fetchedDataFromApi);
    this.searchInput.addEventListener("input", () => {
      let input = this.searchInput.value;
      let mainSearchBarInputUpperCase = input.toUpperCase();

      let inputMatchingElements;

      inputMatchingElements = arrayOfEverything.filter((element) => {
        return element.toUpperCase().includes(mainSearchBarInputUpperCase);
      });
      // console.log(inputMatchingElements);
      this.updateCardsOnSearchBarInput(
        inputMatchingElements,
        fetchedDataFromApi
      );
    });
  }

  // ------------------------
  // Cards manipulation
  // ------------------------

  updateCardsOnSearchBarInput(inputMatchingElements, fetchedDataFromApi) {
    let matchingElementsUppercase = inputMatchingElements.map((element) =>
      element.toUpperCase()
    );
    //Trouve les inputMatchingElements en Uppercase

    let newMatchingElementsAfterInput = fetchedDataFromApi.filter((card) => {
      let cardUppercase = Object.fromEntries(
        Object.entries(card).map(([key, value]) => [
          key,
          String(value).toUpperCase(),
        ])
      );
      //Enregistre les éléments de cards en uppercase : cardUppercase

      return matchingElementsUppercase.some((matchingElement) => {
        return Object.values(cardUppercase).some((property) =>
          property.includes(matchingElement)
        );
      });
      //Retourne les cardUpperCase qui détiennent les inputMatchingElements
    });
    this.updateCards(newMatchingElementsAfterInput);
  }

  updateCards(cardsData) {
    console.log(cardsData);
    const cardsSection = document.querySelector(".cards");
    cardsSection.innerHTML = "";

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
  app.sortTemplate.updateDropdownItems();
};

initApp();
