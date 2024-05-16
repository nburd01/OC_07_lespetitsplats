class dropDownTemplateUstensils {
  constructor(card) {
    this._card = card;
    this.ustensilArray = new Set();
  }

  createDropDown() {
    const sortUstensils = document.getElementById("ustensilsGo");
    sortUstensils.innerHTML = "";

    this._card.forEach((ustensil) => {
      const ustensilItem = document.createElement("a");
      ustensilItem.classList.add("sortUstensils");
      ustensilItem.innerHTML = ustensil;
      sortUstensils.appendChild(ustensilItem);
    });

    return sortUstensils;
  }
}

export { dropDownTemplateUstensils };
