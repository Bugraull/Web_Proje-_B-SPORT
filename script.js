/* ==========================================================================
   1. SAYFA YÜKLENME VE OLAY DİNLEYİCİLERİ 
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('iletisimFormu');
    if (form) {
        form.addEventListener('submit', function(event) {
            console.log("Form gönderildi.");
        });
    }

    window.addEventListener('click', function(event) {
        const modal = document.getElementById("galeriModal");
        if (event.target === modal) {
            window.closeModal();
        }
    });


    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            const modal = document.getElementById("galeriModal");
            if (modal && modal.style.display === "block") {
                window.closeModal();
            }
        }
    });

    const tmInput = document.getElementById("tmInput");
    if (tmInput) {
        tmInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                window.transfermarktYonlendir();
            }
        });
    }
});

/* ==========================================================================
   2. FOTOĞRAF GALERİSİ  FONKSİYONLARI
   ========================================================================== */

window.openModal = function(element) {
    const modal = document.getElementById("galeriModal");
    const modalImg = document.getElementById("buyukResim");
    const captionText = document.getElementById("caption");

    if (!modal || !modalImg) return; 

    modal.style.display = "block";

    const buyukSrc = element.getAttribute("data-buyuk-src");
    modalImg.src = buyukSrc ? buyukSrc : element.src;

    if (captionText) {
        captionText.innerHTML = element.alt;
    }
};

window.closeModal = function() {
    const modal = document.getElementById("galeriModal");
    if (modal) {
        modal.style.display = "none";
    }
};

/* ==========================================================================
   3. TRANSFERMARKT & DIŞ ARAMA FONKSİYONLARI
   ========================================================================== */

window.transfermarktYonlendir = function() {
    const inputElement = document.getElementById("tmInput");
    if (!inputElement) return;

    const oyuncuIsmi = inputElement.value.trim();

    if (oyuncuIsmi === "") {
        alert("Lütfen bir futbolcu adı giriniz!");
        return;
    }

    const aramaUrl = "https://www.transfermarkt.com.tr/schnellsuche/ergebnis/schnellsuche?query=" + encodeURIComponent(oyuncuIsmi);
    
    window.open(aramaUrl, '_blank');
};

/* ==========================================================================
   4. SİTE İÇİ HABER ARAMA FONKSİYONU 
   ========================================================================== */

window.siteIciHaberAra = function() {
    const input = document.getElementById("siteAramaInput");
    if (!input) return;

    const filter = input.value.toLocaleUpperCase('tr-TR');
    const haberListesi = document.getElementById("haberListesi");
    
    if (!haberListesi) return;

    
    const haberKartlari = haberListesi.getElementsByClassName("haberKarti");


    for (let i = 0; i < haberKartlari.length; i++) {
        const kart = haberKartlari[i];
        const baslikEtiketi = kart.getElementsByTagName("h3")[0];

        if (baslikEtiketi) {
            const txtValue = baslikEtiketi.textContent || baslikEtiketi.innerText;

   
            if (txtValue.toLocaleUpperCase('tr-TR').indexOf(filter) > -1) {
                kart.style.display = ""; 
            } else {
                kart.style.display = "none";
            }
        }
    }
};