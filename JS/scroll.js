document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");

    function updateURLOnScroll() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                history.replaceState(null, null, `#${id}`);
            }
        });
    }

    window.addEventListener("scroll", updateURLOnScroll);
});
