//events
// on doit analyser le dom à chaque fois qu'il y a nu input change
//dans updateRecipe
const filterRecipes = AllRecipes.filter(recipe => {
    recipe.title.includes(query.search) ||
    query.ingredients.every(ingr => recipe.ingredients.includes(ingr) ||
    ...
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
