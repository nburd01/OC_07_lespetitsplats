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
    this.ingredientNames = [];
    this.applianceNames = [];
    this.ustensilNames = [];
    this.ingredientLinks = [];
    this.tagsArray = [];
  }

  clearDropdown() {}
  appendElementName() {}
  updateDropdown() {}
  findMatchingElements() {}
  handleTagClick() {}
  normalizeApiWithMatchingElements() {}
  filterDropdownInputHelper() {}

  //Ingredients
  clearDropdownIngredients() {
    this.ingredientNames = [];
    this.ingredients = [];
    this.arrayOfIngredients = [];
    this.updateDropdownIngredients();
    this.filterDropdownInputHelperIngredients();
  }

  appendIngredientsName(ingredient) {
    {
      this.ingredientNames.push(ingredient);
    }
  }

  updateDropdownIngredients(fetchedDataFromApi) {
    //create dropdown template
    this.ingredientsDropdown.innerHTML = "";
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

    //create link template for Each
    this.ingredientNames.forEach((ingredient) => {
      const link = document.createElement("a");
      link.classList.add("sortIngredients");
      link.href = `#${ingredient}`;
      link.textContent = ingredient;
      this.ingredientsDropdown.appendChild(link);
    });

    const tagsArray = [];
    const ingredientLinks = document.querySelectorAll(".sortIngredients");
    const tagsList = document.querySelector(".tagsList");

    //Event click on Link pushes clicked link text to this.tagsArray within the matching elements scope. Reverse when click on tag to delete
    ingredientLinks.forEach((link) => {
      // tag template creation
      link.addEventListener("click", () => {
        this.tagsArray.push(link.textContent);
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
      });

      // remove tag on click of it
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
    });
  }

  findMatchingElements() {
    let ingredientLinksUpperCase = [];
    this.tagsArray.forEach((element) => {
      let upperCaseTag = element.toUpperCase();
      ingredientLinksUpperCase.push(upperCaseTag);
    });
    console.log("ingredientLinksUpperCase", ingredientLinksUpperCase);
    return ingredientLinksUpperCase;
  }
  //
  handleTagClick(fetchedDataFromApi, tagsArray) {
    tagsArray = this.tagsArray;
    const ingredientLinks = document.querySelectorAll(".sortIngredients");
    ingredientLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const ingredientLinksUpperCase = this.findMatchingElements();
        this.normalizeApiWithMatchingElements(
          fetchedDataFromApi,
          ingredientLinksUpperCase
        );
      });
    });
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
        console.log("filteredCard", filteredCard.ingredients);
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

  //Appliances
  clearDropdownAppliances() {
    this.ingredients = [];
    this.updateDropdownAppliances();
  }
  appendAppliancesName(appliance) {
    this.applianceNames.push(appliance);
  }
  updateDropdownAppliances() {
    this.applianceNames.forEach((appliance) => {
      const link = document.createElement("a");
      link.classList.add("sortAppliances");
      link.href = `#${appliance}`;
      link.textContent = appliance;
      this.appliancesDropdown.appendChild(link);
    });
  }

  //Ustensils
  clearDropdownUstensils() {
    this.ustensils = [];
    this.updateDropdownUstensils();
  }
  appendUstensilsName(ustensil) {
    this.ustensilNames.push(ustensil);
  }
  updateDropdownUstensils() {
    this.ustensilNames.forEach((ustensil) => {
      const link = document.createElement("a");
      link.classList.add("sortUstensils");
      link.href = `#${ustensil}`;
      link.textContent = ustensil;
      this.ustensilsDropdown.appendChild(link);
    });
  }
}

export { SortTemplate };
