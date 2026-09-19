const topics = {
  probability: { label: "Probability & Statistics", short: "Probability", color: "#0d9488" },
  pnc: { label: "Permutations & Combinations", short: "P&C", color: "#4f6bff" },
  stw: { label: "Speed · Time · Work", short: "STW", color: "#f97316" },
  ml: { label: "Machine Learning", short: "Machine Learning", color: "#a855f7" }
};

const officialPapers = {
  label: "GATE official question-paper archive",
  url: "https://gate2025.iitr.ac.in/question-papers.html"
};
const practice = {
  pnc: { label: "P&C practice (IndiaBix)", url: "https://www.indiabix.com/aptitude/permutation-and-combination/" },
  probability: { label: "Probability practice (IndiaBix)", url: "https://www.indiabix.com/aptitude/probability/" },
  stw: { label: "Time, speed & work practice (IndiaBix)", url: "https://www.indiabix.com/aptitude/time-and-distance/" },
  ml: { label: "GATE DA practice archive (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/gate/gate-previous-year-question-paper/" }
};
const videos = {
  pnc: { label: "Khan Academy · counting (playlist)", url: "https://www.khanacademy.org/math/statistics-probability/counting-permutations-and-combinations" },
  probability: { label: "StatQuest · statistics fundamentals", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" },
  stw: { label: "Khan Academy · rates and proportions", url: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic" },
  ml: { label: "Andrew Ng · Machine Learning (Coursera)", url: "https://www.coursera.org/specializations/machine-learning-introduction" }
};

// Each day deliberately interleaves a main topic, a short secondary revision,
// and a mixed PYQ block. Links are archives/practice pages, not invented paper claims.
const plan = [
  { main: "P&C: addition and multiplication rules; factorial notation", secondary: "Probability: sample spaces and events", topic: "pnc" },
  { main: "Probability: conditional probability, partitions, Bayes’ theorem", secondary: "P&C: nPr and nCr identities", topic: "probability" },
  { main: "STW: unit conversion, distance = speed × time, average speed", secondary: "ML: features, labels, train/validation/test split", topic: "stw" },
  { main: "ML: supervised vs unsupervised learning; loss and objective functions", secondary: "Probability: independence and total probability", topic: "ml" },
  { main: "P&C: permutations with repeated objects and circular arrangements", secondary: "STW: relative speed and trains", topic: "pnc" },
  { main: "Probability: discrete random variables; PMF, CDF, expectation", secondary: "ML: linear regression vocabulary", topic: "probability" },
  { main: "STW: work-rate model, efficiency, LCM method", secondary: "P&C: combinations and selections", topic: "stw" },
  { main: "ML: linear regression, MSE, gradient descent and normal equation intuition", secondary: "Probability: variance and linearity of expectation", topic: "ml" },
  { main: "P&C: distributions, stars and bars, inclusion–exclusion", secondary: "STW: pipes, cisterns and partial work", topic: "pnc" },
  { main: "Probability: Bernoulli, binomial and geometric distributions", secondary: "ML: logistic regression and sigmoid", topic: "probability" },
  { main: "STW: combined work, wages and alternate-day work", secondary: "P&C: derangements and complementary counting", topic: "stw" },
  { main: "ML: logistic regression, log loss, regularisation and decision boundary", secondary: "Probability: Poisson distribution", topic: "ml" },
  { main: "P&C: mixed counting with constraints and casework", secondary: "STW: relative speed, races and boats", topic: "pnc" },
  { main: "Probability: uniform, exponential and normal distributions; z-score", secondary: "ML: k-nearest neighbours and feature scaling", topic: "probability" },
  { main: "STW: speed–time graphs, meeting points and round trips", secondary: "P&C: binomial coefficients and identities", topic: "stw" },
  { main: "ML: kNN, Naive Bayes, priors, likelihood and Laplace smoothing", secondary: "Probability: covariance and correlation", topic: "ml" },
  { main: "P&C: advanced mixed set; choose a counting model before arithmetic", secondary: "STW: mixed speed/work error log", topic: "pnc" },
  { main: "Probability: mean, median, variance, covariance and sampling", secondary: "ML: decision-tree vocabulary", topic: "probability" },
  { main: "STW: mixed speed, time, work and efficiency timed set", secondary: "P&C: 15-minute identity recall", topic: "stw" },
  { main: "ML: decision trees, entropy, information gain and Gini impurity", secondary: "Probability: CLT intuition and standard error", topic: "ml" },
  { main: "P&C: full revision—arrangements, selections, distributions and derangements", secondary: "STW: pipes and wages flash review", topic: "pnc" },
  { main: "Probability: full revision—Bayes, RVs, distributions and moments", secondary: "ML: SVM margin and support vectors", topic: "probability" },
  { main: "STW: full revision—relative motion and work-rate methods", secondary: "P&C: inclusion–exclusion recall", topic: "stw" },
  { main: "ML: SVM, kernels, margins and regularisation", secondary: "Probability: metric and distribution formula recall", topic: "ml" },
  { main: "P&C + Probability: mixed counting, conditional probability and distributions", secondary: "STW: choose a method before calculating", topic: "pnc" },
  { main: "ML: k-means objective and iterations; PCA, covariance and principal components", secondary: "Probability: expectation and variance speed drill", topic: "ml" },
  { main: "STW + P&C: mixed timed set; ratios, work rates and constrained counts", secondary: "ML: model-selection vocabulary", topic: "stw" },
  { main: "ML: confusion matrix, precision, recall, ROC and cross-validation", secondary: "Probability: sampling and CLT flashcards", topic: "ml" },
  { main: "Integrated mock: mixed P&C, probability, STW and ML; analyse every miss", secondary: "Re-solve five questions from the error log without notes", topic: "probability" },
  { main: "Final consolidation: red-flag subtopics from all four areas; exam pacing", secondary: "Select and re-solve the hardest verified PYQs from the archive", topic: "ml" }
];

const key = "gate-sprint-v1";
const legacy = JSON.parse(localStorage.getItem(key) || "{}");
const saved = { done: legacy.done || {}, notes: legacy.notes || "" };
const dayList = document.querySelector("#dayList");
const filter = document.querySelector("#topicFilter");
const openDays = new Set([0]);

function linksFor(day) {
  const topic = day.topic;
  return [
    { label: videos[topic].label, url: videos[topic].url, kind: "video" },
    { label: officialPapers.label + ` — verify “${day.main}” in the PDF`, url: officialPapers.url, kind: "paper" },
    { label: `${practice[topic].label} — ${day.main}`, url: practice[topic].url, kind: "practice" }
  ];
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}
function linkMarkup(day, phase, gated) {
  return `<div class="resource-links">${linksFor(day).map(link => {
    if (phase === "video" && link.kind !== "video") return "";
    if (phase === "practice" && link.kind === "video") return "";
    const isGated = gated && link.kind !== "video";
    return `<a class="${isGated ? "gated" : ""}" href="${link.url}" target="_blank" rel="noopener noreferrer" tabindex="${isGated ? "-1" : "0"}" aria-disabled="${isGated}" data-resource-kind="${link.kind}">${link.label} ↗</a>`;
  }).join("")}<span class="resource-link-label">${phase === "video" ? "Start here · watch the lesson" : "After Learn · practice + PYQ review"}</span>${gated ? '<span class="resource-lock-note">Complete the Learn checkbox to unlock these links.</span>' : ""}</div>`;
}
function render() {
  dayList.innerHTML = "";
  plan.forEach((day, index) => {
    if (filter.value !== "all" && day.topic !== filter.value) return;
    const completed = [0, 1, 2, 3].filter(n => saved.done[`${index}-${n}`]).length;
    const learnDone = Boolean(saved.done[`${index}-0`]);
    const tasks = [
      `Learn: ${day.main}`,
      `Secondary revision: ${day.secondary}`,
      "Topic-matched questions: solve 15–20 without notes, then mark the method used.",
      "Mixed PYQs + review: attempt the linked archive questions and log every miss."
    ];
    const card = document.createElement("article");
    const isOpen = openDays.has(index);
    card.className = `day-card${isOpen ? " open" : ""}${completed === 4 ? " complete" : ""}`;
    card.dataset.topic = day.topic;
    card.dataset.day = index;
    card.innerHTML = `<div class="day-head" role="button" tabindex="0" aria-expanded="${isOpen}"><span class="day-number">DAY ${String(index + 1).padStart(2, "0")}</span><span class="day-title">${escapeHtml(day.main)}<small>Secondary: ${escapeHtml(day.secondary)} · ${topics[day.topic].label}</small></span><span class="day-progress"><b>${completed}</b> / 4</span></div>
      <div class="day-body"><div class="task-list">
      ${tasks.map((text, taskIndex) => `<label class="task ${saved.done[`${index}-${taskIndex}`] ? "done" : ""}">
        <input type="checkbox" data-key="${index}-${taskIndex}" ${saved.done[`${index}-${taskIndex}`] ? "checked" : ""}>
        <span>${escapeHtml(text)}${taskIndex === 0 ? linkMarkup(day, "video", false) : taskIndex === 3 ? linkMarkup(day, "practice", !learnDone) : ""}</span>
      </label>`).join("")}
      </div><p class="task-meta">Suggested rhythm: learn → watch the linked video → check Learn → solve matched questions → use the unlocked PYQ/practice links. The paper archive is linked only as a source; verify the year/PDF and topic before counting a question.</p></div>`;
    dayList.append(card);
  });
  document.querySelectorAll(".day-head").forEach(head => {
    const toggle = () => {
      const index = Number(head.parentElement.querySelector(".day-number").textContent.replace(/\D/g, "")) - 1;
      if (openDays.has(index)) openDays.delete(index); else openDays.add(index);
      head.parentElement.classList.toggle("open", openDays.has(index));
      head.setAttribute("aria-expanded", openDays.has(index));
    };
    head.onclick = toggle;
    head.onkeydown = event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggle(); } };
  });
  document.querySelectorAll("input[data-key]").forEach(check => check.onchange = () => {
    saved.done[check.dataset.key] = check.checked;
    localStorage.setItem(key, JSON.stringify(saved));
    render();
    update();
  });
}
function update() {
  const checks = Object.values(saved.done).filter(Boolean).length;
  const total = plan.length * 4;
  const days = plan.filter((_, index) => [0, 1, 2, 3].every(n => saved.done[`${index}-${n}`])).length;
  const pct = Math.round(checks / total * 100);
  document.querySelector("#overallBar").style.width = `${pct}%`;
  document.querySelector("#overallLabel").textContent = `${days} / ${plan.length} days`;
  document.querySelector("#heroDone").textContent = `${pct}%`;
  document.querySelector("#hoursLabel").textContent = `${checks} / ${total} sessions logged`;
  document.querySelector("#heroStreak").textContent = days;
  const nextIndex = plan.findIndex((_, index) => ![0, 1, 2, 3].every(n => saved.done[`${index}-${n}`]));
  document.querySelector("#stickyLabel").textContent = `${days} / ${plan.length} days`;
  document.querySelector("#stickyHint").textContent = nextIndex === -1 ? "All sessions complete — review your notes." : `Next up: Day ${String(nextIndex + 1).padStart(2, "0")}`;
  document.querySelector("#nextDayBtn").disabled = nextIndex === -1;
  document.querySelector("#topicSummary").innerHTML = Object.entries(topics).map(([id, topic]) => {
    const ids = plan.map((day, index) => day.topic === id ? index : null).filter(index => index !== null);
    const count = ids.reduce((sum, index) => sum + [0, 1, 2, 3].filter(n => saved.done[`${index}-${n}`]).length, 0);
    return `<div class="topic-card"><span class="topic-mark" style="background:${topic.color}"></span><strong>${count}/${ids.length * 4}</strong><h3>${topic.label}</h3><p>${Math.round(count / (ids.length * 4) * 100) || 0}% complete</p></div>`;
  }).join("");
}
document.querySelector("#notes").value = saved.notes;
document.querySelector("#notes").oninput = event => {
  saved.notes = event.target.value;
  localStorage.setItem(key, JSON.stringify(saved));
  document.querySelector("#saveStatus").textContent = "Saved just now";
};
document.querySelector("#clearNotes").onclick = () => {
  saved.notes = "";
  document.querySelector("#notes").value = "";
  localStorage.setItem(key, JSON.stringify(saved));
};
document.querySelector("#resetBtn").onclick = () => {
  if (confirm("Reset all checkboxes and notes?")) {
    localStorage.removeItem(key);
    location.reload();
  }
};
filter.onchange = render;
document.querySelector("#nextDayBtn").onclick = () => {
  const nextIndex = plan.findIndex((_, index) => ![0, 1, 2, 3].every(n => saved.done[`${index}-${n}`]));
  if (nextIndex < 0) return;
  openDays.add(nextIndex);
  filter.value = "all";
  render();
  document.querySelector(`[data-day="${nextIndex}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
};
render();
update();
