import { reveal } from "./shared/reveal.js";
import { boot, hideLoader, initLogoReplay } from "./components/loader/loader.js";
import { initHeader } from "./components/header/header.js";
import { initScrollProgress } from "./components/scroll-progress/scroll-progress.js";
import { initBackToTop } from "./components/back-to-top/back-to-top.js";
import { initFooter } from "./components/footer/footer.js";
import { initHero } from "./components/hero/hero.js";
import { initCurriculum } from "./components/curriculum/curriculum.js";
import { initSocial } from "./components/social/social.js";
import { initContatti } from "./components/contatti/contatti.js";

const bootDone = boot();

initHeader();
initScrollProgress();
initBackToTop();
initFooter();
initLogoReplay();
reveal(document);

await Promise.allSettled([initHero(), initCurriculum(), initSocial()]);
initContatti();
await hideLoader(bootDone);
