import { CardsApi } from "../api/api.js";
import { Card } from "../class/cards.js";

import { CardTemplate } from "../templates/cardList.js";
import { dropDownTemplateAppliances } from "../templates/dropDownTemplateAppliances.js";
import { dropDownTemplateIngredients } from "../templates/dropDownTemplateIngredients.js";
import { dropDownTemplateUstensils } from "../templates/dropDownTemplateUstensils.js";

export class App {
  constructor() {
    this.cardsApi = new CardsApi("/src/data/recipes.json");
    this.cardsSection = document.querySelector(".cards");
    this.searchInput = document.querySelector(".mySearchInput");
    this.faMark = document.querySelector(".fa-solid");
    this.ingredientsDropBtn = document.querySelector(".ingredientsDropBtn");
    this.ustensilsDropBtn = document.querySelector(".ustensilsDropBtn");
    this.appliancesDropBtn = document.querySelector(".appliancesDropBtn");
    this.myDropdownInputIngredients = document.querySelector(
      "#myDropdownInputIngredients"
    );
    this.myDropdownInputAppliances = document.querySelector(
      "#myDropdownInputAppliances"
    );
    this.myDropdownInputUstensils = document.querySelector(
      "#myDropdownInputUstensils"
    );
    this.mySearchInput = document.querySelector("#mySearchInput");
    // this.sortTemplate = new SortTemplate();

    this.appliancesDropdown = document.querySelectorAll(".sortAppliances");
    this.ustensilsDropdown = document.querySelectorAll(".sortUstensils");
    this.ingredientsDropdown = document.getElementById("ingredientsDropdown");
    this.ingredientsGo = document.getElementById("ingredientsGo");
    this.appliancesGo = document.getElementById("appliancesGo");
    this.ustensilsGo = document.getElementById("ustensilsGo");
    this.appliancesDropdown = document.getElementById("appliancesDropdown");
    this.ustensilsDropdown = document.getElementById("ustensilsDropdown");
  }

  async main() {
    const sortTemplate = this.sortTemplate;

    this.faMark.style.display = "none";
    const cardsSection = document.querySelector(".cards");

    // ------------------------
    // Fetch
    // ------------------------

    //Fetch data
    const fetchData = await this.cardsApi.getCards();

    const AllRecipes = new Set(fetchData);

    // ------------------------
    // Normalize
    // ------------------------
    const applianceArray = [];
    const ustensilArray = [];
    const ingredientArray = [];
    AllRecipes.forEach((recipe) => {
      //ingredients
      const _ingredients = recipe.ingredients.map((i) =>
        ingredientArray.push(i.ingredient.toLowerCase())
      );
      //appliance
      const _appliance = recipe.appliance.toLowerCase();
      applianceArray.push(_appliance);
      //ustensils
      const _ustensils = recipe.ustensils.map((i) =>
        ustensilArray.push(i.toLowerCase())
      );
    });
    const uniq_Ingredient = Array.from(new Set(ingredientArray));
    const uniq_Appliance = Array.from(new Set(applianceArray));
    const uniq_Ustensil = Array.from(new Set(ustensilArray));

    // ------------------------

    // tri by 'id'
    const createCards = [...AllRecipes].sort((a, b) => a.id - b.id);

    // ------------------------
    // Initializing cards
    // ------------------------
    function creatingCards() {
      createCards
        .map((card) => new Card(card))
        .forEach((card) => {
          const templateCards = new CardTemplate(card);
          cardsSection.appendChild(templateCards.createCard());
        });
    }
    creatingCards();

    // ------------------------
    // Initializing dropdowns
    // ------------------------
    normalizingData(uniq_Appliance, "appliance");

    normalizingData(uniq_Ingredient, "ingredients");

    normalizingData(uniq_Ustensil, "ustensils");

    //ressort une liste
    function normalizingData(normalizeCardsData, item) {}

    initializeDropdownItems(uniq_Ingredient, uniq_Ustensil, uniq_Appliance);

    function initializeDropdownItems(
      uniq_Appliance,
      uniq_Ingredient,
      uniq_Ustensil
    ) {
      const searchInputDiv = document.createElement("div");
      searchInputDiv.classList.add("myDropdownInputDiv");

      // ------------------------
      // Creation of links
      // ------------------------
      //Initial dropdown render
      uniq_Ingredient.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortIngredients");

        link.textContent =
          element.toLowerCase().charAt(0).toUpperCase() + element.slice(1);
        ingredientsGo.appendChild(link);
      });
      uniq_Ustensil.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortUstensils");

