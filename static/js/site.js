window.addEventListener("DOMContentLoaded", async () => {
    const page = document.body.dataset.page;
    document.querySelectorAll("[data-nav]").forEach((link) => {
        if (link.dataset.nav === page) {
            link.classList.add("active");
        }
    });

    const target = document.getElementById("page-content");
    const contentPath = target?.dataset.content;
    if (!target || !contentPath) {
        return;
    }

    marked.use({ mangle: false, headerIds: false });

    try {
        const response = await fetch(contentPath);
        const markdown = await response.text();
        target.innerHTML = marked.parse(markdown);
    } catch (error) {
        target.innerHTML = "<p>Sorry, this page could not be loaded right now.</p>";
        console.error(error);
    }
});
