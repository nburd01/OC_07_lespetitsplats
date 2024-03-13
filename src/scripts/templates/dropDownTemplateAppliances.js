class dropDownTemplateAppliances {
  constructor(card) {
    this._card = card;
  }

  createDropDown() {
    const sortAppliances = document.getElementById("appliancesGo");

    const appliance = this._card._appliance;

    const applianceItem = document.createElement("a");
    applianceItem.classList.add("sortAppliances");

    applianceItem.innerHTML = appliance;

    sortAppliances.appendChild(applianceItem);

    return sortAppliances;
  }
}

export { dropDownTemplateAppliances };
