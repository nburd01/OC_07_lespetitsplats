// sortTemplate.js
class SortTemplate {
  constructor() {
    this.dropdown = document.getElementById("ingredientsDropdown");
    this.ingredientNames = [];
    this.applianceNames = [];
    this.ustensilNames = [];
  }
  clearDropdownIngredients() {
    this.ingredients = [];
    this.updateDropdownIngredients();
  }

  appendIngredientsName(ingredient) {
    this.ingredientNames.push(ingredient);
  }

  updateDropdownIngredients() {
    this.ingredientNames.forEach((ingredient) => {
      const link = document.createElement("a");
      link.classList.add("sortItem");
      link.href = `#${ingredient}`;
      link.textContent = ingredient;
      this.dropdown.appendChild(link);
    });
  }
  //
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
      link.classList.add("sortItem");
      link.href = `#${appliance}`;
      link.textContent = appliance;
      this.dropdown.appendChild(link);
    });
  }
  //
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
      link.classList.add("sortItem");
      link.href = `#${ustensil}`;
      link.textContent = ustensil;
      this.dropdown.appendChild(link);
    });
  }
}

export { SortTemplate };
