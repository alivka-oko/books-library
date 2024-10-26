import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import "./card-list.css";

export class CardList extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
  }

  render() {
    this.el.classList.add("main_content");
    if (this.state.loading) {
      this.el.innerHTML = `
        <h3 class="card-loading">
               загрузка...
        </h3>
    `;
      return this.el;
    }

    const cartGrid = document.createElement("div");
    cartGrid.classList.add("card_grid");
    this.el.append(cartGrid);
    for (const card of this.state.list) {
      cartGrid.append(new Card(this.appState, card).render());
    }

    return this.el;
  }
}
