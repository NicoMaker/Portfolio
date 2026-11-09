import { $ } from "../../shared/dom.js";

export const initFooter = () => ($("#year").textContent = new Date().getFullYear());
