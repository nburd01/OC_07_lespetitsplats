import { CardsApi } from "../api/api.js";
import { Card } from "../class/cards.js";

import { CardTemplate } from "../templates/cardList.js";
import { dropDownTemplateAppliances } from "../templates/dropDownTemplateAppliances.js";
import { dropDownTemplateIngredients } from "../templates/dropDownTemplateIngredients.js";
import { dropDownTemplateUstensils } from "../templates/dropDownTemplateUstensils.js";

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
    // this.sortTemplate = new SortTemplate();

    this.appliancesDropdown = document.querySelectorAll(".sortAppliances");
    this.ustensilsDropdown = document.querySelectorAll(".sortUstensils");
    this.ingredientsDropdown = document.getElementById("ingredientsDropdown");
    this.ingredientsGo = document.getElementById("ingredientsGo");
    this.appliancesGo = document.getElementById("appliancesGo");
    this.ustensilsGo = document.getElementById("ustensilsGo");
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
    function creatingCards() {
      createCards
        .map((card) => new Card(card))
        .forEach((card) => {
          // console.log(card);
          const templateCards = new CardTemplate(card);
          cardsSection.appendChild(templateCards.createCard());
        });
    }
    creatingCards();

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
      //Initial dropdown render
      resultIngredient.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortIngredients");
        link.href = `#${element}`;
        link.textContent = element;
        ingredientsGo.appendChild(link);
        // ingredientsDropdown.appendChild(link);
      });
      resultUstensil.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortUstensils");
        link.href = `#${element}`;
        link.textContent = element;
        ustensilsGo.appendChild(link);
      });
      resultAppliance.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortAppliances");
        link.href = `#${element}`;
        link.textContent = element;
        appliancesGo.appendChild(link);
      });
    }
    function handleSearchBarInputChange() {
      if (document.querySelector(".mySearchInput").value !== "") {
        document.querySelector(".fa-xmark").style.display = "block";
      } else {
        this.faMark.style.display = "none";
        this.searchInput.placeholder =
          "Rechercher une recette, un ingrédient, ...";
      }
    }
    document.querySelector(".fa-xmark").addEventListener("click", () => {
      handleClearInput();
      creatingCards();
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
        ingredientsGo.appendChild(link);
      });
      resultUstensil.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortUstensils");
        link.href = `#${element}`;
        link.textContent = element;
        console.log(link.textContent);
        ustensilsGo.appendChild(link);
      });
      resultAppliance.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortAppliances");
        link.href = `#${element}`;
        link.textContent = element;
        appliancesGo.appendChild(link);
      });
    });

    //MAIN INPUT CHANGE
    this.searchInput.addEventListener("input", (event) => {
      // if (event.target.value > 2) {
      filterRecipes(AllRecipes);
      // }
      handleSearchBarInputChange();
    });

    function filterRecipes(AllRecipes) {
      //Prends en compte la searchInput et les tags choisis
      const querySearch = {
        search: document.querySelector(".mySearchInput").value,
        ingredients: Array.from(
          document.querySelectorAll(".tag-anchor.ingredientsGo")
        ).map((e) => e.textContent),
        appliances: Array.from(
          document.querySelectorAll(".tag-anchor.appliancesGo")
        ).map((e) => e.textContent),
        ustensils: Array.from(
          document.querySelectorAll(".tag-anchor.ustensilsGo")
        ).map((e) => e.textContent),
      };

      const filteredRecipes = AllRecipes.filter((recipe) => {
        const hasInName = recipe.name.includes(querySearch.search);

        let hasAllIngredients = true;
        let hasAllAppliances = true;
        let hasAllUstensils = true;

        if (querySearch.ingredients.length > 0) {
          hasAllIngredients = querySearch.ingredients.every((i) =>
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient.includes(i)
            )
          );
        }

        if (querySearch.appliances.length > 0) {
          hasAllAppliances = querySearch.appliances.every((i) =>
            recipe.appliance.includes(i)
          );
        }

        if (querySearch.ustensils.length > 0) {
          hasAllUstensils = querySearch.ustensils.every((i) =>
            recipe.ustensils.includes(i)
          );
        }
        return (
          hasInName && hasAllIngredients && hasAllAppliances && hasAllUstensils
        );
      });
      // console.log(querySearch);
      // console.log("filteredRecipes", filteredRecipes);
      displayRecipes(filteredRecipes, querySearch);
      displayFilterList(filteredRecipes);
    }

    function displayRecipes(filteredRecipes) {
      const cardsSection = document.querySelector(".cards");
      cardsSection.innerHTML = "";

      filteredRecipes
        .map((card) => new Card(card))
        .forEach((card) => {
          const templateCards = new CardTemplate(card);
          cardsSection.appendChild(templateCards.createCard());
        });
    }

    function displayFilterList(filteredRecipes) {
      const sortIngredients = document.getElementById("ingredientsGo");
      const sortAppliances = document.getElementById("appliancesGo");
      const sortUstensils = document.getElementById("ustensilsGo");
      const ingredientsDropdown = document.getElementById(
        "ingredientsDropdown"
      );
      const appliancesDropdown = document.getElementById("appliancesDropdown");
      const ustensilDropdown = document.getElementById("ustensilsDropdown");

      sortIngredients.innerHTML = "";
      sortAppliances.innerHTML = "";
      sortUstensils.innerHTML = "";

      //Ingredients
      filteredRecipes.forEach(
        (recipe) =>
          (recipe._ingredients = recipe.ingredients.map(
            (ingredient) => ingredient.ingredient
          ))
      );

      const ingredientList = new Set();

      filteredRecipes.forEach((recipe) =>
        ingredientList.add(...recipe._ingredients)
      );

      //Appliances
      filteredRecipes.forEach((recipe) => recipe.appliance);

      const applianceList = new Set();

      filteredRecipes.forEach((recipe) => applianceList.add(recipe.appliance));

      //Ustensils
      filteredRecipes.forEach((recipe) =>
        recipe.ustensils.map((ustensil) => ustensil)
      );

      const ustensilList = new Set();

      filteredRecipes.forEach((recipe) =>
        ustensilList.add(...recipe.ustensils)
      );

      // console.log("ingredientList", ingredientList);
      console.log("ustensilList", ustensilList);
      // console.log("filteredRecipes", filteredRecipes);

      filteredRecipes
        .map((card) => new Card(card))
        .forEach((card) => {
          const templateDropDownIngredient = new dropDownTemplateIngredients(
            ingredientList
          );
          ingredientsDropdown.appendChild(
            templateDropDownIngredient.createDropDown()
          );
          //
          const templateDropDownUstensil = new dropDownTemplateUstensils(
            ustensilList
          );
          ustensilDropdown.appendChild(
            templateDropDownUstensil.createDropDown()
          );
          //
          const templateDropDownAppliance = new dropDownTemplateAppliances(
            applianceList
          );
          appliancesDropdown.appendChild(
            templateDropDownAppliance.createDropDown()
          );
        });
    }

    // ------------------------
    // Events
    // ------------------------

    //toggle dropdown hide/show
    this.ingredientsDropBtn.addEventListener("click", () => {
      document.getElementById("ingredientsDropdown").classList.toggle("show");
      const chevronDown = document.querySelector(".ingredientsChevronDown");
      chevronDown.classList.toggle("hide");
      const chevronUp = document.querySelector(".ingredientsChevronUp");
      chevronUp.classList.toggle("hide");
    });

    // Similar logic for other dropdowns
    this.ustensilsDropBtn.addEventListener("click", () => {
      document.getElementById("ustensilsDropdown").classList.toggle("show");
      const chevronDown = document.querySelector(".ustensilsChevronDown");
      chevronDown.classList.toggle("hide");
      const chevronUp = document.querySelector(".ustensilsChevronUp");
      chevronUp.classList.toggle("hide");
    });
    this.appliancesDropBtn.addEventListener("click", () => {
      document.getElementById("appliancesDropdown").classList.toggle("show");
      const chevronDown = document.querySelector(".appliancesChevronDown");
      chevronDown.classList.toggle("hide");
      const chevronUp = document.querySelector(".appliancesChevronUp");
      chevronUp.classList.toggle("hide");
    });
    //
    function handleDropdownHelper(dropdownId, elemId) {
      const dropdown = document.getElementById(dropdownId);
      const elem = document.getElementById(elemId);
      if (dropdownId.classList.contains("show")) {
        const outsideClick = !elemId.contains(event.target);

        if (outsideClick) {
          dropdownId.classList.remove("show");
          toggleChevronsOutsideDropdown(event);
        } else {
          dropdownId.classList.add("show");
        }
      }
    }
    function toggleChevronsOutsideDropdown(event) {
      const dropdowns = document.querySelectorAll(".dropdown");

      dropdowns.forEach(function (dropdown) {
        // Get all dropdown elements
        const dropdowns = document.querySelectorAll(".dropdown");

        // Check if the click target is inside any dropdown
        let isInsideDropdown = false;
        dropdowns.forEach(function (dropdown) {
          if (dropdown.contains(event.target)) {
            isInsideDropdown = true;
          }
        });

        // Toggle chevron visibility based on whether click is inside or outside dropdown
        if (!isInsideDropdown) {
          const chevronUpElements = document.querySelectorAll(".fa-chevron-up");
          const chevronDownElements =
            document.querySelectorAll(".fa-chevron-down");

          chevronUpElements.forEach(function (chevronUp) {
            chevronUp.classList.add("hide");
          });

          chevronDownElements.forEach(function (chevronDown) {
            chevronDown.classList.add("hide");
          });
        }
      });
    }

    //Click outside dropdown to make it disappear
    document.addEventListener("click", function (event) {
      handleDropdownHelper(appliancesDropdown, dropDownAppliances);
      handleDropdownHelper(ustensilsDropdown, dropDownUstensils);
      handleDropdownHelper(ingredientsDropdown, dropDownIngredients);
    });

    //Input inside dropdown
    this.myDropdownInputIngredients.addEventListener("input", () => {
      filterDropdownInputHelper(
        myDropdownInputIngredients,
        ingredientsDropdown
      );
    });
    this.myDropdownInputAppliances.addEventListener("input", () => {
      filterDropdownInputHelper(myDropdownInputAppliances, appliancesDropdown);
    });
    this.myDropdownInputUstensils.addEventListener("input", () => {
      filterDropdownInputHelper(myDropdownInputUstensils, ustensilsDropdown);
    });
    //filter le dropdown on search
    function filterDropdownInputHelper(inputId, dropdownElementId) {
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
    const tagsArray = [];

    function creatingTagElements(link) {
      const tagsList = document.querySelector(".tagsList");
      //Push to elementArray
      tagsArray.push(link.textContent);
      //Create elements
      const tag = document.createElement("li");
      tag.classList.add("tag-li");
      const tagAnchor = document.createElement("a");
      tagAnchor.classList.add(
        "tag-anchor",
        `${link.parentNode.getAttribute("id")}`
      );
      tagAnchor.textContent = link.textContent;
      tagsList.appendChild(tag);
      tag.appendChild(tagAnchor);
      const tagAnchorClose = document.createElement("i");
      tagAnchorClose.classList.add("fa-solid", "fa-xmark", "closeTag");
      tagAnchor.appendChild(tagAnchorClose);
    }
    function findMatchingElements() {
      let matchingItemLinksUpperCase = [];
      tagsArray.forEach((element) => {
        let upperCaseTag = element.toUpperCase();
        matchingItemLinksUpperCase.push(upperCaseTag);
      });
      return matchingItemLinksUpperCase;
    }

    function tagClickManagement(AllRecipes, dropDownClass) {
      const tagsList = document.querySelector(".tagsList");

      const handleTagClick = (link) => {
        creatingTagElements(link);
        const matchingItemLinksUpperCase = findMatchingElements();
        filterRecipes(AllRecipes);
      };
      // mettre event sur ingredientsDropdown
      const closeTagClick = (event) => {
        if (event.target.classList.contains("closeTag")) {
          const clickedTagText = event.target.parentElement.textContent.trim();
          const index = tagsArray.indexOf(clickedTagText);
          tagsArray.splice(index, 1);
          event.target.closest("li").remove();
          const matchingItemLinksUpperCase = findMatchingElements();

          filterRecipes(AllRecipes);
        }
      };
      const ingredientsDropdown = document.getElementById(dropDownClass);
      ingredientsDropdown.addEventListener("click", (event) => {
        const target = event.target;

        if (
          target.classList.contains("sortIngredients") ||
          target.classList.contains("sortAppliances") ||
          target.classList.contains("sortUstensils")
        ) {
          handleTagClick(target);
        }
      });

      tagsList.addEventListener("click", closeTagClick);
    }
    tagClickManagement(AllRecipes, "ingredientsDropdown", "sortIngredients");
    tagClickManagement(AllRecipes, "appliancesDropdown", "sortAppliances");
    tagClickManagement(AllRecipes, "ustensilsDropdown", "sortUstensils");
    function handleClearInput() {
      var ustensilsGoDropdown = document.getElementById("ustensilsGo");
      while (ustensilsGoDropdown.firstChild) {
        ustensilsGoDropdown.removeChild(ustensilsGoDropdown.firstChild);
      }
      var appliancesGoDropdown = document.getElementById("appliancesGo");
      while (appliancesGoDropdown.firstChild) {
        appliancesGoDropdown.removeChild(appliancesGoDropdown.firstChild);
      }
      var ingredientsGoDropdown = document.getElementById("ingredientsGo");
      while (ingredientsGoDropdown.firstChild) {
        ingredientsGoDropdown.removeChild(ingredientsGoDropdown.firstChild);
      }
      document.querySelector(".mySearchInput").value = "";
      document.querySelector(".fa-xmark").style.display = "none";
      document.querySelector("#mySearchInput").placeholder =
        "Rechercher une recette, un ingrédient, ...";
    }
  }
}

const initApp = async () => {
  const app = new App();
  app.main();
};

initApp();
