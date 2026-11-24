import { $ } from "../../shared/dom/selectors.js";
import { type } from "../../shared/typing/typing.js";
import { LOADER } from "./loader.config.js";

/** Avvia l'animazione del terminale nel loader. */
export const boot = () =>
  type($(LOADER.selectors.terminal), LOADER.bootParts, LOADER.typeSpeed);
