
document.getElementById("welcome__action-button").onclick = function() {
  document.getElementById("about-section").scrollIntoView();
};

document.querySelectorAll(".cr-menu__link").forEach(link => {
  link.addEventListener("click", function(evt) {
    if (document.querySelector(".cr-nav-menu__toggle").classList.contains("cr-nav-menu__toggle--active")) {
      document.querySelector(".cr-nav-menu__toggle").classList.remove("cr-nav-menu__toggle--active");
      document.querySelector(".ic-toggle-menu").classList.remove("ic-toggle-menu--close");
      document.querySelector(".cr-nav-menu__content").classList.add("cr-nav-menu__content--hidden");
      document.querySelector(".cr-nav-menu__toggle").setAttribute("aria-expanded", false);
      document.querySelector(".cr-nav-menu__content").setAttribute("aria-hidden", true);
    }
    evt.stopPropagation();
  });
});

const matchNavBreakpoint = window.matchMedia("(min-width: 768px)")
      
document.querySelector(".cr-nav-menu__toggle").addEventListener("click", function() {
  document.querySelector(".cr-nav-menu__toggle").classList.toggle("cr-nav-menu__toggle--active");
  document.querySelector(".ic-toggle-menu").classList.toggle("ic-toggle-menu--close");
  document.querySelector(".cr-nav-menu__content").classList.toggle("cr-nav-menu__content--hidden");
  document.querySelector(".cr-nav-menu__toggle").setAttribute("aria-expanded", !document.querySelector(".cr-nav-menu__content").classList.contains("cr-nav-menu__content--hidden"));
  document.querySelector(".cr-nav-menu__content").setAttribute("aria-hidden", document.querySelector(".cr-nav-menu__content").classList.contains("cr-nav-menu__content--hidden"));
});

function updateNavMode(x) {
  document.querySelector(".cr-nav-menu__toggle").classList.toggle("cr-nav-menu__toggle--hidden", x.matches);
  document.querySelector(".cr-nav-menu__toggle").classList.remove("cr-nav-menu__toggle--active");
  document.querySelector(".ic-toggle-menu").classList.remove("ic-toggle-menu--close");
  document.querySelector(".cr-nav-menu__toggle").setAttribute("aria-expanded", x.matches);
  document.querySelector(".cr-nav-menu__content").classList.toggle("cr-nav-menu__content--hidden", !x.matches);
  document.querySelector(".cr-nav-menu__content").setAttribute("aria-hidden", !x.matches);
}

updateNavMode(matchNavBreakpoint);
// Listen for changes to the media query and update the navigation mode accordingly
// matchNavBreakpoint.addListener(updateNavMode) Deprecated;
matchNavBreakpoint.addEventListener("change", updateNavMode);

const storageKey = 'theme-preference';
const onClick = () => {
  theme.value = theme.value === 'light'? 'dark' : 'light';
  setPreference()
};
const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey)
  }
  else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
};
const theme = {
  value: getColorPreference(),
};
const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};
const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value);
  document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value);
  document.querySelector('.cr-brand__logo').src = theme.value === 'dark' ? './assets/img/logo-on-dark.png' : './assets/img/logo-on-light.png';
  document.querySelector('.cr-brand__logo').alt = theme.value === 'dark' ? 'Logo on dark' : 'Logo on light';
};
// set the initial value of the theme based on the system preference or local storage
reflectPreference();
window.onload = () => {
  reflectPreference();
  document.querySelector('#theme-toggle').addEventListener('click', onClick);
}
// listen for changes to the system preference and update the theme accordingly
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches:isDark}) => {
  theme.value = isDark ? 'dark' : 'light';
  setPreference()
});