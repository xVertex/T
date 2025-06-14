
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));

        btn.classList.add("active");
        const tab = btn.dataset.tab;
        const content = document.getElementById(tab + "-tab");
        if (content) content.classList.add("active");
    });
});
