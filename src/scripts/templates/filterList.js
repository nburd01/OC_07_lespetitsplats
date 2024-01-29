// sortTemplate.js
class SortTemplate {
  constructor() {
    this.ingredientsDropdown = document.getElementById("ingredientsDropdown");
    this.ingredientsDropdownClass =
      document.getElementsByClassName("dropdown-content");
    this.appliancesDropdown = document.getElementById("appliancesDropdown");
    this.ustensilsDropdown = document.getElementById("ustensilsDropdown");
    this.ingredientNames = [];
    this.applianceNames = [];
    this.ustensilNames = [];
  }
  //Ingredients
  clearDropdownIngredients() {
    this.ingredientNames = [];
    // console.log("ingredientNames", this.ingredientNames);
    this.ingredients = [];
    this.arrayOfIngredients = [];
    this.updateDropdownIngredients();
  }

  appendIngredientsName(ingredient) {
    {
      this.ingredientNames.push(ingredient);
      // console.log("this.ingredientNames", this.ingredientNames);
    }
  }

  updateDropdownIngredients() {
    // Clear existing elements in the dropdown
    this.ingredientsDropdown.innerHTML = "";
    const searchInputDiv = document.createElement("div");
    searchInputDiv.classList.add("myDropdownInputDiv");

    const searchInput = document.createElement("input");
    searchInput.id = "myDropdownInputIngredients";
    searchInput.placeholder = "Rechercher";

    const searchIcon = document.createElement("svg");
    searchIcon.classList.add("searchicon", "h-5", "w-5", "fill-black");
    searchIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    searchIcon.setAttribute("x", "0px");
    searchIcon.setAttribute("y", "0px");
    searchIcon.setAttribute("width", "50");
    searchIcon.setAttribute("height", "50");
    searchIcon.setAttribute("viewBox", "0 0 30 30");

    const path = document.createElement("path");
    path.setAttribute(
      "d",
      "M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
    );

    this.ingredientsDropdown.appendChild(searchInputDiv);
    searchInputDiv.appendChild(searchInput);
    searchInputDiv.appendChild(searchIcon);

    this.ingredientNames.forEach((ingredient) => {
      // console.log(ingredient);
      const link = document.createElement("a");
      link.classList.add("sortIngredients");
      link.href = `#${ingredient}`;
      link.textContent = ingredient;
      this.ingredientsDropdown.appendChild(link);
    });
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
