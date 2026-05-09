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

if (localStorage.getItem('tema') === 'dark') {
        // provjeravamo da li postoji dark tema unutar localStorage
        // provjeravamo  samo dark temu jer je light tema default

        document.body.classList.add('dark');
        toggle.checked = true;

        // dodajemo .dark klasu na body, cime ce se promijeniti --current varijable u css i jos neki dijelovi definisani sa body.dark
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

// default tipka za checkbox je space, ali obicno se koristi tipka enter prilikom navigacije sa tab tipkom, odnosno preko fokusiranja elemenata
// ovim dijelom koda efektivno simuliramo klik space dugmeta kada kliknemo enter
toggle.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        toggle.checked = !toggle.checked;
        toggle.dispatchEvent(new Event('change'));

        // dispatchEvent funkcija okida event na elementu, kao da je to korisnik sam uradio, time uspjesno simuliramo space tipku na checkbox
    }
})