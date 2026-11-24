import { $, $$ } from "../../shared/dom/selectors.js";
import { HEADER } from "./header.config.js";
import { initScrollSpy } from "./header.scrollspy.js";
import { initMenu } from "./header.menu.js";

/** Header: scrollspy dei link + menu mobile. */
export function initHeader() {
  const { links, nav, hamburger } = HEADER.selectors;
  initScrollSpy($$(links));
  initMenu($(nav), $(hamburger));
}
