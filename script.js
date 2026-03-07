const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const yearNode = document.querySelector("#year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

document.querySelectorAll(".brand-logo").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.display = "none";
    const fallback = img.nextElementSibling;
    if (fallback && fallback.classList.contains("brand-fallback")) {
      fallback.style.display = "inline-flex";
    }
  });
});

document.querySelectorAll(".product-media").forEach((img) => {
  img.addEventListener("error", () => {
    img.classList.add("is-hidden");
    const fallback = img.previousElementSibling;
    if (fallback && fallback.classList.contains("product-media-fallback")) {
      fallback.classList.add("show");
    }
  });
});

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const organization = String(formData.get("organization") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(
      `Genetikode website inquiry${name ? ` - ${name}` : ""}`
    );

    const bodyLines = [
      `Name: ${name || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      `Organization: ${organization || "Not provided"}`,
      "",
      "Message:",
      message || "Not provided",
    ];

    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailtoURL = `mailto:info@genetikode.com?subject=${subject}&body=${body}`;

    const statusNode = contactForm.querySelector(".form-status");
    if (statusNode) {
      statusNode.textContent = "Opening your email client to send this message.";
    }

    window.location.href = mailtoURL;
  });
}
