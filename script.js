
document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!header || !menuBtn || !navMenu) return;

    function closeMenu() {
        menuBtn.classList.remove("active");
        navMenu.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
    }

    menuBtn.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("active");

        menuBtn.classList.toggle("active", isOpen);
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );
    });

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    document.addEventListener("click", function (event) {
        if (!header.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("scroll", function () {
        header.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");
    const submitText = document.getElementById("submitText");

    if (!form || !status || !submitBtn || !submitText) {
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        status.className = "form-status";
        status.textContent = "";

        if (!form.reportValidity()) {
            return;
        }

        const accessKey = form.querySelector(
            'input[name="access_key"]'
        );

        if (
            !accessKey ||
            !accessKey.value.trim() ||
            accessKey.value === "YOUR_ACCESS_KEY_HERE"
        ) {
            status.textContent =
                "Please add your Web3Forms access key first.";
            status.classList.add("error");
            return;
        }

        submitBtn.disabled = true;
        submitText.textContent = "Sending...";

        try {
            const formData = new FormData(form);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json"
                    },
                    body: formData
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Unable to send your message."
                );
            }

            status.textContent =
                "Thank you! Your message was sent successfully.";
            status.classList.add("success");

            form.reset();

        } catch (error) {
            status.textContent =
                error.message ||
                "Something went wrong. Please try again.";
            status.classList.add("error");

        } finally {
            submitBtn.disabled = false;
            submitText.textContent = "Send Message";
        }
    });
});


/* Page Loading Effect */
window.addEventListener("load", function () {
    const loader = document.getElementById("pageLoader");

    if (loader) {
        loader.classList.add("hide");

        setTimeout(function () {
            loader.style.display = "none";
        }, 700);
    }
});


/* Premium Cursor Effect */
document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.getElementById("customCursor");
    const follower = document.getElementById("cursorFollower");

    if (!cursor || !follower) return;

    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener("mousemove", function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";

            cursor.classList.remove("cursor-hidden");
            follower.classList.remove("cursor-hidden");
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            follower.style.left = followerX + "px";
            follower.style.top = followerY + "px";

            requestAnimationFrame(animateFollower);
        }

        animateFollower();

        document.querySelectorAll("a, button, input, textarea").forEach(function (element) {
            element.addEventListener("mouseenter", function () {
                follower.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", function () {
                follower.classList.remove("cursor-hover");
            });
        });

        document.addEventListener("mouseleave", function () {
            cursor.classList.add("cursor-hidden");
            follower.classList.add("cursor-hidden");
        });

        document.addEventListener("mouseenter", function () {
            cursor.classList.remove("cursor-hidden");
            follower.classList.remove("cursor-hidden");
        });
    }
});
