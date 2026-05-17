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

    // ------------- PWA --------------------
    if ('serviceWorker' in navigator) { 
        navigator.serviceWorker.register('./sw.js');
    }
});




// ------------------------- DARK MODE ------------------------------

const toggle = document.getElementById('dark-mode-toggle');
// citamo sistemsku preferenciju iz CSS varijable
const prefersColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--prefers-color')
    .trim()
    .replace(/"/g, '');

const savedTema = localStorage.getItem('tema');

if (savedTema === 'dark') {
        // provjeravamo da li postoji dark tema unutar localStorage
        // provjeravamo  samo dark temu jer je light tema default

        document.body.classList.add('dark');
        toggle.checked = true;

        // dodajemo .dark klasu na body, cime ce se promijeniti --current varijable u css i jos neki dijelovi definisani sa body.dark
        // checkiramo dark mode element, da bi se aktivirao css ikonice u navigaciji
}
else if (savedTema == null && prefersColor == "dark") {
        document.body.classList.add('dark');
        toggle.checked = true;
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



// --------- COUNTER PRINTANJA ------------------

if (document.getElementById("counter")) {
    var startingNum = 10000 + Math.random() * 10000;

    counterNum.textContent = parseInt(startingNum).toLocaleString("en-US");

    setInterval(() => {
        let current = parseInt(counterNum.textContent.replaceAll(',', '')) || 0; //uklanjamo sve zareze unutar broja
        let newNum = parseInt(current + Math.random() * 10); // dodajemo random broj na trenutni count

        counterNum.textContent = newNum.toLocaleString("en-US"); 
        // counter je jednak novom broju, s tim da ga formatiramo tako da  1000 => 1,000
    }, 3000)


}

// ------------------ FILTER I KARTICE ----------------------------
if (document.getElementById("filter")) {

    // definisemo content kartica
    const CARDS = [
        {"img": "./images/zvjerici.jpg", "type": "minifig", "typeName": "Mini figure", "name": "Zvjerići", "desc": "Set od 5 mini životinja u rezoluciji od 0.05mm"},
        {"img": "./images/elbox.jpg", "type": "prototype", "typeName": "Prototip", "name": "Elektronsko kućište", "desc": "Precizno kućište za elektronske komponente"},
        {"img": "./images/gears.png", "type": "industry", "typeName": "Industrijski dijelovi", "name": "Zupčanici", "desc": "Industrijski zupčanici za mašinsku opremu"},
        {"img": "./images/fantasy.jpg", "type": "minifig", "typeName": "Mini figure", "name": "Fantasy karakter", "desc": "Detaljno izmodeliran fantasy lik sa realističnim teksturama"},
        {"img": "./images/maketa.jpg", "type": "arcmodel", "typeName": "Arhitektonski modeli", "name": "Maketa zgrade", "desc": "Detaljna arhitektonska maketa sa svim elementima"},
        {"img": "./images/keychain.webp", "type": "custom", "typeName": "Custom narudžbe", "name": "Custom privjesak", "desc": "Custom dizajn privjeska prema vašim specifikacijama"},
        {"img": "./images/prototype.jpeg", "type": "prototype", "typeName": "Prototip", "name": "Funkcionalni prototip", "desc": "Precizni prototip za testiranje funkcionalnosti proizvoda"},
        
    ]

    var filterItems = document.querySelectorAll(".filter-item");
    var currentFilter = "all";
    const cardsContainer = document.getElementById("cards");

    // uvijek prvo popunimo sve kartice
    fillCards(CARDS);

    const savedFilter = localStorage.getItem('filter');

    // ako postoji sacuvan filter u localStorage 
    if (savedFilter) {
        const savedItem = document.querySelector(`[data-filter="${savedFilter}"]`); //nalazimo filterElement koji odgovara tom filteru
        if (savedItem) {
             filterChange(savedItem)
        }; 
        // ako postoji taj element (a trebo bi postojat :} ) mijenjamo kartice da odgovaraju filteru
    }

    // za svaki filter-item definisemo click i tab->enter ponasanje
    filterItems.forEach(filterElement => {
        // click
        filterElement.addEventListener("click", (e) => {
            filterChange(filterElement);
        })

        // enter (za kad je item focused)
        filterElement.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                filterChange(filterElement);
            }
        })


    });

    // funkcija za filtriranje kartica
    function filterChange(element) {
        localStorage.setItem('filter', element.dataset.filter); // dodajemo filter u localStorage

        filterItems.forEach(el => el.classList.remove("active"))
        element.classList.add("active");
        currentFilter = element.dataset.filter;

        cardsContainer.innerHTML = "";

        if (!((currentFilter) == "all")) {
            fillCards(CARDS.filter(card => card.type === currentFilter));
        }
        else {
            fillCards(CARDS);
        }

        // nakon odabira filtera vracamo korisnika na vrh kartica instantno, smooth izgleda malo lose
        document.getElementById('content').scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    function fillCards(cards) {
        cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.tabIndex = 0;
            cardEl.dataset.type = card.type;
            
            cardEl.innerHTML = `
                <img src="${card.img}" alt="Slika na kartici" class="card-img">
                <div class="card-content">
                    <h6 class="card-type">${card.typeName}</h6>
                    <h5 class="card-name">${card.name}</h5>
                    <p class="card-desc">${card.desc}</p>
                    <button class="card-btn">
                        Pogledaj više
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                            <path d="M247.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L179.2 256 41.9 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                        </svg>
                    </button>
                </div>
            `;
            
            // kartica ostaje fokusirana nakon klika, to popravljamo ovim kodom
            cardEl.addEventListener('click', () => {
                cardEl.blur();
            });

            cardsContainer.appendChild(cardEl);
        })
    }
}

