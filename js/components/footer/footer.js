import { $ } from "../../shared/dom/selectors.js";
import { FOOTER } from "./footer.config.js";
import { currentYear } from "./footer.year.js";

/** Footer: scrive l'anno corrente nel copyright. */
export const initFooter = () =>
  ($(FOOTER.yearSelector).textContent = currentYear());
