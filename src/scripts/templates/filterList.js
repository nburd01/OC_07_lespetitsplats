// sortTemplate.js
class SortTemplate {
  constructor() {
    this.ingredientsDropdown = document.getElementById("ingredientsDropdown");
    this.appliancesDropdown = document.getElementById("appliancesDropdown");
    this.ustensilsDropdown = document.getElementById("ustensilsDropdown");
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
      console.log(ingredient);
      const link = document.createElement("a");
      link.classList.add("sortIngredients");
      link.href = `#${ingredient}`;
      link.textContent = ingredient;
      this.ingredientsDropdown.appendChild(link);
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
      link.classList.add("sortAppliances");
      link.href = `#${appliance}`;
      link.textContent = appliance;
      this.appliancesDropdown.appendChild(link);
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
      link.classList.add("sortUstensils");
      link.href = `#${ustensil}`;
      link.textContent = ustensil;
      this.ustensilsDropdown.appendChild(link);
    });
  }
}

export { SortTemplate };
