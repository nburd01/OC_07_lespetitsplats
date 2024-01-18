class CardTemplate {
  constructor(card) {
    this._card = card;
  }
  createCard = () => {
    const cardHeader = document.querySelector("#cards-div");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-info");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const imagePath = `src/assets/images/${this._card._image}`;

    // append to link
    const imgElement = document.createElement("img");
    imgElement.src = imagePath;
    imgElement.alt = `${this._card._name}`;

    const cardTitle = document.createElement("p");
    cardTitle.innerHTML = `${this._card._name}`;
    cardTitle.classList.add("card-title");

    const cardDescription = document.createElement("p");
    cardDescription.innerHTML = `${this._card._description}`;
    cardDescription.classList.add("card-description");

    const cardRecipeDiv = document.createElement("div");

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("ingredients-list");

    this._card._ingredients.forEach((ingredient) => {
      const ingredientItem = document.createElement("li");
      ingredientItem.innerHTML = `${ingredient.quantity} ${
        ingredient.unit || ""
      } ${ingredient.ingredient}`;
      ingredientsList.appendChild(ingredientItem);
    });

    // appends
    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardRecipeDiv);
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardDescription);
    cardDiv.appendChild(ingredientsList);
    cardContainer.appendChild(cardDiv);
    cardHeader.appendChild(cardContainer);

    return cardHeader;
  };
}

export { CardTemplate };
