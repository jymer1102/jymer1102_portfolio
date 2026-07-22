// Wires up the light/dark toggle button. The initial theme itself is decided
// by a tiny inline script in <head> (runs before paint to avoid a flash):
// it uses the saved preference if one exists, otherwise the device's
// prefers-color-scheme, otherwise falls back to dark.
(function () {
    function updateIcon(theme) {
        var icon = document.querySelector('#theme-toggle i');
        if (!icon) return;
        icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    function currentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }

    document.addEventListener('DOMContentLoaded', function () {
        updateIcon(currentTheme());

        var btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', function () {
                var next = currentTheme() === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                try { localStorage.setItem('theme', next); } catch (e) {}
                updateIcon(next);
            });
        }

        // If the person hasn't manually chosen a theme, keep following the
        // device's setting live if it changes while the page is open.
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
                var stored;
                try { stored = localStorage.getItem('theme'); } catch (err) { stored = null; }
                if (stored) return;
                var theme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
                updateIcon(theme);
            });
        }
    });
})();
