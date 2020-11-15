import { elements } from "./base";

const renderRecipe = (recipe) => {
  const activeClass = "results__link--active";
  const html = `<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
  </li>`;

  elements.resultList.insertAdjacentHTML("beforeend", html);
};

export const clearSearchQuery = () => (elements.searchField.value = "");
export const clearSearchResult = () => {
  elements.resultList.innerHTML = "";
  elements.resultPagesDiv.innerHTML = "";
};

export const getInput = () => elements.searchField.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // Хуудаслалтын товчуудыг гаргаж ирэх
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

// type ==> prev, next
const createButton = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
<span>Хуудас ${page}</span>
</button>`;

const renderButtons = (currentPage, totalPages) => {
  let button;

  if (currentPage === 1 && totalPages > 1) {
    // 1р хуудас дээр байна. 2р хуудас руу шилжих товчийг үзүүл
    button = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    // Өмнөх болон дараачийн хуудас руу шилжих товчуудыг үзүүл
    button = createButton(currentPage - 1, "prev", "left");
    button += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    // Хамгийн сүүлийн хуудас дээр байна. Өмнөх рүү шилжүүлэх товчийг л үзүүл
    button = createButton(currentPage - 1, "prev", "left");
  }

  elements.resultPagesDiv.insertAdjacentHTML("afterbegin", button);
};
