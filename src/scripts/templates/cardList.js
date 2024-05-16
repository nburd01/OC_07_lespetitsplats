class CardTemplate {
  constructor(card) {
    this._card = card;
  }

  createCard() {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-info");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const imagePath = `src/assets/images/${this._card._image}`;

    const imgElement = document.createElement("img");
    imgElement.classList.add("card-image");
    imgElement.src = imagePath;
    imgElement.alt = `${this._card._name}`;

    const cardTitle = document.createElement("p");
    cardTitle.innerHTML = `${this._card._name}`;
    cardTitle.classList.add("card-title");

    const cardSubTitleRecette = document.createElement("p");
    cardSubTitleRecette.innerHTML = "Recette";
    cardSubTitleRecette.classList.add("card-subtitle");

    const cardBubbleDiv = document.createElement("div");
    cardBubbleDiv.classList.add("bubble");

    const cardBubble = document.createElement("p");
    cardBubble.innerHTML = `${this._card._time} min`;
    cardBubble.classList.add("bubble-text");

    const cardSubTitleIngredients = document.createElement("p");
    cardSubTitleIngredients.innerHTML = "Ingrédients";
    cardSubTitleIngredients.classList.add("card-subtitle");

    const cardDescription = document.createElement("p");
    cardDescription.innerHTML = `${this._card._description}`;
    cardDescription.classList.add("card-text");

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("flex", "flex-wrap");

    this._card._ingredients.forEach((ingredient) => {
      //li
      const ingredientItem = document.createElement("li");
      ingredientItem.classList.add("li-card");

      //div
      const ingredientItemItemDiv = document.createElement("div");
      const ingredientItemUnitDiv = document.createElement("div");
      const ingredientItemQuantityDiv = document.createElement("div");

      //innerHTML
      ingredientItemUnitDiv.innerHTML = `${ingredient.quantity || ""} ${
        ingredient.unit || ""
      }`;
      ingredientItemUnitDiv.classList.add("ingredients-quantity");

      ingredientItemItemDiv.innerHTML = `${ingredient.ingredient}`;
      ingredientItemItemDiv.classList.add("ingredients-name");

      //append
      ingredientsList.appendChild(ingredientItem);
      ingredientItem.appendChild(ingredientItemItemDiv);
      ingredientItem.appendChild(ingredientItemQuantityDiv);
      ingredientItem.appendChild(ingredientItemUnitDiv);
    });

    cardBubbleDiv.appendChild(cardBubble);
    cardDiv.appendChild(cardBubbleDiv);
    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardSubTitleRecette);
    cardDiv.appendChild(cardDescription);
    cardDiv.appendChild(cardSubTitleIngredients);
    cardDiv.appendChild(ingredientsList);
    cardContainer.appendChild(cardDiv);

    return cardContainer;
  }
}

export { CardTemplate };
