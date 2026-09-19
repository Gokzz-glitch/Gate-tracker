const topics = {
  probability:{label:"Probability & Statistics", short:"Probability", color:"#0d9488"},
  pnc:{label:"Permutations & Combinations", short:"P&C", color:"#4f6bff"},
  stw:{label:"Speed · Time · Work", short:"STW", color:"#f97316"},
  ml:{label:"Machine Learning", short:"Machine Learning", color:"#a855f7"}
};
const plan = [
 ["Foundations: counting principles, factorials","Learn: addition/multiplication rules; make a formula sheet.","Solve 20 basic counting questions.","PYQ target: 5 counting questions.","Review errors + 10-minute recall.", "pnc"],
 ["P&C: permutations","Derive nPr, repeated objects, circular arrangements.","Solve 25 arrangement questions.","PYQ target: 8 P&C questions.","Create an ‘approach’ checklist.", "pnc"],
 ["P&C: combinations","Master nCr identities, selections, distribution.","Solve 25 combination questions.","PYQ target: 8 P&C questions.","Timed mixed set: 15 questions.", "pnc"],
 ["P&C: advanced mixed","Inclusion–exclusion, derangements, stars and bars.","Solve 20 advanced questions.","PYQ target: 10 P&C questions.","Weekly review: redo 5 misses.", "pnc"],
 ["Probability: sample spaces","Events, axioms, conditional probability intuition.","Solve 20 event-algebra questions.","PYQ target: 8 probability questions.","Build a one-page probability map.", "probability"],
 ["Conditional probability & Bayes","Watch Brunton/StatQuest playlist segment; derive Bayes.","Solve 20 Bayes questions.","PYQ target: 8 conditional probability questions.","Explain Bayes aloud without notes.", "probability"],
 ["Independence & total probability","Law of total probability, independence, partitions.","Solve 20 mixed questions.","PYQ target: 8 probability questions.","Review formula sheet.", "probability"],
 ["Random variables","PMF, PDF, CDF; discrete vs continuous.","Solve 20 RV questions.","PYQ target: 8 RV questions.","Weekly timed quiz: 30 questions.", "probability"],
 ["Distributions I","Bernoulli, binomial, geometric, Poisson: when to use each.","Solve 24 distribution questions.","PYQ target: 10 distribution questions.","Make distribution comparison table.", "probability"],
 ["Distributions II","Uniform, exponential, normal; standardisation and z-score.","Solve 24 distribution questions.","PYQ target: 10 distribution questions.","Redo every wrong question.", "probability"],
 ["Expectation & variance","Linearity, moments, variance rules, covariance.","Solve 20 expectation questions.","PYQ target: 8 statistics questions.","Formula recall sprint.", "probability"],
 ["Statistics & sampling","Mean, median, variance, sampling, CLT intuition.","Solve 20 statistics questions.","PYQ target: 8 statistics questions.","Weekly mixed quiz: 30 questions.", "probability"],
 ["STW: units & ratios","Convert units; distance = speed × time; ratio setup.","Solve 20 speed/time basics.","PYQ target: 8 aptitude questions.","Error log + formula card.", "stw"],
 ["Relative speed","Opposite/same direction, trains, races.","Solve 25 relative-speed questions.","PYQ target: 8 STW questions.","Timed set: 20 minutes.", "stw"],
 ["Average speed","Weighted average and round trips; spot common traps.","Solve 20 average-speed questions.","PYQ target: 8 STW questions.","Explain one trap in notes.", "stw"],
 ["Work & efficiency","Work-rate model, LCM method, combined work.","Solve 25 work questions.","PYQ target: 10 STW questions.","Weekly mixed quiz: 30 questions.", "stw"],
 ["Pipes, cisterns & wages","Inlet/outlet signs, partial work, payment ratios.","Solve 20 work-rate questions.","PYQ target: 8 STW questions.","Redo missed questions.", "stw"],
 ["STW mixed practice","Blend speed, work, efficiency; choose method before arithmetic.","Solve 30 mixed questions.","PYQ target: 12 STW questions.","Update shortcut sheet.", "stw"],
 ["ML foundations","Supervised vs unsupervised, features, labels, splits.","Read Andrew Ng intro; make glossary.","Answer 20 concept checks.","PYQ target: 8 ML questions.","Weekly review + flashcards.", "ml"],
 ["Linear regression","Hypothesis, MSE, gradient descent, normal equation intuition.","Solve 15 numerical/concept questions.","PYQ target: 8 ML questions.","Derive one update step.", "ml"],
 ["Logistic regression","Sigmoid, log loss, decision boundary, regularisation.","Solve 15 classification questions.","PYQ target: 8 ML questions.","Compare linear vs logistic.", "ml"],
 ["kNN & Naive Bayes","Distance, scaling, priors, likelihood, Laplace smoothing.","Solve 20 classifier questions.","PYQ target: 8 ML questions.","Weekly timed quiz: 30 questions.", "ml"],
 ["Decision trees","Entropy, information gain, Gini, overfitting.","Solve 15 tree questions.","PYQ target: 8 ML questions.","Build a split by hand.", "ml"],
 ["SVM & kernels","Margins, support vectors, soft margin, kernel idea.","Solve 15 SVM questions.","PYQ target: 6 ML questions.","Review model assumptions.", "ml"],
 ["Clustering & PCA","k-means objective, iterations, covariance, principal components.","Solve 15 unsupervised questions.","PYQ target: 6 ML questions.","Sketch PCA intuition.", "ml"],
 ["Model evaluation","Confusion matrix, precision/recall, ROC, cross-validation.","Solve 20 evaluation questions.","PYQ target: 8 ML questions.","Make metric selection guide.", "ml"],
 ["Integrated mock I","2h mixed mock: all four topics; simulate exam conditions.","Analyse every miss for 90 minutes.","Target: 40 questions, 70% accuracy.","Make top-10 error list.", "probability"],
 ["Integrated mock II","Targeted revision from error list + formula sheets.","2h mixed mock: 50 questions.","Target: 50 questions, 75% accuracy.","Review pacing and guesses.", "ml"],
 ["Final consolidation","Revisit red-flag concepts; light playlist refresh only.","Solve 30 selected PYQs.","Target: 20 questions without notes.","Write exam-day strategy.", "probability"],
 ["Retrospective & next month","Full formula recall; choose topics for next cycle.","Final 2h mini-mock + analysis.","Target: 40 questions, 80% accuracy.","Celebrate, record next steps.", "ml"]
];