/*------------------------------KONTAKT FORMA-------------------------------------------*/

if (document.getElementById('contact-form')) {

    const form = document.getElementById('contact-form');
    const ime = document.getElementById('ime');
    const prezime = document.getElementById('prezime');
    const email = document.getElementById('email');
    const telefon = document.getElementById('telefon');
    const tema = document.getElementById('tema');
    const poruka = document.getElementById('poruka');

    const imeError = document.getElementById('ime-error');
    const prezimeError = document.getElementById('prezime-error');
    const emailError = document.getElementById('email-error');
    const telefonError = document.getElementById('telefon-error');
    const temaError = document.getElementById('tema-error');
    const porukaError = document.getElementById('poruka-error');

    const successMsg = document.getElementById('success-msg');
    const btnReset = document.getElementById('btn-reset');

    // kada se forma submit-uje klikom na submit button
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // ukidamo reload stranice pri submit-u

        // bool varijable koje nam govore da li su polja OK
        // u definiciji ovih funkcija vracamo true ili false, 
        // u zavisnosti je li polje ispravno na osnovu odredjenih uslova

        const imeOk = validateField(ime, imeError, 'Ime je obavezno');
        const prezimeOk = validateField(prezime, prezimeError, 'Prezime je obavezno');
        const emailOk = validateEmail(email, emailError);
        const telefonOk = validateTelefon(telefon, telefonError);
        const temaOk = validateField(tema, temaError, 'Tema upita je obavezna');
        const porukaOk = validateField(poruka, porukaError, 'Poruka je obavezna');

        if (imeOk && prezimeOk && emailOk && telefonOk && temaOk && porukaOk) {
            // sva polja ispravna -> prikazujemo uspješnu poruku
            successMsg.textContent = `Hvala ${ime.value}! Vaša poruka je uspješno poslana.`;
            form.reset(); // resetamo formu
    }
    });

    // na klik reset buttona
    btnReset.addEventListener('click', function() {
        form.reset(); // resetira citavu formu

        // brise sve error poruke
        imeError.textContent = '';
        prezimeError.textContent = '';
        emailError.textContent = '';
        telefonError.textContent = '';
        temaError.textContent = '';
        porukaError.textContent = '';

        // sklanja error klase sa svih polja
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        // sklanja success poruku
        successMsg.textContent = '';
    });

    //funkcija za validiranje obicnih polja za koja se samo treba provjerit da nisu prazna
    // obicna text polja, textarea i select
    // posto je ova funkcija "univerzalna" moramo proslijediti koja error poruka ce se prikazati
    function validateField(input, errorEl, message) {
        // ako je polje prazno
        if (input.value.trim() === '') {
            errorEl.textContent = message;
            input.parentElement.classList.add('error');
            return false;
        }

        // ako je sve tacno
        errorEl.textContent = '';
        input.parentElement.classList.remove('error');
        return true;

    }

    //funkcija za validiranje emaila
    function validateEmail(input, errorEl) {
        //ako je polje prazno
        if (input.value.trim() === '') {
            errorEl.textContent = 'Email je obavezan';
            input.parentElement.classList.add('error');
            return false;
        }
        
        //klasicni regex za validiranje maila preuzet sa interneta
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
        // ^ - pocetak
        // [\w-\.] znaci bilo koje slovo (\w), - crtica, \. tacka
        // @ - obavezni @ simbol 
        // [\w-]+\. - slicno kao ime maila samo oznacava domenu sa tackama koje se mogu ponavljati (mail.google.)
        // [\w-]{2,4} - ekstenzija od 2 do 4 karaktera (com, ba, org, info)

        // a ovo je oficijalni email regex po RFC 5321 standardu
        const RFCREGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
        // ne znam tacno sta znaci ova citava skalamerija,
        // samo znam da osigurava da email ima @, domenu i ekstenziju, i da podrzava sve ostalo kao
        // IP adrese u uglastim zagradama, specijalne znakove,
        // quoted stringove i sve ostale dozvoljene email formate po RFC 5321 standardu.

        // hvala Claude sto mi je pretvorio ovaj regex u js format
        
        // ako email nije ispravno unesen
        if (!RFCREGEX.test(input.value)) {
            errorEl.textContent = 'Email nije u ispravnom formatu';
            input.parentElement.classList.add('error');
            return false;
        }
        
        // ako je sve tacno
        errorEl.textContent = '';
        input.parentElement.classList.remove('error');
        return true;
    }

    // funkcija za validaciju telefona
    function validateTelefon(input, errorEl) {
        // ako je polje prazno
        if (input.value.trim() === '') {
            errorEl.textContent = 'Telefon je obavezan';
            input.parentElement.classList.add('error');
            return false;
        }

        // Regex za telefon - dozvoljava samo cifre, razmake i crtice
        const telefonRegex = /^[0-9\s\-]+$/;
        // ^ - pocetak
        // [0-9\s\-]+ - jedna ili vise cifara (0-9), razmaka (\s) ili crtica (\-)
        // $ - kraj

        // ako sastav broja nije tacan
        if (!telefonRegex.test(input.value)) {
            errorEl.textContent = 'Telefon može sadržavati samo cifre, razmake i crtice';
            input.parentElement.classList.add('error');
            return false;
        }

        // ako broj ima manje od 6 karaktera
        if (input.value.trim().length < 6) {
            errorEl.textContent = 'Broj telefona mora imati minimalno 6 karaktera';
            input.parentElement.classList.add('error');
            return false;
        }
        
        // ako broj ima vise od 15 karaktera
        if (input.value.trim().length > 15) {
            errorEl.textContent = 'Broj telefona moze imati maksimalno 15 karaktera';
            input.parentElement.classList.add('error');
            return false;
        }

        // ako je sve tacno
        errorEl.textContent = '';
        input.parentElement.classList.remove('error');
        return true;
    }
}

