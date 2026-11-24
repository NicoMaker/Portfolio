import { reveal } from "./shared/reveal/reveal.js";
import { boot, hideLoader } from "./components/loader/loader.js";
import {
  initUiComponents,
  initDataComponents,
  initFormComponents,
} from "./components.js";

/* Sequenza di avvio: loader -> UI -> dati -> form -> fine loader */
const bootDone = boot();

initUiComponents();
reveal(document);

await initDataComponents();
initFormComponents();
await hideLoader(bootDone);