const key="gate-sprint-v1", saved=JSON.parse(localStorage.getItem(key)||'{"done":{},"notes":""}');
const dayList=document.querySelector("#dayList"), filter=document.querySelector("#topicFilter");
function render(){dayList.innerHTML=""; const selected=filter.value;
  plan.forEach((d,i)=>{if(selected!=="all"&&d[5]!==selected)return; const done=[0,1,2,3].filter(n=>saved.done[`${i}-${n}`]).length;
    const card=document.createElement("article"); card.className="day-card"+(i===0?" open":""); card.dataset.topic=d[5];
    card.innerHTML=`<div class="day-head"><span class="day-number">DAY ${String(i+1).padStart(2,"0")}</span><span class="day-title">${d[0]}<small>${topics[d[5]].label}</small></span><span class="day-progress"><b>${done}</b> / 4</span></div><div class="day-body"><div class="task-list">${[d[1],d[2],d[3],d[4]].map((t,n)=>`<label class="task ${saved.done[`${i}-${n}`]?"done":""}"><input type="checkbox" data-key="${i}-${n}" ${saved.done[`${i}-${n}`]?"checked":""}><span>${t}</span></label>`).join("")}</div><p class="task-meta">Suggested rhythm: 50m learn · 50m solve · 50m PYQs · 50m review · 40m buffer.</p></div>`;
    dayList.append(card);
  });
  document.querySelectorAll(".day-head").forEach(h=>h.onclick=()=>h.parentElement.classList.toggle("open"));
  document.querySelectorAll("input[data-key]").forEach(c=>c.onchange=()=>{saved.done[c.dataset.key]=c.checked;localStorage.setItem(key,JSON.stringify(saved));render();update();});
}
function update(){const checks=Object.values(saved.done).filter(Boolean).length,total=plan.length*4,days=plan.filter((_,i)=>[0,1,2,3].every(n=>saved.done[`${i}-${n}`])).length,pct=Math.round(checks/total*100);
 document.querySelector("#overallBar").style.width=pct+"%"; document.querySelector("#overallLabel").textContent=`${days} / 30 days`; document.querySelector("#heroDone").textContent=pct+"%"; document.querySelector("#hoursLabel").textContent=`${checks} / 120 hours logged`; document.querySelector("#heroStreak").textContent=days;
 document.querySelector("#topicSummary").innerHTML=Object.entries(topics).map(([k,t])=>{const ids=plan.map((d,i)=>d[5]===k?i:null).filter(i=>i!==null),n=ids.reduce((a,i)=>a+[0,1,2,3].filter(x=>saved.done[`${i}-${x}`]).length,0);return `<div class="topic-card"><span class="topic-mark" style="background:${t.color}"></span><strong>${n}/${ids.length*4}</strong><h3>${t.label}</h3><p>${Math.round(n/(ids.length*4)*100)||0}% complete</p></div>`}).join("");
}
document.querySelector("#notes").value=saved.notes||"";document.querySelector("#notes").oninput=e=>{saved.notes=e.target.value;localStorage.setItem(key,JSON.stringify(saved));document.querySelector("#saveStatus").textContent="Saved just now";};document.querySelector("#clearNotes").onclick=()=>{saved.notes="";document.querySelector("#notes").value="";localStorage.setItem(key,JSON.stringify(saved));};document.querySelector("#resetBtn").onclick=()=>{if(confirm("Reset all checkboxes and notes?")){localStorage.removeItem(key);location.reload();}};filter.onchange=render;render();update();
