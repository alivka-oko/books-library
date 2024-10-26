import { AbtractView } from "../../common/view";

export class MainView extends AbtractView {
  constructor() {
    super();
    this.setTitle("Поиск книг");
  }

  render() {
    const main = document.createElement("div");
    main.innerHTML = "Тест";
    this.app.innerHTML = "";
    this.app.append(main);
  }
}
