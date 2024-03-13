class dropDownTemplateUstensils {
  constructor(card) {
    this._card = card;
  }

  createDropDown() {
    const sortUstensils = document.getElementById("ustensilsGo");

    this._card._ustensils.forEach((ustensil) => {
      // console.log(ustensil);
      //li
      const ustensilItem = document.createElement("a");
      ustensilItem.classList.add("sortUstensils");

      //innerHTML
      ustensilItem.innerHTML = ustensil;

      //append
      sortUstensils.appendChild(ustensilItem);
    });

    return sortUstensils;
  }
}

export { dropDownTemplateUstensils };