// ------------------ BACK TO TOP -------------------------
if (document.getElementById('back-to-top')) {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // ako korisnik skrola 50px ili vise od vrha back to top button se pojavi
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // kada se button klikne stranica se smoothly skroluje na vrh
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --------------------------------- IMAGE MAP ----------------------------------------------

if (document.getElementById('printer-info')) {
    const printerInfo = document.getElementById('printer-info');
    const printerInfoTitle = document.getElementById('printer-info-title');
    const printerInfoDesc = document.getElementById('printer-info-desc');

    /* definisemo dictionary sa informacijama koje se pojavljuju kada se klikne odredjeni dio mape */ 
    const printerData = {
        nozzle: {
            title: 'Mlaznica',
            desc: 'Vrh kroz koji izlazi rastopljeni filament. Standardni prečnik je 0.4mm što omogućava preciznost do ±0.1mm.'
        },
        printbed: {
            title: 'Ploča za štampanje',
            desc: 'Površina na kojoj se gradi 3D objekt sloj po sloj. Zagrijava se do 60-100°C za bolju adheziju.'
        },
        extruder: {
            title: 'Ekstruder',
            desc: 'Motor koji gura filament prema nozzleu. Direktni extruder omogućava preciznije podavanje materijala.'
        },
        frame: {
            title: 'Okvir',
            desc: 'Konstrukcija printera od aluminijumskih profila. Rigidnost frame-a direktno utiče na kvalitet printa.'
        },
        filament: {
            title: 'Kotur s filamentom',
            desc: 'Kolut materijala za štampu. Standardni prečnik filamenta je 1.75mm sa tolerancijom ±0.03mm.'
        }
    };

    // za svaki area element =>
    document.querySelectorAll('area[data-info]').forEach(area => {
        area.style.cursor = "pointer"; // sklonio sam href sa elementa pa se izgubio cursor, a iz nekog razloga ne dodaje se u css

        // kada se klikne na area
        area.addEventListener('click', (e) => {
            const info = printerData[area.dataset.info]; // uzimamo info iz data-info sekcije
            printerInfoTitle.textContent = info.title;  // stavljamo title iz dictionary
            printerInfoDesc.textContent = info.desc;    // stavljamo desc iz dictionary
            printerInfo.style.display = 'block'; // pravimo info vidljivim

            printerInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            // kad kliknemo nesto na slici skrolamo do objasnjenja
        });
    });


    scaleImageMap();

    function scaleImageMap() {
        const img = document.querySelector('.printer-img');
        const areas = document.querySelectorAll('area[data-info]');
        
        // lista originalnih koordinata
        const originalCoords = [
            [50, 190, 295, 245],
            [50, 425, 215, 480],
            [50, 570, 215, 620],
            [50, 715, 230, 800],
            [1190, 220, 1365, 305]
        ];
        
        function scale() {
            const originalWidth = img.naturalWidth; // originalna sirina slike na disku
            
            if (img.offsetWidth === 0 || img.naturalWidth === 0) return;

            const currentWidth = img.offsetWidth; // trenutna sirina slike u browseru
            const ratio = currentWidth / originalWidth;
            
            areas.forEach((area, i) => {
                // ovdje za svaku klikabilnu area-u na slici nadjemo njene originalne koordinate
                // onda uzmemo i skaliramo svaku koordinatu na osnovu izracunate proporcije
                const coords = originalCoords[i];
                const scaled = coords.map(c => Math.round(c * ratio));
                area.coords = scaled.join(','); // samo spajamo koordinate zarezima x1,y1,x2,y2
            });
        }

        // kada se slika ucita zovemo funkciju scale
        if (img.complete) {
            scale();
            setTimeout(scale, 100);
        } // ako je slika vec ucitana
        
        img.addEventListener('load', scale); //skaliramo koordinate kad se loaduje sajt
        window.addEventListener('resize', scale); //skaliramo koordinate svaki put kad se velicina "browsera" promijeni
        
    }
}





// --------------------------- KALKULATOR --------------------------------

if (document.getElementById('kalk-tezina')) {

    // referenciramo odredjene elemente sa stranice
    const materijal = document.getElementById('kalk-materijal');
    const tezina = document.getElementById('kalk-tezina');
    const cijena = document.getElementById('kalk-cijena');
    const resultTxt = document.querySelector('.kalk-result-txt');

    function izracunaj() {
        const gram = parseFloat(tezina.value); // uzimamo vrijednost tezine u inputima
        const cijenaPer100g = parseFloat(materijal.value); // uzmemo izabranu cijenu iz select inputa

        if (!gram || gram <= 0) {
            // ako je input prazan
            resultTxt.textContent = 'Unesite masu za izračun';  
            cijena.textContent = '';
            return;
        }

        // racunamo ukupnu cijenu i stavljamo je u element sa dodatkom KM
        const ukupno = (gram / 100) * cijenaPer100g;
        resultTxt.textContent = 'Okvirna cijena:';
        cijena.textContent = ukupno.toFixed(2) + ' KM';
    }

    // kada unesemo neku masu
    tezina.addEventListener('input', () => {
        // maksimalna velicina broja je 6 cifara
        if (tezina.value.length > 6) {
            tezina.value = tezina.value.slice(0,6);
        }
        izracunaj(); // zovemo funkciju koja racuna
    });
    materijal.addEventListener('change', izracunaj);
}

// ---------------------- HAMBURGER MENI-----------------------------------

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');

function toggleMenu() {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : ''; 
    // stranica se ne moze skrolat kad je open meni
}

hamburger.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-links a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});