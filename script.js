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
/* ===== PRACTICE CARD ===== */
.papers-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    padding: 20px 0;
}

.practice-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 2px solid transparent;
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, border-color 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.practice-card:hover {
    transform: translateY(-4px);
    border-color: #111;
}

/* --- Header (Paper # va ikonka) --- */
.practice-card .card-header {
    display: flex;
    align-items: center;
    gap: 14px;
}

.practice-card .card-icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: #f3f4f6;
    border-radius: 10px;
    flex-shrink: 0;
}

.practice-card .card-icon-box svg {
    width: 24px;
    height: 24px;
    color: #1f2937;
}

.practice-card .card-title {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
}

/* --- Badge qatori --- */
.practice-card .card-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 14px 0 10px;
}

.practice-card .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    border: 1px solid transparent;
}

.practice-card .badge-version {
    background: linear-gradient(to right, #eff6ff, #eef2ff);
    border-color: rgba(59, 130, 246, 0.2);
    color: #1d4ed8;
}

.practice-card .badge-version .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3b82f6;
}

.practice-card .badge-type {
    background: #f3f4f6;
    border-color: rgba(209, 213, 219, 0.7);
    color: #374151;
}

.practice-card .badge-type svg {
    width: 16px;
    height: 16px;
}

/* --- Statistika (2 ta karta) --- */
.practice-card .card-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 16px 0;
}

.practice-card .stat-box {
    background: #f9fafb;
    border: 1px solid rgba(229, 231, 235, 0.8);
    border-radius: 10px;
    padding: 12px;
}

.practice-card .stat-label {
    font-size: 13px;
    color: #6b7280;
    margin: 0 0 4px;
}

.practice-card .stat-value {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin: 0;
}

/* --- Tugmalar --- */
.practice-card .card-actions {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.practice-card .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, opacity 0.2s ease;
    border: none;
    font-family: inherit;
}

.practice-card .btn svg {
    width: 16px;
    height: 16px;
}

.practice-card .btn-primary {
    background: #000;
    color: #fff;
}

.practice-card .btn-primary:hover {
    background: #1f2937;
}

.practice-card .btn-outline {
    background: #fff;
    color: #111;
    border: 1px solid #d1d5db;
    font-weight: 500;
}

.practice-card .btn-outline:hover {
    background: #f9fafb;
}

/* --- Dark mode (ixtiyoriy) --- */
@media (prefers-color-scheme: dark) {
    .practice-card {
        background: #1f2937;
    }
    .practice-card .card-title,
    .practice-card .stat-value {
        color: #f9fafb;
    }
    .practice-card .card-icon-box {
        background: #374151;
    }
    .practice-card .card-icon-box svg {
        color: #e5e7eb;
    }
    .practice-card .badge-type {
        background: #374151;
        color: #d1d5db;
    }
    .practice-card .stat-box {
        background: #111827;
        border-color: #374151;
    }
    .practice-card .stat-label {
        color: #9ca3af;
    }
    .practice-card .btn-primary {
        background: #fff;
        color: #000;
    }
    .practice-card .btn-outline {
        background: #1f2937;
        color: #f9fafb;
        border-color: #4b5563;
    }
}
