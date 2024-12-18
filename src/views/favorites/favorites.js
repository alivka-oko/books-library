import { AbtractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { CardList } from "../../components/card-list/card-list";

export class FavoritesView extends AbtractView {
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle("Мои книги");
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  render() {
    const main = document.createElement("div");
    main.innerHTML = `
    <h2 class="card-list__title">
            Избранное
    </h2>
    `;
    main.append(new CardList(this.appState, { list: this.appState.favorites }).render());
    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
