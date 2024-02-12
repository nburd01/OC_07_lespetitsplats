// sortTemplate.js

import { App } from "../page/index.js";
class SortTemplate {
  constructor() {
    this.ingredientsDropdown = document.getElementById("ingredientsDropdown");
    this.appliancesDropdown = document.getElementById("appliancesDropdown");
    this.ustensilsDropdown = document.getElementById("ustensilsDropdown");
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
    this.myDropdownInputIngredients = document.getElementById(
      "myDropdownInputIngredients"
    );
  }
  // ------------------------
  // Update
  // ------------------------
  updateDropdownItems(
    identifier,
    elementArray,
    matchingElement,
    dropdown,
    sortElementClass,
    elementDropdownClass
  ) {
    switch (identifier) {
      case "ingredients":
        this.centralHelper(
          identifier,
          elementArray,
          matchingElement,
          dropdown,
          sortElementClass,
          elementDropdownClass,
          this.ingredientsDropdown
        );
        break;
      case "ustensils":
        this.centralHelper(
          identifier,
          elementArray,
          matchingElement,
          dropdown,
          sortElementClass,
          elementDropdownClass,
          this.ustensilsDropdown
        );
        break;
      default:
    }
  }

  // ------------------------
  // Central Function
  // ------------------------
  centralHelper(
    identifier,
    elementArray,
    matchingElement,
    dropdown,
    sortElementClass,
    elementDropdownClass
  ) {
    switch (identifier) {
      case "ingredients":
        this.inputCondition(
          identifier,
          elementArray,
          matchingElement,
          dropdown,
          sortElementClass,
          elementDropdownClass
        );

        break;
      case "ustensils":
        this.inputCondition(
          identifier,
          elementArray,
          matchingElement,
          dropdown,
          sortElementClass,
          elementDropdownClass
        );

        break;
      case "appliances":
        this.inputCondition(
          identifier,
          elementArray,
          matchingElement,
          dropdown,
          sortElementClass,
          elementDropdownClass
        );

        break;
      default:
        console.log("Invalid identifier");
    }

    // ------------------------
    // Search input event
    // ------------------------
    // const searchInputDiv = document.createElement("div");
    // searchInputDiv.classList.add("myDropdownInputDiv");

    // const searchInput = document.createElement("input");
    // searchInput.id = "myDropdownInputIngredients";
    // searchInput.placeholder = "Rechercher";

    // searchInput.addEventListener("input", () => {
    //   this.filterDropdownInputHelper();
    // });

    // dropdown.appendChild(searchInputDiv);
    // searchInputDiv.appendChild(searchInput);
    // console.log(elementArray);

    // const tagsArray = [];
    // const ingredientLinks = document.querySelectorAll(sortElementClass);
    // //onclick
    // const tagsList = document.querySelector(".tagsList");
  }

  // ------------------------
  // Creation of links
  // ------------------------
  dropdownLinkCreationHelper(
    identifier,
    elementArray,
    matchingElement,
    dropdown,
    sortElementClass,
    elementDropdownClass
  ) {
    switch (identifier) {
      case "ingredients":
        this.creatingHrefs();
        this.ingredientsDropdown.appendChild(link);
        break;
      case "ustensils":
        this.creatingHrefs();
        this.ustensilsDropdown.appendChild(link);
        break;
      case "appliances":
        this.creatingHrefs();
        this.appliancesDropdown.appendChild(link);
        break;
      default:
    }
  }

  creatingHrefs() {
    elementArray.forEach((element) => {
      const link = document.createElement("a");
      link.classList.add(sortElementClass);
      link.classList.add(identifier);
      link.href = `#${element}`;
      link.textContent = element;
    });
  }

  inputCondition(identifier, elementArray, matchingElement, dropdown) {
    if (
      this.searchInput !== null &&
      this.searchInput.value !== undefined &&
      this.searchInput.value !== ""
    ) {
      // dropdown.innerHTML = "";
      console.log("not null");
      elementArray = matchingElement;
      this.dropdownLinkCreationHelper(matchingElement, elementArray);
    } else {
      this.dropdownLinkCreationHelper(
        identifier,
        elementArray,
        matchingElement,
        dropdown
      );
    }
  }

