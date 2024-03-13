class DropDownTemplate {
  constructor(card) {
    this._card = card;
  }

  createDropDown() {
    const sortIngredients = document.getElementById("ingredientsGo");
    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("flex", "flex-wrap");

    this._card._ingredients.forEach((ingredient) => {
      //li
      const ingredientItem = document.createElement("a");
      ingredientItem.classList.add("sortIngredients");

      //innerHTML
      ingredientItem.innerHTML = `${ingredient.ingredient}`;

      //append
      ingredientsList.appendChild(ingredientItem);
    });

    sortIngredients.appendChild(ingredientsList);

    return sortIngredients;
  }
}

export { DropDownTemplate };
