class dropDownTemplateAppliances {
  constructor(card) {
    this._card = card;
  }

  createDropDown() {
    const sortAppliances = document.getElementById("appliancesGo");
    sortAppliances.innerHTML = "";

    this._card.forEach((appliance) => {
      const applianceItem = document.createElement("a");
      applianceItem.classList.add("sortAppliances");
      applianceItem.innerHTML = appliance;
      sortAppliances.appendChild(applianceItem);
    });

    return sortAppliances;
  }
}

export { dropDownTemplateAppliances };
