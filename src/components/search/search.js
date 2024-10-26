import { DivComponent } from "../../common/div-component";
import "./search.css";

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  render() {
    this.el.classList.add("search");
    this.el.innerHTML = `
        <div class="search__wrapper">
            <img src="/static/search.svg" class="search__icon" alt="Иконка поиска"/>
            <input type="text" placeholder = "Найти книгу или автора...."
            class="search__input"  value="${
              this.state.searchQuery ? this.state.searchQuery : ""
            }"/>         
        </div>
        <button class="search__button">
            <img src="/static/search-white.svg" aria-label="Искать" alt="Иконка поиска"/>       
        </button>
    `;
    return this.el;
  }
}
