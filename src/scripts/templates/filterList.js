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

    this.myDropdownInputIngredients = document.getElementById(
      "myDropdownInputIngredients"
    );
  }

  updateDropdownItems(
    identifier,
    elementArray,
    elementsDropdown,
    //

    matchingElement,
    myDropdownInputDiv
  ) {
    // ------------------------
    // Creation of elements
    // ------------------------
    elementsDropdown.innerHTML = "";
    if (matchingElement != null) {
      elementArray = matchingElement;
      dropdownLinkCreationHelper(matchingElement);
    } else {
      dropdownLinkCreationHelper(elementArray);
    }

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

    elementsDropdown.appendChild(searchInputDiv);
    searchInputDiv.appendChild(searchInput);

    // ------------------------
    // Creation of links
    // ------------------------
    elementArray.forEach((element) => {
      const link = document.createElement("a");
      link.classList.add("sortIngredients");
      link.href = `#${element}`;
      link.textContent = element;
      elementsDropdown.appendChild(link);
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

  tagClickManagement(fetchedDataFromApi) {
    const tagsList = document.querySelector(".tagsList");

    const handleTagClick = (link) => {
      //ici link n'est pas attribué quand il y a le
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
    const ingredientsDropdown = document.getElementById("ingredientsDropdown");
    ingredientsDropdown.addEventListener("click", (event) => {
      const target = event.target;

      if (target.classList.contains("sortIngredients")) {
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
