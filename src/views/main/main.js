import { AbtractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";

export class MainView extends AbtractView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.AppStateHook.bind(this));
    this.setTitle("Поиск книг");
  }

  AppStateHook(path) {
    if (path === "favorites") {
      console.log(path);
    }
  }

  render() {
    const main = document.createElement("div");
    main.append(new Search(this.state).render());
    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
