class dropDownTemplateUstensils {
  constructor(card) {
    this._card = card;
    this.ustensilArray = new Set();
  }

  createDropDown() {
    const sortUstensils = document.getElementById("ustensilsGo");

    this._card._ustensils.forEach((ustensil) => {
      if (!this.ustensilArray.has(ustensil)) {
        this.ustensilArray.add(ustensil);
        //li
        const ustensilItem = document.createElement("a");
        ustensilItem.classList.add("sortUstensils");

        //innerHTML
        ustensilItem.innerHTML = ustensil;

        //append
        sortUstensils.appendChild(ustensilItem);
      }
    });
    // console.log(this.ustensilArray);
    // console.log(this._card);

    return sortUstensils;
  }
}

export { dropDownTemplateUstensils };
