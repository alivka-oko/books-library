import { DivComponent } from "../../common/div-component";
import "./card.css";

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  render() {
    this.el.classList.add("card");
    const existInFavorites = this.appState.favorites.find(
      (book) => book.key == this.cardState.key
    );
    this.el.innerHTML = `
    <div class="card">
      <div class="card__image">
        <img
          src="https://covers.openlibrary.org/b/olid/${
            this.cardState.cover_edition_key
          }-M.jpg"
          alt="Обложка"
        />
      </div>
      <div class="card__content">
        <span class="card__content-genre">${
          this.cardState.subject ? this.cardState.subject[0] : "Не задано"
        }</span>
        <h3 class="card__content-title">${this.cardState.title}</h3>
        <h4 class="card__content-author">${
          this.cardState.author_name ? this.cardState.author_name.join(", ") : "Не задано"
        }</h4>
        <div class="card__footer">
          <button class="card__button-favorite ${
            existInFavorites ? "button__active" : ""
          }" aria-label="В избранное">
            <img src="${
              existInFavorites ? "static/favorites.svg" : "static/favorite-white.svg"
            }" alt="Иконка избранного" />
          </button>
        </div>
      </div>
    </div>`;
    if (existInFavorites) {
      this.el
        .querySelector("button")
        .addEventListener("click", this.#deleteFromFavorites.bind(this));
    } else {
      this.el
        .querySelector("button")
        .addEventListener("click", this.#addToFavorites.bind(this));
    }

    return this.el;
  }

  #deleteFromFavorites() {
    this.appState.favorites = this.appState.favorites.filter(
      (book) => book.key !== this.cardState.key
    );
  }
  #addToFavorites() {
    this.appState.favorites.push(this.cardState);
  }
}
