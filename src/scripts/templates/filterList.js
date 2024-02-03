// sortTemplate.js

import { App } from "../page/index.js";
class SortTemplate {
  constructor() {
    this.ingredientsDropdown = document.getElementById("ingredientsDropdown");
    this.ingredientsDropdownClass =
      document.getElementsByClassName("dropdown-content");
    this.appliancesDropdown = document.getElementById("appliancesDropdown");
    this.ustensilsDropdown = document.getElementById("ustensilsDropdown");
    this.tagsArrayDiv = document.getElementsByClassName("tagsArrayDiv");
    this.tagsList = document.getElementsByClassName("tagsList");
    this.itemNames = [];
    this.applianceNames = [];
    this.ustensilNames = [];
    this.ingredientLinks = [];
    this.tagsArray = [];
  }

  updateDropdownItems(
    itemsaArrayAppliance,
    itemsArrayIngredient,
    itemsArrayUstensil
  ) {
    if (itemsaArrayAppliance) {
      // this.appliancesDropdown.innerHTML = "";
      dropdownLinkCreationHelper(itemsaArrayAppliance);
    }
    if (itemsArrayIngredient) {
      // ------------------------
      // Creation of elements
      // ------------------------
      this.ingredientsDropdown.innerHTML = "";
      dropdownLinkCreationHelper(itemsArrayIngredient);

      // ------------------------
      // Search input event
      // ------------------------
      const searchInputDiv = document.createElement("div");
      searchInputDiv.classList.add("myDropdownInputDiv");

      const searchInput = document.createElement("input");
      searchInput.id = "myDropdownInputIngredients";
      searchInput.placeholder = "Rechercher";

      searchInput.addEventListener("input", () => {
        this.filterDropdownInputHelperIngredients();
      });

      this.ingredientsDropdown.appendChild(searchInputDiv);
      searchInputDiv.appendChild(searchInput);

      // ------------------------
      // Creation of links
      // ------------------------
      itemsArrayIngredient.forEach((ingredient) => {
        const link = document.createElement("a");
        link.classList.add("sortIngredients");
        link.href = `#${ingredient}`;
        link.textContent = ingredient;
        this.ingredientsDropdown.appendChild(link);
      });

      const tagsArray = [];
      const ingredientLinks = document.querySelectorAll(".sortIngredients");
      const tagsList = document.querySelector(".tagsList");
    }

    function dropdownLinkCreationHelper(arrayOfElements) {
      arrayOfElements.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortElements");
        link.href = `#${element}`;
        link.textContent = element;
        // this.elementsDropdown.appendChild(link);
        // console.log(element);
      });
    }
  }

  // ------------------------
  // Events
  // ------------------------

  handleTagClick(fetchedDataFromApi) {
    const ingredientLinks = document.querySelectorAll(".sortIngredients");
    ingredientLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.creatingLiElements(link);
        //Normalize
        const ingredientLinksUpperCase = this.findMatchingElements();
        console.log("tagsArrayUpperCase", ingredientLinksUpperCase);
        this.normalizeApiWithMatchingElements(
          fetchedDataFromApi,
          ingredientLinksUpperCase
        );
      });
      this.closeTagClick(link);
    });
  }

  creatingLiElements(link) {
    const tagsList = document.querySelector(".tagsList");
    //Push to array
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

  closeTagClick() {
    const tagsList = document.querySelector(".tagsList");
    tagsList.addEventListener("click", (event) => {
      if (event.target.classList.contains("closeTag")) {
        const clickedTagText = event.target.previousSibling.textContent;
        const index = this.tagsArray.indexOf(clickedTagText);
        this.tagsArray.splice(index, 1);
        // remove the corresponding li element
        event.target.closest("li").remove();
        this.findMatchingElements();
      }
    });
  }

  findMatchingElements() {
    let ingredientLinksUpperCase = [];
    // console.log("this.tagsArray", this.tagsArray);
    this.tagsArray.forEach((element) => {
      let upperCaseTag = element.toUpperCase();
      ingredientLinksUpperCase.push(upperCaseTag);
    });
    return ingredientLinksUpperCase;
  }

  //compare matching elements with api data and update cards for ingredients
  normalizeApiWithMatchingElements(
    fetchedDataFromApi,
    ingredientLinksUpperCase
  ) {
    let fetchedDataFromApiUppercase;
    fetchedDataFromApiUppercase = fetchedDataFromApi
      .filter((card) => {
        let ingredientsUppercase = card.ingredients.map((ingredient) => ({
          ...ingredient,
          ingredient: String(ingredient.ingredient).toUpperCase(),
        }));

        return ingredientLinksUpperCase.some((matchingElement) => {
          return ingredientsUppercase.some((ingredient) =>
            String(ingredient.ingredient).includes(matchingElement)
          );
        });
      })
      .map((filteredCard) => {
        // console.log("filteredCard", filteredCard.ingredients);
        return filteredCard;
      });

    const appInstance = new App();
    appInstance.updateCards(fetchedDataFromApiUppercase);
  }

  filterDropdownInputHelperIngredients() {
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
