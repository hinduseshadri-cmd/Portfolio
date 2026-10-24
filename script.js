
// ==============================
// 1. MOBILE NAVIGATION
// ==============================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
    if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMenu();
    }
});

// ==============================
// 2. SCROLL REVEAL ANIMATIONS
// ==============================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// ==============================
// 3. ACTIVE NAVIGATION LINK
// ==============================
const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const sectionId = entry.target.id;

                navItems.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${sectionId}`;

                    link.classList.toggle("active", isActive);

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

// ==============================
// 4. BACK TO TOP BUTTON
// ==============================
const backToTop = document.getElementById("back-to-top");

window.addEventListener(
    "scroll",
    () => {
        backToTop.classList.toggle("show", window.scrollY > 450);
    },
    { passive: true }
);

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth"
    });
});

// ==============================
// 5. AUTOMATIC COPYRIGHT YEAR
// ==============================
document.getElementById("current-year").textContent =
    new Date().getFullYear();
