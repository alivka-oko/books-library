import { DivComponent } from "../../common/div-component";
import "./card-list.css";

export class CardList extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
  }

  render() {
    this.el.classList.add("card-list");
    if (this.state.loading) {
      this.el.innerHTML = `
        <h2 class="card-list__title">
               Найдено книг – загрузка...
        </h2>
    `;
      return this.el;
    }

    this.el.innerHTML = `
    <h2 class="card-list__title">
            Найдено книг – ${this.state.list.length}
    </h2>
    `;

    return this.el;
  }
}
