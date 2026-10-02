// URL default (cadangan jika file txt gagal dimuat)
let adUrl = "https://gymnasiumabc.com/hww5deygf?key=29a16f07f7bdf970427ca2e85e898b97";

// Ambil URL iklan dari file iklan.txt
fetch("iklan.txt")
    .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil file txt");
        return response.text();
    })
    .then(text => {
        const urlDariTxt = text.trim();
        if (urlDariTxt) {
            adUrl = urlDariTxt;
        }
    })
    .catch(err => {
        console.warn("Menggunakan URL fallback:", err);
    });

// Fungsi untuk membuka iklan
function openAd() {
    if (adUrl) {
        window.open(adUrl, "_blank");
    }
}

// ==========================================
// 1. TRIGGER KLIK DI HALAMAN (Popunder / Direct Link)
// ==========================================
// Opsional: ganti 'hasClicked' jika hanya ingin memicu di klik pertama saja
let hasClicked = false;

document.addEventListener("click", function (e) {
    // Membuka iklan saat klik pertama (jika ingin setiap klik, hapus kondisi !hasClicked)
    if (!hasClicked) {
        openAd();
        hasClicked = true;
    }
});

// Jika Anda ingin showPopup() juga membuka URL iklan:
function showPopup() {
    openAd();
}

// ==========================================
// 2. POPUP TIMING & VIDEO TRIGGER
// ==========================================
let halfTriggered = false;
const video = document.querySelector("video");

// First popup trigger
const firstDelay = Math.floor(Math.random() * 8000) + 20000;
setTimeout(function () {
    showPopup();
    startRecurringPopup();
}, firstDelay);

// Recurring popup trigger
function startRecurringPopup() {
    const interval = Math.floor(Math.random() * 60000) + 180000;
    setInterval(function () {
        showPopup();
    }, interval);
}

// 50% duration trigger
if (video) {
    video.addEventListener("timeupdate", function () {
        if (!video.duration) return;
        let progress = video.currentTime / video.duration;
        if (progress >= 0.5 && !halfTriggered) {
            halfTriggered = true;
            showPopup();
        }
    });
}

// ==========================================
// 3. PROTECTION SCRIPT (Anti Copy, Anti Inspect)
// ==========================================

// Disable right click
document.addEventListener("contextmenu", e => e.preventDefault());

// Disable drag
document.addEventListener("dragstart", function (e) { e.preventDefault(); });

// Disable keyboard shortcuts
document.onkeydown = function (e) {
    if (e.ctrlKey && (e.key === "u" || e.key === "c" || e.key === "s" || e.key === "a" || e.key === "i" || e.key === "j")) {
        return false;
    }
    // Block F12
    if (e.key === "F12") { return false; }
};

// Anti iframe
if (window.top !== window.self) {
    window.top.location = window.self.location;
}

// DevTools detector
function detectDevTools() {
    const threshold = 160;
    setInterval(function () {
        if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
            document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:20%'>Access Denied</h1>";
        }
    }, 1000);
}
detectDevTools();














