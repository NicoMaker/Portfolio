import { $, load } from "../../shared/dom.js";

export async function initSocial() {
  try {
    const { socialLinks } = await load(
      new URL("./social.json", import.meta.url),
    );
    $("#social").innerHTML = socialLinks
      .map(
        (s) =>
          `<a href="${s.url}" title="${s.title}" aria-label="${s.name}" ${s.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}><img loading="lazy" src="${s.icon}" alt="${s.alt}"></a>`,
      )
      .join("");
  } catch {}
}
