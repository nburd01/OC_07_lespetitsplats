//events
// on doit analyser le dom à chaque fois qu'il y a nu input change
//dans updateRecipe
const filterRecipes = AllRecipes.filter(recipe => {
    recipe.title.includes(query.search) ||
    query.ingredients.every(ingr => recipe.ingredients.includes(ingr)) ||

  })


updateRecipe{
    const querySearch = {
        search: document.querySelector('.searchbar').value,
        ingredients: document.querySelectorAll(.tag-ingredients'),
        appliances: document.querySelectorAll(.tag-appliances'),
        ustensils: document.querySelectorAll(.tag-ustensils'),
      }
      Array.from(document.querySelectorAll('.tag-ingredients')).map(e => e.textContent)
}





displayRecipes(filterRecipes){
  ...
}


function filterRecipes(AllRecipes) {
  const querySearch = {
    search: document.querySelector(".mySearchInput").value,
    ingredients: Array.from(
      document.querySelectorAll(".sortIngredients")
    ).map((e) => e.textContent),
    appliances: Array.from(
      document.querySelectorAll(".sortAppliances")
    ).map((e) => e.textContent),
    ustensils: Array.from(document.querySelectorAll(".sortUstensils")).map(
      (e) => e.textContent
    ),
  };
  console.log(querySearch.ingredients);
  console.log(querySearch.appliances);
  console.log(querySearch.ustensils);
  // console.log(document.querySelectorAll(".tag-anchor")[0].innerText);
  // if (querySearch !== undefined) {
  const filteredRecipes = AllRecipes.filter((recipe) => {
    if (recipe.name.includes(querySearch.search)) {
      return recipe.name;
    }
    if (recipe.appliance.includes(querySearch.search)) {
      return recipe.appliance;
    }

    const matchingIngredients = recipe.ingredients
      .filter((ingredient) =>
        ingredient.ingredient.includes(querySearch.search)
      )
      .map((matchingIngredient) => matchingIngredient.ingredient);

    if (matchingIngredients.length > 0) {
      return true;
    }

    return false;
  });

  displayRecipes(filteredRecipes);
  // }
}