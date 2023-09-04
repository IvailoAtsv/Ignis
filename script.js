
const instagram = document.getElementById('instagram');
const gmail = document.getElementById('gmail');
const whatsapp = document.getElementById('whatsapp')
const title = document.getElementById('coolText')
const slogan = document.getElementById('slogan')
const mainTitle = document.querySelectorAll('.title')
const heroText = document.getElementById('hero-text')
const filters = document.getElementById('filters')

instagram.addEventListener('click', () => {
    window.location.href = 'https://www.instagram.com/ignis_limitless/'
})

whatsapp.addEventListener('click', () => {
    window.location.href = 'https://wa.me/359884760051'
})

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    '',
    "Are you tired of not seeing results?",
    "We can help",
    ''
];

const morphTime = 1;
const cooldownTime = 0.3;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.5) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.5) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}
let isDone = false;
let canContinue = true;
function addText() {
    if (isDone) {
        if (heroText.hasChildNodes(elts.text1)) {
            heroText.removeChild(elts.text1)
        }
        if (heroText.hasChildNodes(elts.text2)) {
            heroText.removeChild(elts.text2)
        }
        if (heroText.hasChildNodes(filters)) {
            heroText.removeChild(filters)
        }
        if (mainTitle) {
            mainTitle.forEach(e => e.classList.replace('hidden', 'pop-in'))
            slogan.classList.replace('hidden', 'pop-in')
        }
    }
}

function animate() {

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }
        doMorph();
    } else {
        doCooldown();
    }
    if (textIndex > (texts.length * 2) - 2) {
        isDone = true
        canContinue = false
    }
    addText()
    if (canContinue) requestAnimationFrame(animate);
}
animate();
