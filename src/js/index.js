require("@babel/polyfill");
import Search from "./model/Search";
import Recipe from "./model/Recipe";
import List from "./model/List";
import Like from "./model/Like";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";
import {
  clearRecipe,
  renderRecipe,
  highlightSelectedRecipe,
} from "./view/recipeView";

/**
 * Web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкласан жорууд
 * - Захиалж байгаа жорын найрлагууд
 */

const state = {};

/**
 * Хайлтын контроллер
 */
const controlSearch = async () => {
  // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
  const query = searchView.getInput();

  if (query) {
    // 2) Шинээр хайлтын обьектыг үүсгэнэ
    state.search = new Search(query);

    // 3) Хайлт хийхэд зориулж дэлгэцийг (UI) бэлтгэнэ
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // 4) Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();

    // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ
    clearLoader();
    if (state.search.result === undefined) alert("Хайлт илэрцгүй!");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.resultPagesDiv.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goto = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, goto);
  }
});

/**
 * Жорын контроллер
 */
const controlRecipe = async () => {
  // 1) URL-аас ID-ийг салгаж
  const id = window.location.hash.replace("#", "");

  if (id) {
    // 2) Жорын моделийг үүсгэж өгнө.
    state.recipe = new Recipe(id);
    // 3) UI дэлгэцийг бэлтгэнэ.
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);
    // 4) Жороо татаж авчирна.
    await state.recipe.getRecipe();
    // 5) Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    // 6) Жороо дэлгэцэнд гаргана
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach((el) =>
  window.addEventListener(el, controlRecipe)
);

window.addEventListener("load", (e) => {
  // Лайкийн моделийг үүсгэнэ
  if (!state.likes) state.likes = new Like();

  // Лайк цэсийг гаргах эсэхийг шийдэх
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());

  // Лайкууп байвал тэдгээрийг цэсэнд нэмж харуулна
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

/**
 * Найрлаганы контроллер
 */

const controlList = () => {
  // Найрлагын моделийг үүсгэнэ
  state.list = new List();
  // Өмнө харагдаж байсан найрлагуудыг дэлгэцнээс зайлуулна
  listView.clearItems();

  // Уг найрлага руу одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ.
  state.recipe.ingredients.forEach((n) => {
    // Тухайн найрлагыг модел руу хийнэ.
    const item = state.list.addItem(n);
    // Тухайн найрлагыг дэлгэцэнд гаргана.
    listView.renderItem(item);
  });
};

/**
 * Like контроллер
 */

const controlLike = () => {
  // 2) Одоо харагдаж байгаа жорын ID-ийг олж авах
  const currentRecipeId = state.recipe.id;
  // 3) Энэ жорыг лайкласан эсэхийг шалгах
  if (state.likes.isLiked(currentRecipeId)) {
    // Лайкалсан бол лайкийг нь болиулна
    state.likes.deleteLike(currentRecipeId);
    // Лайкийн цэснээс устгана
    likesView.deleteLike(currentRecipeId);
    likesView.toggleLikeBtn(false);
  } else {
    // Лайклаагүй бол лайклана
    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    // Лайк цэсэнд оруулах
    likesView.renderLike(newLike);
    likesView.toggleLikeBtn(true);
  }

  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

elements.recipeDiv.addEventListener("click", (el) => {
  if (el.target.matches(".recipe__btn, .recipe__btn *")) {
    controlList();
  } else if (el.target.matches(".recipe__love, .recipe__love *")) {
    controlLike();
  }
});

elements.shoppingList.addEventListener("click", (el) => {
  // Клик хийсэн li элементийн data-itemid аттрибутыг шүүж гаргаж авах
  const id = el.target.closest(".shopping__item").dataset.itemid;
  // Олсон id-тай орцыг моделоос устгах
  state.list.deleteItem(id);
  // Дэлгэцээс ийм ID-тай орцыг олж устгана
  listView.deleteItem(id);
});
