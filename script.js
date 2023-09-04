
const instagram = document.getElementById('instagram');
const gmail = document.getElementById('gmail');
const whatsapp = document.getElementById('whatsapp')
const title = document.getElementById('coolText')
const slogan = document.getElementById('slogan')

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
    "Are",
    "You",
    "Tired",
    "Of",
    "Seeing",
    "No",
    "Results",
    "?",
    "We",
    "Can",
    "Help",
    ''
];

const morphTime = 0.5;
const cooldownTime = 0.1;

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
        document.getElementById('hero-text').removeChild(elts.text1)
        document.getElementById('hero-text').removeChild(elts.text2)
        document.getElementById('hero-text').removeChild(document.getElementById('filters'))
        document.querySelectorAll('.title').forEach(e => e.classList.replace('hidden', 'pop-in'))
        slogan.classList.replace('hidden', 'pop-in')

    }
}

function animate() {
    if (canContinue) requestAnimationFrame(animate);

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
}
animate();
