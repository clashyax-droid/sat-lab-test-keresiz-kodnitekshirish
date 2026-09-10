/* SIDEBAR */

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});


/* NAVIGATION */

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

function showPage(target){

  navItems.forEach(item => {
    item.classList.toggle(
      "active",
      item.getAttribute("data-page") === target
    );
  });

  pages.forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById("page-" + target).classList.add("active");
}

navItems.forEach(item => {

  item.addEventListener("click", () => {

    const target = item.getAttribute("data-page");

    showPage(target);

  });

});


/* PRACTICE BUTTON */

document.getElementById("practiceBtn").addEventListener("click", () => {
  showPage("practice");
});


/* VALUES */

const values = {
  rwM1:14,
  rwM2:14,
  mathM1:11,
  mathM2:11
};


/* ELEMENTS */

const ranges = {
  rwM1:document.getElementById("rwM1Range"),
  rwM2:document.getElementById("rwM2Range"),
  mathM1:document.getElementById("mathM1Range"),
  mathM2:document.getElementById("mathM2Range")
};


/* COUNTER BUTTONS */

document.querySelectorAll(".counter-btn").forEach(button => {

  button.addEventListener("click", () => {

    const target = button.getAttribute("data-target");
    const change = Number(button.getAttribute("data-change"));

    let value = values[target] + change;

    const max = target.startsWith("rw") ? 27 : 22;

    value = Math.max(0, Math.min(max, value));

    values[target] = value;

    ranges[target].value = value;

    updateScores();

  });

});


/* SLIDERS */

Object.keys(ranges).forEach(key => {

  ranges[key].addEventListener("input", () => {

    values[key] = Number(ranges[key].value);

    updateScores();

  });

});


/* SCORE CALCULATION */

function calculateSection(m1, max1, m2, max2){

  const firstPercentage = m1 / max1;

  const hard = firstPercentage >= 0.70;

  let weighted;

  if(hard){

    weighted =
      (m1 / max1) * 0.42 +
      (m2 / max2) * 0.58;

  }else{

    weighted =
      (m1 / max1) * 0.58 +
      (m2 / max2) * 0.42;

  }

  let score = 200 + weighted * 600;

  score = Math.round(score / 10) * 10;

  score = Math.max(200, Math.min(800, score));

  return {
    score:score,
    hard:hard
  };

}


/* UPDATE SCORES */

function updateScores(){

  const rw1 = values.rwM1;
  const rw2 = values.rwM2;

  const math1 = values.mathM1;
  const math2 = values.mathM2;


  /* RW */

  document.getElementById("rwM1Big").textContent = rw1;
  document.getElementById("rwM2Big").textContent = rw2;

  document.getElementById("rwM1Label").textContent =
    rw1 + " / 27";

  document.getElementById("rwM2Label").textContent =
    rw2 + " / 27";


  /* MATH */

  document.getElementById("mathM1Big").textContent = math1;
  document.getElementById("mathM2Big").textContent = math2;

  document.getElementById("mathM1Label").textContent =
    math1 + " / 22";

  document.getElementById("mathM2Label").textContent =
    math2 + " / 22";


  /* SCORE */

  const rw = calculateSection(rw1,27,rw2,27);
  const math = calculateSection(math1,22,math2,22);

  const total = rw.score + math.score;


  /* DISPLAY */

  document.getElementById("rwScore").textContent = rw.score;
  document.getElementById("mathScore").textContent = math.score;
  document.getElementById("totalScore").textContent = total;


  /* RW ADAPTIVE */

  const rwBadge = document.getElementById("rwRouteBadge");
  const rwRoute = document.getElementById("rwRouteText");

  if(rw.hard){

    rwBadge.textContent = "HARD";
    rwRoute.textContent = "Module 2 → Hard";

  }else{

    rwBadge.textContent = "STANDARD";
    rwRoute.textContent = "Module 2 → Standard";

  }


  /* MATH ADAPTIVE */

  const mathBadge = document.getElementById("mathRouteBadge");
  const mathRoute = document.getElementById("mathRouteText");

  if(math.hard){

    mathBadge.textContent = "HARD";
    mathRoute.textContent = "Module 2 → Hard";

  }else{

    mathBadge.textContent = "STANDARD";
    mathRoute.textContent = "Module 2 → Standard";

  }


  /* SCORE MESSAGE */

  const overallCard = document.getElementById("overallCard");
  const message = document.getElementById("scoreMessage");

  overallCard.classList.remove("dice-on");

  if(total >= 1400){

    overallCard.classList.add("dice-on");

    message.textContent =
      "Amazing! 1400+ — excellent work!";

  }
  else if(total >= 1200){

    message.textContent =
      "Great! 1200+ — keep pushing for 1400!";

  }
  else if(total >= 1000){

    message.textContent =
      "Good start — keep practicing!";

  }
  else{

    message.textContent =
      "Keep practicing — you can improve.";

  }

}


