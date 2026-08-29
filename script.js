/* =====================================================
   NOVA STUDIO
   Main JavaScript
===================================================== */


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


/* ================= CLOSE MENU ================= */

const navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navigationLinks.forEach((link) => {

                link.classList.remove("active");

            });


            const activeLink =
                document.querySelector(
                    `.nav-links a[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    });

});


/* ================= HEADER SCROLL EFFECT ================= */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.background =
            "rgba(8, 11, 18, 0.92)";

    } else {

        header.style.background =
            "rgba(8, 11, 18, 0.75)";

    }

});


/* ================= CURRENT YEAR ================= */

const currentYear =
    new Date().getFullYear();

const footerYear =
    document.querySelector(".footer p");


if (footerYear) {

    footerYear.textContent =
        `© ${currentYear} Nova Studio. All rights reserved.`;

}

// Dynamic Typing Effect for Hero Code Card
const codeElement = document.querySelector('.code-content code');
if (codeElement) {
    const originalText = codeElement.innerText;
    codeElement.innerText = '';
    let i = 0;
    
    function typeCode() {
        if (i < originalText.length) {
            codeElement.innerText += originalText.charAt(i);
            i++;
            setTimeout(typeCode, 30);
        }
    }
    setTimeout(typeCode, 500);
}


