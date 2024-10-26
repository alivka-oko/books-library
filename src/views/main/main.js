import { AbtractView } from "../../common/view";
import onChange from "on-change";

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
    main.innerHTML = `Число книг: ${this.appState.favorites.length}`;
    this.app.innerHTML = "";
    this.app.append(main);
    this.appState.favorites.push("123");
  }
}
