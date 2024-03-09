// sortTemplate.js

import { App } from "../page/index.js";
class SortTemplate {
  constructor() {
    this.ingredientsDropdownClass =
      document.getElementsByClassName("dropdown-content");
    this.tagsArrayDiv = document.getElementsByClassName("tagsArrayDiv");
    this.tagsList = document.getElementsByClassName("tagsList");
    this.itemNames = [];
    this.applianceNames = [];
    this.ustensilNames = [];
    this.ingredientLinks = [];
    this.tagsArray = [];
    this.searchInput = document.querySelector(".mySearchInput");
    this.ingredientsDropdown = document.getElementById("ingredientsDropdown");
    this.appliancesDropdown = document.getElementById("appliancesDropdown");
    this.ustensilsDropdown = document.getElementById("ustensilsDropdown");

    this.myDropdownInputUstensils = document.getElementById(
      "myDropdownInputUstensils"
    );
    this.myDropdownInputAppliances = document.getElementById(
      "myDropdownInputAppliances"
    );
    this.myDropdownInputIngredients = document.getElementById(
      "myDropdownInputIngredients"
    );
  }

  updateDropdownItems(cardsData) {
    console.log(cardsData);
    const arrayOfIngredientNames = cardsData
      .sort()
      .flatMap((recipe) =>
        recipe.ingredients.map((ingredient) => ingredient.ingredient)
      );
    arrayOfIngredientNames.sort();

    const arrayOfApplianceNames = cardsData.map((obj) => obj.appliance);
    arrayOfApplianceNames.sort();
    const arrayOfUstensilNames = cardsData.flatMap((obj) => obj.ustensils);
    arrayOfUstensilNames.sort();

    // ------------------------
    // Creation of elements
    // ------------------------
    this.ingredientsDropdown.innerHTML = "";
    this.appliancesDropdown.innerHTML = "";
    this.ustensilsDropdown.innerHTML = "";

    // ------------------------
    // Search input event
    // ------------------------
    const searchInputDiv = document.createElement("div");
    searchInputDiv.classList.add("myDropdownInputDiv");

    const searchInput = document.createElement("input");
    searchInput.id = "myDropdownInputIngredients";
    searchInput.placeholder = "Rechercher";

    searchInput.addEventListener("input", () => {
      this.filterDropdownInputHelper();
    });

    this.ingredientsDropdown.appendChild(searchInputDiv);
    searchInputDiv.appendChild(searchInput);
    //
    const uniqueIngredients = [...new Set(arrayOfIngredientNames)];
    const uniqueAppliances = [...new Set(arrayOfApplianceNames)];
    const uniqueUstensils = [...new Set(arrayOfUstensilNames)];
    // ------------------------
    // Creation of links
    // ------------------------

    uniqueIngredients.forEach((element) => {
      const link = document.createElement("a");
      link.classList.add("sortIngredients");
      link.href = `#${element}`;
      link.textContent = element;
      this.ingredientsDropdown.appendChild(link);
    });
    uniqueAppliances.forEach((element) => {
      const link = document.createElement("a");
      link.classList.add("sortIngredients");
      link.href = `#${element}`;
      link.textContent = element;
      this.appliancesDropdown.appendChild(link);
    });
    uniqueUstensils.forEach((element) => {
      const link = document.createElement("a");
      link.classList.add("sortIngredients");
      link.href = `#${element}`;
      link.textContent = element;
      this.ustensilsDropdown.appendChild(link);
    });

    const tagsArray = [];
    const ingredientLinks = document.querySelectorAll(".sortIngredients");
    //onclick
    const tagsList = document.querySelector(".tagsList");
    function dropdownLinkCreationHelper(arrayOfElements) {
      arrayOfElements.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortElements");
        link.href = `#${element}`;
        link.textContent = element;
      });
    }
  }

  // ------------------------
  // Events
  // ------------------------

  // tagClickManagement(AllRecipes, dropDownClass, sortClass) {
  //   const tagsList = document.querySelector(".tagsList");

  //   const handleTagClick = (link) => {
  //     this.creatingTagElements(link);
  //     const matchingItemLinksUpperCase = this.findMatchingElements();
  //     this.normalizeApiWithMatchingElements(
  //       AllRecipes,
  //       matchingItemLinksUpperCase
  //     );
  //   };
  //   // mettre event sur ingredientsDropdown
  //   const closeTagClick = (event) => {
  //     if (event.target.classList.contains("closeTag")) {
  //       const clickedTagText = event.target.previousSibling.textContent;
  //       const index = this.tagsArray.indexOf(clickedTagText);
  //       this.tagsArray.splice(index, 1);
  //       event.target.closest("li").remove();
  //       const matchingItemLinksUpperCase = this.findMatchingElements();
  //       this.normalizeApiWithMatchingElements(
  //         AllRecipes,
  //         matchingItemLinksUpperCase
  //       );
  //     }
  //   };
  //   const ingredientsDropdown = document.getElementById(dropDownClass);
  //   ingredientsDropdown.addEventListener("click", (event) => {
  //     const target = event.target;

  //     if (target.classList.contains("sortIngredients")) {
  //       handleTagClick(target);
  //     }
  //   });

  //   tagsList.addEventListener("click", closeTagClick);
  // }

  // ------------------------
  // Logic
  // ------------------------

  findMatchingElements() {
    let matchingItemLinksUpperCase = [];
    this.tagsArray.forEach((element) => {
      let upperCaseTag = element.toUpperCase();
      matchingItemLinksUpperCase.push(upperCaseTag);
    });
    return matchingItemLinksUpperCase;
  }

  // ------------------------
  // Creation
  // ------------------------

  creatingTagElements(link) {
    const tagsList = document.querySelector(".tagsList");
    //Push to elementArray
    this.tagsArray.push(link.textContent);
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

  normalizeApiWithMatchingElements(AllRecipes, matchingItemLinksUpperCase) {
    let filteredObjectsFromApiUppercase;
    filteredObjectsFromApiUppercase = AllRecipes.filter((card) => {
      let ApiIngredientsUppercase = card.ingredients.map((element) => ({
        ...element,
        element: String(element.ingredient).toUpperCase(),
      }));

      let ApiApplianceUppercase = card.appliance.toUpperCase();

      let ApiUstensilsUppercase = card.ustensils.map((ustensil) =>
        ustensil.toUpperCase()
      );

      return matchingItemLinksUpperCase.every((matchingElement) => {
        return (
          ApiIngredientsUppercase.some(
            (element) =>
              String(element.element).toUpperCase() ===
              matchingElement.toUpperCase()
          ) ||
          ApiApplianceUppercase === matchingElement.toUpperCase() ||
          ApiUstensilsUppercase.includes(matchingElement.toUpperCase())
        );
      });
    });

    this.conditionCreateCards(
      matchingItemLinksUpperCase,
      filteredObjectsFromApiUppercase,
      AllRecipes
    );
  }

  conditionCreateCards(
    matchingItemLinksUpperCase,
    filteredObjectsFromApiUppercase,
    AllRecipes
  ) {
    if (matchingItemLinksUpperCase.length > 0) {
      const appInstance = new App();
      appInstance.filterRecipes(filteredObjectsFromApiUppercase);
    } else {
      const appInstance = new App();
      appInstance.filterRecipes(AllRecipes);
    }
  }

  // ------------------------
  // Filter
  // ------------------------

  filterDropdownInputHelper() {
    let ingredientsDropdownElement;
    let aElement;
    let txtValue;
    var input, filterDropdown, i;
    input = document.getElementById("myDropdownInputIngredients");
    filterDropdown = input.value.toUpperCase();
    ingredientsDropdownElement = document.getElementById("ingredientsDropdown");

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
}

export { SortTemplate };
