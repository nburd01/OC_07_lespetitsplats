class dropDownTemplateIngredients {
  constructor(card) {
    this._card = card;
  }

  createDropDown() {
    const sortIngredients = document.getElementById("ingredientsGo");

    this._card._ingredients.forEach((ingredient) => {
      //li
      const ingredientItem = document.createElement("a");
      ingredientItem.classList.add("sortIngredients");

      //innerHTML
      ingredientItem.innerHTML = `${ingredient.ingredient}`;

      //append
      sortIngredients.appendChild(ingredientItem);
    });

    return sortIngredients;
  }
}

export { dropDownTemplateIngredients };
