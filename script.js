// Show/hide the menu based on message from Lua
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === "setVisible") {
        const menu = document.getElementById('mainMenu');
        if (menu) {
            menu.style.display = event.data.value ? "block" : "none";
        }
    }
});

// General tab switch functionality
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.dataset.tab + "-tab";
            contents.forEach(c => {
                c.style.display = c.id === target ? 'block' : 'none';
            });

            fetch("https://nui://mod_menu/handle_action", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "clicked_tab", value: tab.dataset.tab })
            });
        });
    });

    // Example button bindings — modify to match actual in-game functionality
    const bindActions = {
        "repair-btn": "repair_vehicle",
        "godmode-btn": "toggle_player_godmode",
        "armor-btn": "set_player_armor",
        "health-btn": "set_player_health",
        "weapons-btn": "give_all_weapons"
    };

    for (const id in bindActions) {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("click", () => {
                fetch("https://nui://mod_menu/" + bindActions[id], { method: "POST" });
            });
        }
    }
});
