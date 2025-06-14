// استقبل أوامر من Lua لعرض أو إخفاء المنيو
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === "setVisible") {
        const menu = document.getElementById('mainMenu');
        if (menu) {
            menu.style.display = event.data.value ? "block" : "none";
        }
    }
});

// تفعيل التنقل بين التبويبات
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    const currentTabText = document.querySelector('.header-current-tab');
    const pageCounter = document.querySelector('.page-counter');

    tabs.forEach((tab, idx) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(c => c.classList.remove('active'));
            const target = document.getElementById(tab.dataset.tab + "-tab");
            if (target) target.classList.add('active');

            if (currentTabText) {
                currentTabText.textContent = tab.textContent.trim().split('\n')[0].trim().toUpperCase();
            }

            if (pageCounter) {
                pageCounter.textContent = `${idx + 1}/${tabs.length}`;
            }

            // إرسال الحدث إلى Lua (اختياري)
            fetch("https://nui://mod_menu/handle_action", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "clicked_tab", value: tab.dataset.tab })
            });
        });
    });

    if (tabs.length > 0) tabs[0].click();
});
