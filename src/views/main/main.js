import { AbtractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/card-list/card-list";
import { Pagination } from "../../components/pagination/pagination";

export class MainView extends AbtractView {
  state = {
    list: [],
    numFound: 0,
    loading: false,
    searchQuery: undefined,
    page: 1,
    limit: 9,
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Поиск книг");
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }
  async stateHook(path) {
    if (path === "searchQuery" || path === "page") {
      this.state.loading = true;
      const data = await this.loadList(this.state.searchQuery, this.state.page);
      this.state.numFound = data.numFound;
      this.state.loading = false;
      this.state.list = data.docs;
    }
    if (path === "list" || path === "loading") {
      this.render();
    }
  }

  async loadList(q, page) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&page=${page}&limit=${this.state.limit}`
    );
    return res.json();
  }

  render() {
    const main = document.createElement("div");
    main.innerHTML = `
    <h2 class="card-list__title">
            Найдено книг – ${this.state.numFound}
    </h2>
    `;
    main.append(new Search(this.state).render());
    main.append(new CardList(this.appState, this.state).render());
    if (this.state.list.length > 0) {
      main.append(new Pagination(this.state).render());
    }

    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