/* INITIAL */

updateScores();
// ============================================================
// PRACTICE #1 — Test kartasi (sinov uchun, ichi bo'sh)
// ============================================================

// Practice ma'lumotlari (keyinchalik to'ldirasiz)
const practiceData = [
    {
        id: "practice-1",
        paperNumber: 87,          // Paper #87
        version: "Medium",        // Version Medium
        type: "Practice Test",    // Practice Test badge
        peopleTook: 731,          // People took: 731
        lastScore: "Not taken",   // Your last score
    }
];

// SVG ikonkalar (inline)
const icons = {
    document: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    book: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
    play: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M10 8l6 4-6 4V8z"/></svg>`,
    chat: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`
};

// Bitta karta HTML ini yaratish
function createPracticeCard(data) {
    const card = document.createElement("div");
    card.className = "practice-card";
    card.id = data.id;

    card.innerHTML = `
        <!-- Header -->
        <div class="card-header">
            <div class="card-icon-box">${icons.document}</div>
            <div class="card-title">Paper #${data.paperNumber}</div>
        </div>

        <!-- Badges -->
        <div class="card-badges">
            <div class="badge badge-version">
                <span class="dot"></span>
                <span>Version ${data.version}</span>
            </div>
            <div class="badge badge-type">
                ${icons.book}
                <span>${data.type}</span>
            </div>
        </div>

        <!-- Stats -->
        <div class="card-stats">
            <div class="stat-box">
                <p class="stat-label">People took</p>
                <p class="stat-value">${data.peopleTook}</p>
            </div>
            <div class="stat-box">
                <p class="stat-label">Your last score</p>
                <p class="stat-value">${data.lastScore}</p>
            </div>
        </div>

        <!-- Actions -->
        <div class="card-actions">
            <button class="btn btn-primary" onclick="startPractice('${data.id}')">
                ${icons.play}
                <span>Start Test</span>
            </button>
            <button class="btn btn-outline" onclick="discussPractice('${data.id}')">
                ${icons.chat}
                <span>Discuss</span>
            </button>
        </div>
    `;

    return card;
}

// Kartalarni sahifaga qo'shish
function renderPracticeCards() {
    const container = document.getElementById("papersContainer");
    if (!container) {
        console.warn("papersContainer topilmadi!");
        return;
    }

    container.innerHTML = ""; // tozalash
    practiceData.forEach(item => {
        container.appendChild(createPracticeCard(item));
    });
}

// Start Test bosilganda
function startPractice(id) {
    console.log("Start Test bosildi:", id);
    // Bu yerga keyinchalik testni boshlash kodini yozasiz
    alert("Practice #1 boshlanmoqda... (hozircha bo'sh)");
}

// Discuss bosilganda
function discussPractice(id) {
    console.log("Discuss bosildi:", id);
    // Bu yerga keyinchalik discuss sahifasiga o'tish kodini yozasiz
    alert("Discuss: " + id);
}

// Sahifa yuklanganda ishga tushirish
document.addEventListener("DOMContentLoaded", renderPracticeCards);
