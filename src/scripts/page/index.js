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

    this.appliancesDropdown = document.querySelectorAll(".sortAppliances");
    this.ustensilsDropdown = document.querySelectorAll(".sortUstensils");
    this.ingredientsDropdown = document.getElementById("ingredientsDropdown");
    this.appliancesDropdown = document.getElementById("appliancesDropdown");
    this.ustensilsDropdown = document.getElementById("ustensilsDropdown");
  }

  async main() {
    const sortTemplate = this.sortTemplate;
    let itemsArrayAppliance = [];
    let itemsArrayIngredient = [];
    let itemsArrayUstensil = [];

    this.faMark.style.display = "none";
    const cardsSection = document.querySelector(".cards");

    // ------------------------
    // Fetching
    // ------------------------

    //Fetch data
    const AllRecipes = await this.cardsApi.getCards();

    // tri a-z by 'name'
    const sortCardsDataByIngredient = [...AllRecipes].sort((a, b) => {
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
    const sortCardsDataByAppliance = [...AllRecipes].sort((a, b) => {
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

    const sortCardsDataByUstensil = [...AllRecipes].sort((a, b) => {
      if (a.ustensils < b.ustensils) {
        return -1;
      }
      if (a.ustensils > b.ustensils) {
        return 1;
      }
      return 0;
    });

    const arrayOfUstensilNames = sortCardsDataByUstensil.flatMap(
      (obj) => obj.ustensils
    );

    // tri by 'id'
    const createCards = [...AllRecipes].sort((a, b) => a.id - b.id);

    // ------------------------
    // Creating
    // ------------------------
    createCards
      .map((card) => new Card(card))
      .forEach((card) => {
        const templateCards = new CardTemplate(card);
        cardsSection.appendChild(templateCards.createCard());
      });

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
        const itemNameFirst = itemValue.charAt(0).toUpperCase();
        const itemNameRest = itemValue.slice(1).toLowerCase();
        const itemName = itemNameFirst + itemNameRest;
        let pluralItemName = itemName + "s";
        //condition
        if (
          !arrayOfItems.includes(itemName) ||
          !arrayOfItems.includes(pluralItemName)
        ) {
          arrayOfItems.push(itemName);
          arrayOfItems.sort();
        }
      });

      itemArrays[targetArrayName].push(...arrayOfItems);
      itemsArrayAppliance = itemArrays.arrayOfApplianceNames;
      itemsArrayIngredient = itemArrays.arrayOfIngredientNames;
      itemsArrayUstensil = itemArrays.arrayOfUstensilNames;
    }

    //sort everything function
    const arrayOfEverything = [
      ...itemArrays.arrayOfApplianceNames,
      ...itemArrays.arrayOfIngredientNames,
      ...itemArrays.arrayOfUstensilNames,
    ];

    initializeDropdownItems(
      itemsArrayIngredient,
      itemsArrayUstensil,
      itemsArrayAppliance
    );

    function initializeDropdownItems(
      itemsArrayIngredient,
      itemsArrayUstensil,
      itemsArrayAppliance
    ) {
      // ------------------------
      // Search input event
      // ------------------------

      const searchInputDiv = document.createElement("div");
      searchInputDiv.classList.add("myDropdownInputDiv");

      // ------------------------
      // Creation of links
      // ------------------------
      itemsArrayIngredient.sort();
      function removeDuplicates(data) {
        return data.reduce((unique, value) => {
          if (!unique.includes(value)) {
            unique.push(value);
          }
          return unique;
        }, []);
      }
      let resultIngredient = removeDuplicates(itemsArrayIngredient);
      let resultAppliance = removeDuplicates(itemsArrayAppliance);
      let resultUstensil = removeDuplicates(itemsArrayUstensil);
      resultIngredient.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortIngredients");
        link.href = `#${element}`;
        link.textContent = element;
        ingredientsDropdown.appendChild(link);
      });
      resultUstensil.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortIngredients");
        link.href = `#${element}`;
        link.textContent = element;
        ustensilsDropdown.appendChild(link);
      });
      resultAppliance.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortIngredients");
        link.href = `#${element}`;
        link.textContent = element;
        appliancesDropdown.appendChild(link);
      });
    }

    // ------------------------
    // Events
    // ------------------------

    //MAIN INPUT CHANGE
    this.searchInput.addEventListener("input", () => {
      const querySearch = {
        search: document.querySelector(".mySearchInput").value,
        // ingredients: Array.from(
        //   document.querySelectorAll(".tag-ingredients")
        // ).map((e) => e.textContent),
        // appliances: Array.from(
        //   document.querySelectorAll(".tag-appliances")
        // ).map((e) => e.textContent),
        // ustensils: Array.from(
        //   document.querySelectorAll(".tag-ustensils"))
        //   .map(
        //   (e) => e.textContent
        // ),
      };
      filterRecipes(AllRecipes, querySearch);
    });

    function filterRecipes(AllRecipes, querySearch) {
      // console.log("AllRecipes", AllRecipes);
      const filteredRecipes = AllRecipes.filter((recipe) => {
        if (recipe.name.includes(querySearch.search)) {
          console.log(recipe.name);
          return recipe.name;
        }
        if (recipe.appliance.includes(querySearch.search)) {
          console.log(recipe.appliance);
          return recipe.appliance;
        }

        const matchingIngredients = recipe.ingredients
          .filter((ingredient) =>
            ingredient.ingredient.includes(querySearch.search)
          )
          .map((matchingIngredient) => matchingIngredient.ingredient);

        if (matchingIngredients.length > 0) {
          console.log("Recipe: ", recipe.name);
          console.log("Matching Ingredients:", matchingIngredients);
          return true;
        }

        return false;
      });

      displayRecipes(filteredRecipes);
    }

    function displayRecipes(cardsData) {
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

    this.faMark.addEventListener("click", () => {
      this.handleClearInput();
      this.updateRecipes([...AllRecipes]);
    });
  }
  // show dropdown on btn click
  // this.ingredientsDropBtn.addEventListener("click", () => {
  //   document.getElementById("ingredientsDropdown").classList.toggle("show");
  // });
  // this.ustensilsDropBtn.addEventListener("click", () => {
  //   document.getElementById("ustensilsDropdown").classList.toggle("show");
  // });
  // this.appliancesDropBtn.addEventListener("click", () => {
  //   document.getElementById("appliancesDropdown").classList.toggle("show");
  // });

  //Dropdown clicks
  // document.addEventListener("click", function (event) {
  //   handleDropdownHelper(appliancesDropdown, dropDownAppliances);
  // });
  // document.addEventListener("click", function (event) {
  //   handleDropdownHelper(ustensilsDropdown, dropDownUstensils);
  // });
  // document.addEventListener("click", function (event) {
  //   handleDropdownHelper(ingredientsDropdown, dropDownIngredients);
  // });

  //Dropdown input changes
  // this.myDropdownInputIngredients.addEventListener("input", () => {
  //   this.filterDropdownInputHelper(
  //     myDropdownInputIngredients,
  //     ingredientsDropdown
  //   );
  // });
  // this.myDropdownInputAppliances.addEventListener("input", () => {
  //   this.filterDropdownInputHelper(
  //     myDropdownInputAppliances,
  //     appliancesDropdown
  //   );
  // });
  // this.myDropdownInputUstensils.addEventListener("input", () => {
  //   this.filterDropdownInputHelper(
  //     myDropdownInputUstensils,
  //     ustensilsDropdown
  //   );
  // });

  //Main searchbar input changes
  // this.mySearchInput.addEventListener("input", () => {
  //   this.filterSearchbarInputForCards(arrayOfEverything, createCards);
  // });

  // function handleDropdownHelper(dropdownId, elemId) {
  //   const dropdown = document.getElementById(dropdownId);
  //   const elem = document.getElementById(elemId);
  //   if (dropdownId.classList.contains("show")) {
  //     const outsideClick = !elemId.contains(event.target);

  //     if (outsideClick) {
  //       dropdownId.classList.remove("show");
  //     } else {
  //       dropdownId.classList.add("show");
  //     }
  //   }
  // }

  // this.sortTemplate.tagClickManagement(
  //   AllRecipes,
  //   "ingredientsDropdown",
  //   "sortIngredients"
  // );
  // this.sortTemplate.tagClickManagement(
  //   AllRecipes,
  //   "appliancesDropdown",
  //   "sortAppliances"
  // );
  // this.sortTemplate.tagClickManagement(
  //   AllRecipes,
  //   "ustensilsDropdown",
  //   "sortUstensils"
  // );

  // this.sortTemplate.filterDropdownInputHelper("myDropdownInputIngredients");

  // ------------------------
  // Helpers
  // ------------------------

  // filterDropdownInputHelper(inputId, dropdownElementId) {
  //   let dropdownElement;
  //   let aElement;
  //   let txtValue;
  //   var input, filterDropdown, i;
  //   input = document.getElementById(inputId);
  //   filterDropdown = inputId.value.toUpperCase();
  //   dropdownElement = document.getElementById(dropdownElementId);

  //   aElement = dropdownElementId.getElementsByTagName("a");
  //   for (i = 0; i < aElement.length; i++) {
  //     txtValue = aElement[i].textContent || aElement[i].innerText;
  //     if (txtValue.toUpperCase().indexOf(filterDropdown) > -1) {
  //       aElement[i].style.display = "";
  //     } else {
  //       aElement[i].style.display = "none";
  //     }
  //   }
  // }

  // ------------------------
  // Searchbar
  // ------------------------

  // handleSearchBarInputChange(
  //   itemsArrayIngredient,
  //   itemsArrayAppliance,
  //   itemsArrayUstensil
  // ) {
  //   const userInput = this.searchInput.value.toLowerCase();

  //   if (this.searchInput.value !== "") {
  //     let matchingIngredients = [];
  //     for (let index = 0; index < itemsArrayIngredient.length; index++) {
  //       const element = itemsArrayIngredient[index];
  //       if (element.toLowerCase().includes(userInput)) {
  //         matchingIngredients.push(element);
  //       }
  //     }
  //     //
  //     let matchingAppliances = [];
  //     for (let index = 0; index < itemsArrayAppliance.length; index++) {
  //       const element = itemsArrayAppliance[index];
  //       if (element.toLowerCase().includes(userInput)) {
  //         matchingAppliances.push(element);
  //       }
  //     }

  //     let matchingUstensils = [];
  //     for (let index = 0; index < itemsArrayUstensil.length; index++) {
  //       const element = itemsArrayUstensil[index];
  //       if (element.toLowerCase().includes(userInput)) {
  //         matchingUstensils.push(element);
  //       }
  //     }

  //     this.faMark.style.display = "block";
  //   } else {
  //     this.faMark.style.display = "none";
  //     this.searchInput.placeholder =
  //       "Rechercher une recette, un ingrédient, ...";
  //   }
  // }

  // handleClearInput() {
  //   this.searchInput.value = "";
  //   this.faMark.style.display = "none";
  //   this.searchInput.placeholder = "Rechercher une recette, un ingrédient, ...";
  // }

  // filterSearchbarInputForCards(arrayOfEverything, AllRecipes) {
  //   this.searchInput.addEventListener("input", () => {
  //     let userInput = this.searchInput.value;
  //     let mainSearchBarInputUpperCase = userInput.toUpperCase();

  //     let inputMatchingElements = [];
  //     for (let index = 0; index < arrayOfEverything.length; index++) {
  //       const element = arrayOfEverything[index];
  //       if (element.toUpperCase().includes(mainSearchBarInputUpperCase)) {
  //         inputMatchingElements.push(element);
  //       }
  //     }

  //     this.updateRecipes(inputMatchingElements, AllRecipes);
  //   });
  // }

  // ------------------------
  // Cards manipulation
  // ------------------------

  // filterRecipes = AllRecipes.filter((recipe) => {
  //   return (
  //     recipe.title.includes(query.search) ||
  //     query.ingredients.every((ingr) => recipe.ingredients.includes(ingr))
  //   );
  // });

  // updateRecipes(inputMatchingElements, AllRecipes) {
  //   let matchingElementsUppercase = inputMatchingElements.map((element) =>
  //     element.toUpperCase()
  //   );
  //   //Trouve les inputMatchingElements en Uppercase
  //   let newMatchingElementsAfterInput = AllRecipes.filter((card) => {
  //     let cardUppercase = Object.fromEntries(
  //       Object.entries(card).map(([key, value]) => [
  //         key,
  //         String(value).toUpperCase(),
  //       ])
  //     );
  //     //Enregistre les éléments de cards en uppercase : cardUppercase

  //     return matchingElementsUppercase.some((matchingElement) => {
  //       return Object.values(cardUppercase).some((property) =>
  //         property.includes(matchingElement)
  //       );
  //     });
  //     //Retourne les cardUpperCase qui détiennent les inputMatchingElements
  //   });
  //   if (this.searchInput.value.length > 2) {
  //     this.displayRecipes(newMatchingElementsAfterInput);
  //   }
  //   if (this.searchInput.value.length <= 0) {
  //     this.displayRecipes(newMatchingElementsAfterInput);
  //   }
  // }
}

const initApp = async () => {
  const app = new App();
  app.main();
};

initApp();
