
// استقبل رسالة من Lua للتحكم بالظهور
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === "setVisible") {
        const menu = document.getElementById('mainMenu');
        menu.style.display = event.data.value ? "block" : "none";
    }
});

// إرسال أوامر عند الضغط (مثال فقط للتجربة)
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        fetch("https://nui://mod_menu/handle_action", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "clicked_tab", value: btn.dataset.tab })
        });
    });
});

// مثال على زر مخصص لتفعيل صلاحيات مثل إصلاح السيارة
document.addEventListener("DOMContentLoaded", () => {
    const repairBtn = document.getElementById("repair-btn");
    if (repairBtn) {
        repairBtn.addEventListener("click", () => {
            fetch("https://nui://mod_menu/repair_vehicle", { method: "POST" });
        });
    }
});
