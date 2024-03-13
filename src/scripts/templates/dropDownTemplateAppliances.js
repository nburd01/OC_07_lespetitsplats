class dropDownTemplateAppliances {
  constructor(card) {
    this._card = card;
  }

  createDropDown() {
    const sortAppliances = document.getElementById("appliancesGo");
    const appliancesList = document.createElement("ul");
    appliancesList.classList.add("flex", "flex-wrap");

    // Access the appliance property directly from _card
    const appliance = this._card.appliance;

    // Create a list item for the appliance
    const applianceItem = document.createElement("a");
    applianceItem.classList.add("sortAppliances");

    // Set the innerHTML to the appliance value
    applianceItem.innerHTML = `${appliance}`;

    // Append the appliance item to the list
    appliancesList.appendChild(applianceItem);

    // Append the list to the target element
    sortAppliances.appendChild(appliancesList);

    return sortAppliances;
  }
}

export { dropDownTemplateAppliances };
