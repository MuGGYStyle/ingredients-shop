export const elements = {
  searchForm: document.querySelector(".search"),
  searchField: document.querySelector(".search__field"),
  resultList: document.querySelector(".results__list"),
  searchResultDiv: document.querySelector(".results"),
  resultPagesDiv: document.querySelector(".results__pages"),
  recipeDiv: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
  likesMenu: document.querySelector(".likes__field"),
  likesList: document.querySelector(".likes__list"),
};

export const elementStrings = {
  loader: "loader",
};

export const renderLoader = (parent) => {
  const html = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;

  parent.insertAdjacentHTML("afterbegin", html);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
