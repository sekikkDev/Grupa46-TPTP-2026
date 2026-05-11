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
