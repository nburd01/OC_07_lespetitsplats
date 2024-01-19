// sortTemplate.js
class SortTemplate {
  constructor() {
    this.dropdown = document.getElementById("myDropdown");
    this.cardNames = [];
  }

  clearDropdownContent() {
    this.ingredients = [];
    this.updateDropdownContent();
  }

  appendCardName(ingredient) {
    this.cardNames.push(ingredient);
  }

  updateDropdownContent() {
    this.dropdown.innerHTML = "";

    this.cardNames.forEach((ingredient) => {
      const link = document.createElement("a");
      link.href = `#${ingredient}`;
      link.textContent = ingredient;
      this.dropdown.appendChild(link);
    });
  }
}

export { SortTemplate };