  // ------------------------
  // Events
  // ------------------------

  tagClickManagement(
    fetchedDataFromApi,
    identifier,
    elementArray,
    sortElementClass,
    elementDropdownClass
  ) {
    const tagsList = document.querySelector(".tagsList");
    const handleTagClick = (link) => {
      this.creatingTagElements(link);
      const matchingItemLinksUpperCase = this.findMatchingElements();
      this.normalizeApiWithMatchingElementsAndUpdateCards(
        fetchedDataFromApi,
        matchingItemLinksUpperCase
      );
    };
    // mettre event sur ingredientsDropdown
    const closeTagClick = (event) => {
      if (event.target.classList.contains("closeTag")) {
        const clickedTagText = event.target.previousSibling.textContent;
        const index = this.tagsArray.indexOf(clickedTagText);
        this.tagsArray.splice(index, 1);
        event.target.closest("li").remove();
        const matchingItemLinksUpperCase = this.findMatchingElements();
        this.normalizeApiWithMatchingElementsAndUpdateCards(
          fetchedDataFromApi,
          matchingItemLinksUpperCase
        );
      }
    };
    const elementsDropdown = document.getElementById(elementDropdownClass);
    elementsDropdown.addEventListener("click", (event) => {
      const target = event.target;
      console.log(target.classList);
      console.log(sortElementClass);
      if (target.classList.contains(identifier)) {
        console.log(1);
        handleTagClick(target);
      }
    });
    tagsList.addEventListener("click", closeTagClick);
  }

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

  normalizeApiWithMatchingElementsAndUpdateCards(
    fetchedDataFromApi,
    matchingItemLinksUpperCase
  ) {
    console.log(fetchedDataFromApi);
    console.log(matchingItemLinksUpperCase);
    let filteredObjectsFromApiUppercase;
    filteredObjectsFromApiUppercase = fetchedDataFromApi
      .filter((card) => {
        let ingredientsUppercase = card.ingredients.map((element) => ({
          ...element,
          element: String(element.ingredient).toUpperCase(),
        }));
        return matchingItemLinksUpperCase.every((matchingElement) => {
          return ingredientsUppercase.some(
            (element) =>
              String(element.element).toUpperCase() ===
              matchingElement.toUpperCase()
          );
        });
      })
      .map((cardCorrespondingToOneWord) => {
        return cardCorrespondingToOneWord;
      });
    console.log("fetchedDataFromApi", fetchedDataFromApi);
    console.log("matchingItemLinksUpperCase", matchingItemLinksUpperCase);
    if (matchingItemLinksUpperCase.length > 0) {
      const appInstance = new App();
      appInstance.updateCards(filteredObjectsFromApiUppercase);
    } else {
      const appInstance = new App();
      appInstance.updateCards(fetchedDataFromApi);
    }
  }

  // ------------------------
  // Filter
  // ------------------------

  // filterDropdownInputHelper() {
  //   let ingredientsDropdownElement;
  //   let aElement;
  //   let txtValue;
  //   var input, filterDropdown, i;
  //   input = document.getElementById("myDropdownInputIngredients");
  //   filterDropdown = input.value.toUpperCase();
  //   ingredientsDropdownElement = document.getElementById("ingredientsDropdown");

  //   aElement = ingredientsDropdownElement.getElementsByTagName("a");
  //   for (i = 0; i < aElement.length; i++) {
  //     txtValue = aElement[i].textContent || aElement[i].innerText;
  //     if (txtValue.toUpperCase().indexOf(filterDropdown) > -1) {
  //       aElement[i].style.display = "";
  //     } else {
  //       aElement[i].style.display = "none";
  //     }
  //   }
  // }
}

export { SortTemplate };
