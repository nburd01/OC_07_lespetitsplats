class dropDownTemplateIngredients {
  constructor(card) {
    this._card = card;
  }

  createDropDown() {
    const sortIngredients = document.getElementById("ingredientsGo");
    sortIngredients.innerHTML = "";

    this._card.forEach((ingredient) => {
      const ingredientItem = document.createElement("a");
      ingredientItem.classList.add("sortIngredients");
      //innerHTML
      ingredientItem.innerHTML = ingredient;
      //append
      sortIngredients.appendChild(ingredientItem);
    });
    return sortIngredients;
  }
}

export { dropDownTemplateIngredients };
