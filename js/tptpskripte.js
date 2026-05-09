//dark mode toggle ostaje fokusiran nakon klika, da bi se toga rijesili dodajemo ovo

document.querySelector('.dark-mode-label').addEventListener('click', () => {
    document.getElementById('dark-mode-toggle').blur();
});

// isto tako i github logo

document.querySelector('.github-btn').addEventListener('click', () => {
    document.querySelector('.github-link').blur();
});

// ------------------ LOADER ------------------------

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');

    // kada se stranica loaduje skrivamo loader
});


// ------------------------- DARK MODE ------------------------------

const toggle = document.getElementById('dark-mode-toggle');

// pri ucitavanju stranice provjeravamo da li vec postoji neka tema u localStorage
if (localStorage.getItem('tema') === 'dark') {
        // provjeravamo samo dark temu jer je light tema default
        document.body.classList.add('dark');
        toggle.checked = true;

        // dodajemo .dark klasu na body, cime se se promijeniti --current varijable u css i jos neki dijelovi definisani sa body.dark
        // checkiramo dark mode element, da bi se aktivirao css ikonice u navigaciji
}

toggle.addEventListener('change', () => {
    // kada kliknemo na dark mode btn
    // na body element dodajemo klasu .dark (objasnjeno u proslom komentaru ↑)
    document.body.classList.toggle('dark', toggle.checked);
    
    // sacuvamo odabir u local storage na osnovu toga da li je toggle checkiran ili ne
    // DA = dark ; NE = light
    localStorage.setItem('tema', toggle.checked ? 'dark' : 'light');
});