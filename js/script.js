const skiplink = document.getElementById("skiplink");
const skipTooltip = document.getElementById("skiptooltip");

// Ohituslinkkiin kohdistettaessa näytetään tooltip
skiplink.addEventListener("focus", () => {
    skipTooltip.style.display = "inline-block";
});

// Kun ohituslinkin kohdistus poistuu, tooltip piilotetaan
skiplink.addEventListener("blur", () => {
    skipTooltip.style.display = "none";
});

skiplink.addEventListener("click", scrollPage);

// Ohituslinkkiä painettaessa siirrytään sivun main-sisältöön
function scrollPage(event) {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    let targetId = event.target.getAttribute("href");
    let targetElement = document.querySelector(targetId);

    if (targetElement) {
        targetElement.focus({ preventScroll: true });
    };
};

const accessHelpButton = document.getElementById("accesskeyhelp");
const accessSwitchButton = document.getElementById("accesskeyswitch");

// Mahdollistaa pikanäppäinten tilan säilyttämisen vaikka sivua vaihdetaan
let accessKeysSavedStatus = localStorage.getItem("accessKeysEnabled");
let accessKeysEnabled = (accessKeysSavedStatus === null) ? true : (accessKeysSavedStatus === "true");

const logoLink = document.getElementById("logolink");
const indexLink = document.getElementById("indexlink");
const hansLink = document.getElementById("hanslink");
const osaaminenLink = document.getElementById("osaaminenlink");
const saavutettavuusLink = document.getElementById("saavutettavuuslink");

function setAccessKeyOptions() {
    if (accessKeysEnabled) {
        accessSwitchButton.innerText = "Kytke pikanäppäimet pois käytöstä";
        accessHelpButton.setAttribute("accesskey", "p");
        accessSwitchButton.setAttribute("accesskey", "k");
        skiplink.setAttribute("accesskey", "m");
        logoLink.setAttribute("accesskey", "l");
        indexLink.setAttribute("accesskey", "e");
        hansLink.setAttribute("accesskey", "h");
        osaaminenLink.setAttribute("accesskey", "o");
        saavutettavuusLink.setAttribute("accesskey", "s");
    } else if (!accessKeysEnabled) {
        accessSwitchButton.innerText = "Kytke pikanäppäimet käyttöön";
        accessHelpButton.removeAttribute("accesskey");
        skiplink.removeAttribute("accesskey");
        logoLink.removeAttribute("accesskey");
        indexLink.removeAttribute("accesskey");
        hansLink.removeAttribute("accesskey");
        osaaminenLink.removeAttribute("accesskey");
        saavutettavuusLink.removeAttribute("accesskey");
    };
};

// Asetetaan pikanäppäimet käyttöön sivun latautuessa
setAccessKeyOptions();

accessSwitchButton.addEventListener("click", accessSwitchOnOff);

// Painiketta painettaessa vaihdetaan enabled-tila ja
// tallennetaan se selaimen välimuistiin, jotta tila säilyy sivua vaihdettaessa
function accessSwitchOnOff() {
    accessKeysEnabled = !accessKeysEnabled;
    localStorage.setItem("accessKeysEnabled", accessKeysEnabled);
    setAccessKeyOptions();
};

const accessKeyArticle = document.getElementById("accesskeyarticle");
const imgSelfie = document.getElementById("hansmain");
let accessKeyArticleEnabled = false;

accessHelpButton.addEventListener("click", showAccessKeyArticle);

// Pikanäppäinohjeiden tuominen näkyviin ja pois
function showAccessKeyArticle() {    
    if (!accessKeyArticleEnabled) {
        accessKeyArticle.style.display = "block";
        setTimeout(() => {
            imgSelfie.style.display = "none";
            accessKeyArticle.classList.add("visible");
        }, 10);
    } else {
        accessKeyArticle.classList.remove("visible");
        setTimeout(() => {
            if (accessKeyArticleEnabled) {
                accessKeyArticle.style.display = "none";
            }
            imgSelfie.style.display = "block";
        }, 2100);
    };
    accessKeyArticleEnabled = !accessKeyArticleEnabled;
};

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener('mouseleave', () => {
        resetScroll(card);
    });

    card.addEventListener('focusout', () => {
        resetScroll(card);
    });
});

// Kun korteista poistetaan kohdistus, niiden näkymä vieritetään ylös
function resetScroll(card) {
    setTimeout(() => {
        card.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, 1000);
};