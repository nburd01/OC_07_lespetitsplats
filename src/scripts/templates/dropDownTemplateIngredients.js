class dropDownTemplateIngredients {
  constructor(card) {
    this._card = card;
  }

  createDropDown() {
    const sortIngredients = document.getElementById("ingredientsGo");
    const appendedIngredients = new Set();
    const ingrArray = [];
    this._card._ingredients.forEach((ingredient) => {
      ingrArray.push(ingredient.ingredient);
      console.log("ingredient", ingredient.ingredient);
      if (!appendedIngredients.has(ingredient.ingredient)) {
        // console.log(1);
        //li
        const ingredientItem = document.createElement("a");
        ingredientItem.classList.add("sortIngredients");

        //innerHTML
        ingredientItem.innerHTML = `${ingredient.ingredient}`;

        //append
        sortIngredients.appendChild(ingredientItem);
        //appendedIngr
        appendedIngredients.add(ingredient.ingredient);
      }
    });

    return sortIngredients;
  }
}

export { dropDownTemplateIngredients };
