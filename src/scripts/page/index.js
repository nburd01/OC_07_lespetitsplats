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
      createCards
        .map((card) => new Card(card))
        .forEach((card) => {
          const templateCards = new CardTemplate(card);
          cardsSection.appendChild(templateCards.createCard());
        });
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
    });

    //MAIN INPUT CHANGE
    this.searchInput.addEventListener("input", () => {
      filterRecipes(AllRecipes);
      handleSearchBarInputChange();
    });

    function filterRecipes(AllRecipes) {
      const querySearch = {
        search: document.querySelector(".mySearchInput").value,
        ingredients: Array.from(
          document.querySelectorAll(".sortIngredients")
        ).map((e) => e.textContent),
        appliances: Array.from(
          document.querySelectorAll(".sortAppliances")
        ).map((e) => e.textContent),
        ustensils: Array.from(document.querySelectorAll(".sortUstensils")).map(
          (e) => e.textContent
        ),
      };
      let arrayTag = Array.from(document.querySelectorAll(".tag-anchor")).map(
        (e) => e.textContent
      );

      // console.log(arrayTag);
      const filteredRecipes = AllRecipes.filter((recipe) => {
        return (
          recipe.name.includes(querySearch.search) ||
          recipe.appliance.includes(querySearch.search) ||
          recipe.ustensils.some((ustensil) =>
            ustensil.includes(querySearch.search)
          ) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.includes(querySearch.search)
          ) ||
          recipe.ingredients.some((ingredient) =>
            arrayTag.some((tag) => ingredient.ingredient.includes(tag))
          )
        );
      });
      displayRecipes(filteredRecipes);
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
      // console.log(filteredRecipes);

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

      filteredRecipes
        .map((card) => new Card(card))
        .forEach((card) => {
          const templateDropDownIngredient = new dropDownTemplateIngredients(
            card
          );
          ingredientsDropdown.appendChild(
            templateDropDownIngredient.createDropDown()
          );
          //
          const templateDropDownUstensil = new dropDownTemplateUstensils(card);
          ustensilDropdown.appendChild(
            templateDropDownUstensil.createDropDown()
          );
          //
          const templateDropDownAppliance = new dropDownTemplateAppliances(
            card
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
      const chevronDown = document.querySelector(".ingredientsChevronUp");
      chevronDown.classList.toggle("hide");
      const chevronUp = document.querySelector(".ingredientsChevronDown");
      chevronUp.classList.toggle("hide");
    });
    this.ustensilsDropBtn.addEventListener("click", () => {
      document.getElementById("ustensilsDropdown").classList.toggle("show");
      const chevronDown = document.querySelector(".ustensilsChevronUp");
      chevronDown.classList.toggle("hide");
      const chevronUp = document.querySelector(".ustensilsChevronDown");
      chevronUp.classList.toggle("hide");
    });
    this.appliancesDropBtn.addEventListener("click", () => {
      document.getElementById("appliancesDropdown").classList.toggle("show");
      const chevronDown = document.querySelector(".appliancesChevronUp");
      chevronDown.classList.toggle("hide");
      const chevronUp = document.querySelector(".appliancesChevronDown");
      chevronUp.classList.toggle("hide");
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
    //Click outside dropdown to make it disappear
    document.addEventListener("click", function (event) {
      handleDropdownHelper(appliancesDropdown, dropDownAppliances);
    });
    document.addEventListener("click", function (event) {
      handleDropdownHelper(ustensilsDropdown, dropDownUstensils);
    });
    document.addEventListener("click", function (event) {
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
      tagAnchor.classList.add("tag-anchor");
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
      // console.log(matchingItemLinksUpperCase);
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
          const clickedTagText = event.target.previousSibling.textContent;
          const index = tagsArray.indexOf(clickedTagText);
          tagsArray.splice(index, 1);
          event.target.closest("li").remove();
          const matchingItemLinksUpperCase = findMatchingElements();
          // filterRecipes(AllRecipes);
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
