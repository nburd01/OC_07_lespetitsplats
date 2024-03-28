class dropDownTemplateAppliances {
  constructor(card) {
    this._card = card;
  }

  createDropDown() {
    const sortAppliances = document.getElementById("appliancesGo");

    // Clear existing items before adding new ones
    sortAppliances.innerHTML = "";

    // Loop through each appliance in the list
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