        link.textContent =
          element.toLowerCase().charAt(0).toUpperCase() + element.slice(1);
        ustensilsGo.appendChild(link);
      });
      uniq_Appliance.forEach((element) => {
        const link = document.createElement("a");
        link.classList.add("sortAppliances");

        link.textContent =
          element.toLowerCase().charAt(0).toUpperCase() + element.slice(1);
        appliancesGo.appendChild(link);
      });
    }

    // ------------------------
    // Events
    // ------------------------

    function handleSearchBarInputChange() {
      if (document.querySelector(".mySearchInput").value !== "") {
        document.querySelector(".fa-xmark").style.display = "block";
      } else {
        faMark.style.display = "none";
        searchInput.placeholder = "Rechercher une recette, un ingrédient, ...";
      }
    }

    //MAIN INPUT CHANGE
    this.searchInput.addEventListener("input", (event) => {
      if (event.target.value.length > 3) {
        filterRecipes(fetchData);
      }
      handleSearchBarInputChange();
    });

    // ------------------------
    // MAIN FILTER FUNCTION
    // ------------------------
    function filterRecipes(fetchData) {
      //Query Construction : création d'objets qui contiennent les valeurs search (input), ingredients (array), appliances (array) et ustensils (array)

      const querySearch = {
        search: document.querySelector(".mySearchInput").value,
        ingredients: Array.from(
          document.querySelectorAll(".tag-anchor.ingredientsGo")
        ).map((e) => e.textContent),
        appliances: Array.from(
          document.querySelectorAll(".tag-anchor.appliancesGo")
        ).map((e) => e.textContent),
        ustensils: Array.from(
          document.querySelectorAll(".tag-anchor.ustensilsGo")
        ).map((e) => e.textContent),
      };
      //Creation d'un array results dans lequel on inclue toutes les recettes qui matchent le querySearch
      const filteredRecipes = (() => {
        const results = [];
        //On parcours fetchData
        for (const recipe of fetchData) {
          //on observe si le nom de la recette, la description ou l'ingrédient sont inclus dans la query search
          const hasInName = recipe.name.includes(querySearch.search);
          const hasInDescription = recipe.description.includes(
            querySearch.search
          );
          const hasInIngredient = recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.includes(querySearch.search)
          );
          //on déclare des bouléens
          let hasAllIngredients = true;
          let hasAllAppliances = true;
          let hasAllUstensils = true;
          //condition : si dans querySearch les ingrédients ou les appliances ou les ustensils sont supérieurs à zéro, on observe pour chaque item de fetchData s'il est inclu après le filtre
          if (querySearch.ingredients.length > 0) {
            hasAllIngredients = querySearch.ingredients.every((i) =>
              recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.includes(i)
              )
            );
          }

          if (querySearch.appliances.length > 0) {
            hasAllAppliances = querySearch.appliances.every((i) =>
              recipe.appliance.includes(i)
            );
          }

          if (querySearch.ustensils.length > 0) {
            hasAllUstensils = querySearch.ustensils.every((i) =>
              recipe.ustensils.includes(i)
            );
          }
          //si l'item est inclu dans la recherche et s'il est inclu dans fetchData alors on le push dans results
          if (
            (hasInName || hasInDescription || hasInIngredient) &&
            hasAllIngredients &&
            hasAllAppliances &&
            hasAllUstensils
          ) {
            results.push(recipe);
          }
        }
        return results;
      })();
      //Puis on le display dans les cards et on affiche les éléments pertinents dans les filtres
      displayRecipes(filteredRecipes, querySearch);
      displayFilterList(filteredRecipes);
    }
    filterRecipes(fetchData);

    function displayRecipes(filteredRecipes) {
      cardsSection.innerHTML = "";
      console.log(filteredRecipes.length);
      const recipeCount = document.querySelector(".recipeCount");
      if (filteredRecipes.length < 2) {
        recipeCount.innerHTML = `${filteredRecipes.length}` + " " + "recette";
      } else {
        recipeCount.innerHTML = `${filteredRecipes.length}` + " " + "recettes";
      }

      if (filteredRecipes.length > 0) {
        filteredRecipes
          .map((card) => new Card(card))
          .forEach((card) => {
            const templateCards = new CardTemplate(card);
            cardsSection.appendChild(templateCards.createCard());
          });
      } else {
        const titleElement = document.createElement("h2");
        titleElement.innerHTML = "Aucune recette ne correspond";
        cardsSection.appendChild(titleElement);
      }
    }

    document.querySelector(".fa-xmark").addEventListener("click", () => {
      handleClearInput();
      filterRecipes(fetchData);
    });

    function displayFilterList(filteredRecipes) {
      const sortIngredients = document.getElementById("ingredientsGo");
      const sortAppliances = document.getElementById("appliancesGo");
      const sortUstensils = document.getElementById("ustensilsGo");
      const ingredientsDropdown = document.getElementById(
        "ingredientsDropdown"
      );
      const appliancesDropdown = document.getElementById("appliancesDropdown");
      const ustensilDropdown = document.getElementById("ustensilsDropdown");

      sortIngredients.innerHTML = "";
      sortAppliances.innerHTML = "";
      sortUstensils.innerHTML = "";

      //Ingredients
      filteredRecipes.forEach(
        (recipe) =>
          (recipe._ingredients = recipe.ingredients.map(
            (ingredient) => ingredient.ingredient
          ))
      );

      const ingredientList = new Set();

      filteredRecipes.forEach((recipe) =>
        ingredientList.add(...recipe._ingredients)
      );

      //Appliances
      filteredRecipes.forEach((recipe) => recipe.appliance);

      const applianceList = new Set();

      filteredRecipes.forEach((recipe) => applianceList.add(recipe.appliance));

      //Ustensils
      filteredRecipes.forEach((recipe) =>
        recipe.ustensils.map((ustensil) => ustensil)
      );

      const ustensilList = new Set();

      filteredRecipes.forEach((recipe) =>
        ustensilList.add(...recipe.ustensils)
      );

      filteredRecipes
        .map((card) => new Card(card))
        .forEach((card) => {
          const templateDropDownIngredient = new dropDownTemplateIngredients(
            ingredientList
          );
          ingredientsDropdown.appendChild(
            templateDropDownIngredient.createDropDown()
          );
          //
          const templateDropDownUstensil = new dropDownTemplateUstensils(
            ustensilList
          );
          ustensilDropdown.appendChild(
            templateDropDownUstensil.createDropDown()
          );
          //
          const templateDropDownAppliance = new dropDownTemplateAppliances(
            applianceList
          );
          appliancesDropdown.appendChild(
            templateDropDownAppliance.createDropDown()
          );
        });
    }

    // ------------------------
    // Events
    // ------------------------

    //toggle dropdown hide/show
    this.ingredientsDropBtn.addEventListener("click", () => {
      document.getElementById("ingredientsDropdown").classList.toggle("show");
      const chevronDown = document.querySelector(".ingredientsChevronDown");
      chevronDown.classList.toggle("hide");
      const chevronUp = document.querySelector(".ingredientsChevronUp");
      chevronUp.classList.toggle("hide");
    });

    // Similar logic for other dropdowns
    this.ustensilsDropBtn.addEventListener("click", () => {
      document.getElementById("ustensilsDropdown").classList.toggle("show");
      const chevronDown = document.querySelector(".ustensilsChevronDown");
      chevronDown.classList.toggle("hide");
      const chevronUp = document.querySelector(".ustensilsChevronUp");
      chevronUp.classList.toggle("hide");
    });
    this.appliancesDropBtn.addEventListener("click", () => {
      document.getElementById("appliancesDropdown").classList.toggle("show");
      const chevronDown = document.querySelector(".appliancesChevronDown");
      chevronDown.classList.toggle("hide");
      const chevronUp = document.querySelector(".appliancesChevronUp");
      chevronUp.classList.toggle("hide");
    });
    //
    function handleDropdownHelper(dropdownId, elemId) {
      const dropdown = document.getElementById(dropdownId);
      const elem = document.getElementById(elemId);
      if (dropdownId.classList.contains("show")) {
        const outsideClick = !elemId.contains(event.target);

        if (outsideClick) {
          dropdownId.classList.remove("show");
          toggleChevronsOutsideDropdown(event);
        } else {
          dropdownId.classList.add("show");
        }
      }
    }
    function toggleChevronsOutsideDropdown(event) {
      const dropdowns = document.querySelectorAll(".dropdown");

      dropdowns.forEach(function (dropdown) {
        // Get all dropdown elements
        const dropdowns = document.querySelectorAll(".dropdown");

        // Check if the click target is inside any dropdown
        let isInsideDropdown = false;
        dropdowns.forEach(function (dropdown) {
          if (dropdown.contains(event.target)) {
            isInsideDropdown = true;
          }
        });

        // Toggle chevron visibility based on whether click is inside or outside dropdown
        if (!isInsideDropdown) {
          const chevronUpElements = document.querySelectorAll(".fa-chevron-up");
          const chevronDownElements =
            document.querySelectorAll(".fa-chevron-down");

          chevronUpElements.forEach(function (chevronUp) {
            chevronUp.classList.add("hide");
          });

          chevronDownElements.forEach(function (chevronDown) {
            chevronDown.classList.add("hide");
          });
        }
      });
    }

    //Click outside dropdown to make it disappear
    document.addEventListener("click", function (event) {
      handleDropdownHelper(appliancesDropdown, dropDownAppliances);
      handleDropdownHelper(ustensilsDropdown, dropDownUstensils);
      handleDropdownHelper(ingredientsDropdown, dropDownIngredients);
    });

    //Input inside dropdown
    this.myDropdownInputIngredients.addEventListener("input", () => {
      filterDropdownInputHelper(
        myDropdownInputIngredients,
        ingredientsDropdown
      );
    });
    this.myDropdownInputAppliances.addEventListener("input", () => {
      filterDropdownInputHelper(myDropdownInputAppliances, appliancesDropdown);
    });
    this.myDropdownInputUstensils.addEventListener("input", () => {
      filterDropdownInputHelper(myDropdownInputUstensils, ustensilsDropdown);
    });
    //filter le dropdown on search
    function filterDropdownInputHelper(inputId, dropdownElementId) {
      let dropdownElement;
      let aElement;
      let txtValue;
      var input, filterDropdown, i;
      input = document.getElementById(inputId);
      filterDropdown = inputId.value.toUpperCase();
      dropdownElement = document.getElementById(dropdownElementId);

      aElement = dropdownElementId.getElementsByTagName("a");
      for (i = 0; i < aElement.length; i++) {
        txtValue = aElement[i].textContent || aElement[i].innerText;
        if (txtValue.toUpperCase().indexOf(filterDropdown) > -1) {
          aElement[i].style.display = "";
        } else {
          aElement[i].style.display = "none";
        }
      }
    }
    const tagsArray = [];

    function creatingTagElements(link) {
      const tagsList = document.querySelector(".tagsList");
      //Push to elementArray
      tagsArray.push(link.textContent);
      //Create elements
      const tag = document.createElement("li");
      tag.classList.add("tag-li");
      const tagAnchor = document.createElement("a");
      tagAnchor.classList.add(
        "tag-anchor",
        `${link.parentNode.getAttribute("id")}`
      );
      tagAnchor.textContent = link.textContent;
      tagsList.appendChild(tag);
      tag.appendChild(tagAnchor);
      const tagAnchorClose = document.createElement("i");
      tagAnchorClose.classList.add("fa-solid", "fa-xmark", "closeTag");
      tagAnchor.appendChild(tagAnchorClose);
    }
    function findMatchingElements() {
      let matchingItemLinks = [];
      tagsArray.forEach((element) => {
        matchingItemLinks.push(element);
      });
      return matchingItemLinks;
    }

    function tagClickManagement(fetchData, dropDownClass) {
      const tagsList = document.querySelector(".tagsList");

      const handleTagClick = (link) => {
        creatingTagElements(link);
        const matchingItemLinks = findMatchingElements();
        filterRecipes(fetchData);
      };
      // mettre event sur ingredientsDropdown
      const closeTagClick = (event) => {
        if (event.target.classList.contains("closeTag")) {
          const clickedTagText = event.target.parentElement.textContent.trim();
          const index = tagsArray.indexOf(clickedTagText);
          tagsArray.splice(index, 1);
          event.target.closest("li").remove();
          const matchingItemLinks = findMatchingElements();

          filterRecipes(fetchData);
        }
      };
      const ingredientsDropdown = document.getElementById(dropDownClass);
      ingredientsDropdown.addEventListener("click", (event) => {
        const target = event.target;

        if (
          target.classList.contains("sortIngredients") ||
          target.classList.contains("sortAppliances") ||
          target.classList.contains("sortUstensils")
        ) {
          handleTagClick(target);
        }
      });

      tagsList.addEventListener("click", closeTagClick);
    }
    tagClickManagement(fetchData, "ingredientsDropdown", "sortIngredients");
    tagClickManagement(fetchData, "appliancesDropdown", "sortAppliances");
    tagClickManagement(fetchData, "ustensilsDropdown", "sortUstensils");
    function handleClearInput() {
      var ustensilsGoDropdown = document.getElementById("ustensilsGo");
      while (ustensilsGoDropdown.firstChild) {
        ustensilsGoDropdown.removeChild(ustensilsGoDropdown.firstChild);
      }
      var appliancesGoDropdown = document.getElementById("appliancesGo");
      while (appliancesGoDropdown.firstChild) {
        appliancesGoDropdown.removeChild(appliancesGoDropdown.firstChild);
      }
      var ingredientsGoDropdown = document.getElementById("ingredientsGo");
      while (ingredientsGoDropdown.firstChild) {
        ingredientsGoDropdown.removeChild(ingredientsGoDropdown.firstChild);
      }
      document.querySelector(".mySearchInput").value = "";
      document.querySelector(".fa-xmark").style.display = "none";
      document.querySelector("#mySearchInput").placeholder =
        "Rechercher une recette, un ingrédient, ...";
    }
  }
}

const initApp = async () => {
  const app = new App();
  app.main();
};

initApp();
