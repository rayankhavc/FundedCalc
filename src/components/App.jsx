import { useState, useCallback, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   CSS — AMBER RETRO TERMINAL THEME  v2.2
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#060400;--bg1:#0c0800;--bg2:#120d00;
  --amber:#ffaa00;--amber2:#ff8800;--amber3:#cc6600;
  --dim:#3a2200;--dimb:#553300;--bright:#ffee66;
  --red:#ff3300;--green:#99ff00;--blue:#44aaff;
  --text:#bb8800;--text2:#775500;
  --mono:'Share Tech Mono','Courier New',monospace;
  --vt:'VT323','Share Tech Mono','Courier New',monospace;
}
html,body{background:var(--bg);font-family:var(--mono);color:var(--text);}

/* CRT scanlines */
body::after{
  content:'';position:fixed;inset:0;z-index:9999;pointer-events:none;
  background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(0,0,0,.13) 3px,rgba(0,0,0,.13) 4px);
}

::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:var(--bg1);}
::-webkit-scrollbar-thumb{background:var(--dim);}

/* PANELS */
.panel{background:var(--bg1);border:1px solid var(--dim);padding:16px;}
.panel-hi{background:var(--bg1);border:2px solid var(--amber);padding:16px;}

/* INPUTS */
select,.ni{
  background:var(--bg);border:1px solid var(--dimb);
  color:var(--amber);padding:7px 10px;
  font-family:var(--mono);font-size:13px;width:100%;
  outline:none;border-radius:0;-webkit-appearance:none;appearance:none;
  transition:border-color .15s,box-shadow .15s;letter-spacing:.5px;
}
select:focus,.ni:focus{border-color:var(--amber);box-shadow:0 0 6px rgba(255,170,0,.25);}

/* RANGE */
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:2px;border-radius:0;outline:none;cursor:pointer;}
input[type=range]::-webkit-slider-thumb{
  -webkit-appearance:none;width:13px;height:13px;
  background:var(--amber);cursor:pointer;
  clip-path:polygon(50% 0%,100% 100%,0% 100%);
  box-shadow:0 0 6px rgba(255,170,0,.5);
}

/* FIRM PILLS */
.fpill{
  display:inline-block;padding:4px 10px;border:1px solid var(--dimb);
  background:transparent;color:var(--text2);font-size:11px;font-family:var(--mono);
  cursor:pointer;transition:all .15s;text-transform:uppercase;letter-spacing:1px;border-radius:0;
}
.fpill:hover{border-color:var(--amber3);color:var(--amber3);}
.fpill.on{border-color:var(--amber);background:rgba(255,170,0,.1);color:var(--amber);box-shadow:0 0 10px rgba(255,170,0,.25);}

/* PHASE TABS */
.ptab{
  padding:4px 12px;border:1px solid var(--dimb);background:transparent;
  color:var(--text2);font-family:var(--mono);font-size:11px;cursor:pointer;
  transition:all .15s;border-radius:0;text-transform:uppercase;letter-spacing:1px;
}
.ptab.on{border-color:var(--amber);background:rgba(255,170,0,.1);color:var(--amber);}
.ptab:hover:not(.on){color:var(--amber3);border-color:var(--amber3);}

/* RUN BUTTON */
.runbtn{
  width:100%;padding:14px;border:2px solid var(--amber);background:transparent;
  color:var(--amber);font-family:var(--vt);font-size:22px;letter-spacing:5px;
  cursor:pointer;transition:all .2s;text-transform:uppercase;position:relative;overflow:hidden;
}
.runbtn::before{
  content:'';position:absolute;inset:0;background:var(--amber);
  transform:translateX(-100%);transition:transform .25s;z-index:0;
}
.runbtn span{position:relative;z-index:1;}
.runbtn:hover:not(:disabled)::before{transform:translateX(0);}
.runbtn:hover:not(:disabled){color:var(--bg);}
.runbtn:disabled{border-color:var(--dimb);color:var(--dimb);cursor:not-allowed;}

/* SHARE BUTTON — same weight as run button, green accent */
.sharebtn{
  width:100%;padding:13px;border:2px solid var(--green);background:rgba(153,255,0,.06);
  color:var(--green);font-family:var(--vt);font-size:20px;letter-spacing:4px;
  cursor:pointer;transition:all .2s;text-transform:uppercase;position:relative;overflow:hidden;
  display:flex;align-items:center;justify-content:center;gap:14px;
}
.sharebtn::before{
  content:'';position:absolute;inset:0;background:var(--green);
  transform:translateX(-100%);transition:transform .25s;z-index:0;
}
.sharebtn>*{position:relative;z-index:1;}
.sharebtn:hover:not(:disabled)::before{transform:translateX(0);}
.sharebtn:hover:not(:disabled){color:var(--bg);border-color:var(--green);}
.sharebtn:disabled{border-color:var(--dim);color:var(--dim);background:transparent;cursor:not-allowed;}

/* TOAST */
@keyframes toastIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.toast{
  position:fixed;bottom:24px;right:24px;z-index:20000;
  background:var(--bg1);border:1px solid var(--amber3);
  color:var(--amber);padding:10px 20px;font-family:var(--mono);
  font-size:11px;letter-spacing:2px;text-transform:uppercase;
  animation:toastIn .25s ease both;pointer-events:none;
  box-shadow:0 0 20px rgba(255,170,0,.08);
}

/* ASCII PROGRESS BAR */
.pbar{height:10px;background:var(--bg2);border:1px solid var(--dimb);overflow:hidden;position:relative;}
.pfill{
  height:100%;transition:width .9s cubic-bezier(.4,0,.2,1);
  background:var(--amber);
  background-image:repeating-linear-gradient(90deg,transparent 0,transparent 5px,rgba(0,0,0,.35) 5px,rgba(0,0,0,.35) 6px);
}

/* STAT BOXES — v2.2: improved readability */
.sbox{background:var(--bg2);border:1px solid var(--dim);padding:12px 14px;}

/* SECTION HEADER */
.shd{
  font-family:var(--vt);font-size:17px;color:var(--amber);
  letter-spacing:3px;text-transform:uppercase;
  border-bottom:1px solid var(--dim);padding-bottom:6px;margin-bottom:14px;
}

/* ADVICE CARD */
.adv{border-left:3px solid;padding:13px 16px;background:rgba(0,0,0,.4);}

/* ANIMATIONS */
@keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
@keyframes spin{to{transform:rotate(360deg);}}
.fu{animation:fadeUp .3s ease both;}
.fu1{animation:fadeUp .3s .08s ease both;}
.fu2{animation:fadeUp .3s .16s ease both;}
.blink{animation:blink 1s step-end infinite;}

/* BIG NUMBER */
.bigval{font-family:var(--vt);font-size:18px;letter-spacing:1px;}

@media(max-width:780px){.twocol{grid-template-columns:1fr!important;}}
`;

/* ═══════════════════════════════════════════════════════════
   TRANSLATIONS
═══════════════════════════════════════════════════════════ */
const TR = {
  en:{
    title:"PROP FIRM CHALLENGE CALCULATOR",
    sub:"MONTE CARLO ENGINE v2.2  ·  STRATEGY PROBABILITY ANALYZER  ·  BY RAYTHAN WEB DESIGN",
    firm:"> PROP FIRM",acct:"> ACCOUNT SIZE",
    phases:"> CHALLENGE PHASES",add:"[+ ADD PHASE]",del:"[REMOVE]",
    target:"PROFIT TARGET",maxdd:"MAX DRAWDOWN",daily:"DAILY DRAWDOWN",
    mind:"MIN DAYS",maxd:"MAX DAYS",
    strat:"> STRATEGY PARAMETERS",
    wr:"WIN RATE",rr:"RISK / REWARD RATIO",risk:"RISK PER TRADE",tpd:"TRADES PER DAY",
    run:"▶  EXECUTE SIMULATION",running:"COMPUTING…",
    overall:"> OVERALL PASS PROBABILITY",
    phase:"PHASE",sims:"MONTE CARLO SIMULATIONS",
    trades:"EXPECTED TRADES",days:"EXPECTED DAYS",
    profit:"EXPECTED PROFIT",dd:"AVG MAX DD",ruin:"RISK OF RUIN",
    mintrades:"MIN TRADES NEEDED",
    chart:"> EQUITY PATH SIMULATION",passing:"PASSING",failing:"FAILING",
    ddnote:"DRAWDOWN FROM INITIAL BALANCE",
    ev:"EXPECTED VALUE",bk:"BREAK-EVEN WR",
    empty:"CONFIGURE PARAMETERS AND EXECUTE SIMULATION",
    advice:"> STRATEGY ANALYSIS & RECOMMENDATIONS",
    how:"> HOW TO USE THIS TOOL",
    steps:[
      "Select your target prop firm — challenge parameters auto-fill from official rules.",
      "Adjust each phase: profit target, max drawdown, daily limit, and day range.",
      "Enter backtested strategy data: win rate, R/R ratio, and risk per trade.",
      "Set your average number of trades per day from your trading plan.",
      "Execute the simulation — 5,000 Monte Carlo runs calculate pass probability.",
      "Review the equity path chart and advice panel to optimize your approach.",
    ],
    disclaimer:"WARNING — Monte Carlo results are probabilistic estimates based solely on provided parameters. This is NOT financial advice. Always verify challenge rules with official documentation. Past performance does not guarantee future results.",
    share:"SHARE RESULTS",
    sharing:"GENERATING IMAGE…",
    shareCopied:"✓ COPIED TO CLIPBOARD",
    shareDownloaded:"✓ IMAGE SAVED",
    shareError:"! SHARE FAILED — RETRY",
    by:"CREATED BY",leg:"",
    style:{ color: '#ffffff' },
    legTxt:(<p style={{color:"#ffffff",fontSize:"11px",textAlign:"center",opacity:0.8,marginTop:"2rem",paddingBottom:"1rem",backgroundColor:"transparent"}}>© 2026 RAYTHAN WEB DESIGN. ALL RIGHTS RESERVED. PROVIDED FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY. DOES NOT CONSTITUTE FINANCIAL OR INVESTMENT ADVICE. MONTE CARLO RESULTS BASED ON USER-PROVIDED PARAMETERS. PROP FIRM RULES VARY — ALWAYS CONSULT OFFICIAL DOCUMENTATION.</p>),
    priv:"PRIVACY POLICY",terms:"TERMS OF USE",cont:"CONTACT",legNotice:"LEGAL NOTICE",
    excellent:"EXCELLENT",high:"HIGH",moderate:"MODERATE",low:"LOW",vlow:"VERY LOW",
    firmph:"ENTER FIRM NAME",
  },
  fr:{
    title:"CALCULATEUR CHALLENGE PROP FIRM",
    sub:"MOTEUR MONTE CARLO v2.2  ·  ANALYSEUR DE PROBABILITÉ STRATÉGIQUE  ·  BY RAYTHAN WEB DESIGN",
    firm:"> PROP FIRM",acct:"> TAILLE DU COMPTE",
    phases:"> PHASES DU CHALLENGE",add:"[+ AJOUTER PHASE]",del:"[SUPPRIMER]",
    target:"OBJECTIF PROFIT",maxdd:"DRAWDOWN MAX",daily:"DRAWDOWN JOURNALIER",
    mind:"JOURS MIN",maxd:"JOURS MAX",
    strat:"> PARAMÈTRES STRATÉGIE",
    wr:"TAUX DE RÉUSSITE",rr:"RATIO RISQUE / RENDEMENT",risk:"RISQUE PAR TRADE",tpd:"TRADES PAR JOUR",
    run:"▶  LANCER LA SIMULATION",running:"CALCUL EN COURS…",
    overall:"> PROBABILITÉ GLOBALE DE SUCCÈS",
    phase:"PHASE",sims:"SIMULATIONS MONTE CARLO",
    trades:"TRADES ATTENDUS",days:"JOURS ATTENDUS",
    profit:"PROFIT ATTENDU",dd:"DD MAX MOYEN",ruin:"RISQUE DE RUINE",
    mintrades:"TRADES MIN NÉCESSAIRES",
    chart:"> SIMULATION DES COURBES",passing:"RÉUSSIES",failing:"ÉCHOUÉES",
    ddnote:"DRAWDOWN DEPUIS LE SOLDE INITIAL",
    ev:"VALEUR ESPÉRÉE",bk:"TAUX SEUIL",
    empty:"CONFIGUREZ LES PARAMÈTRES ET LANCEZ LA SIMULATION",
    advice:"> ANALYSE & RECOMMANDATIONS STRATÉGIQUES",
    how:"> COMMENT UTILISER CET OUTIL",
    steps:[
      "Sélectionnez votre prop firm — les paramètres du challenge se remplissent automatiquement.",
      "Configurez chaque phase : objectif de profit, drawdown max, limite journalière et plage de jours.",
      "Saisissez vos données de backtest : taux de réussite, ratio R/R et risque par trade.",
      "Définissez votre nombre habituel de trades par jour selon votre plan de trading.",
      "Lancez la simulation — 5 000 passes Monte Carlo calculent votre probabilité de succès.",
      "Analysez les courbes et les recommandations pour optimiser votre approche avant le challenge.",
    ],
    disclaimer:"AVERTISSEMENT — Les résultats Monte Carlo sont des estimations basées uniquement sur les paramètres fournis. Ce n'est PAS un conseil financier. Vérifiez toujours les règles officielles. Les performances passées ne garantissent pas les performances futures.",
    share:"PARTAGER MES RÉSULTATS",
    sharing:"GÉNÉRATION EN COURS…",
    shareCopied:"✓ COPIÉ DANS LE PRESSE-PAPIER",
    shareDownloaded:"✓ IMAGE SAUVEGARDÉE",
    shareError:"! ÉCHEC — RÉESSAYER",
    by:"CRÉÉ PAR",leg:"",
    legTxt:(<p style={{color:"#ffffff",fontSize:"11px",textAlign:"center",opacity:0.8,marginTop:"2rem",paddingBottom:"1rem",backgroundColor:"transparent"}}>© 2026 RAYTHAN WEB DESIGN. ALL RIGHTS RESERVED. PROVIDED FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY. DOES NOT CONSTITUTE FINANCIAL OR INVESTMENT ADVICE. MONTE CARLO RESULTS BASED ON USER-PROVIDED PARAMETERS. PROP FIRM RULES VARY — ALWAYS CONSULT OFFICIAL DOCUMENTATION.</p>),
    priv:"POLITIQUE CONFIDENTIALITÉ",terms:"CONDITIONS D'UTILISATION",cont:"CONTACT",legNotice:"MENTIONS LÉGALES",
    excellent:"EXCELLENTE",high:"ÉLEVÉE",moderate:"MODÉRÉE",low:"FAIBLE",vlow:"TRÈS FAIBLE",
    firmph:"ENTREZ LE NOM DE LA FIRM",
  },
};

/* ═══════════════════════════════════════════════════════════
   PROP FIRMS DATA  — 10 firms (5 original + 5 new)
   Sources: official challenge documentation as of 2026.
   Always verify current rules on each firm's website.
═══════════════════════════════════════════════════════════ */
const FIRMS = {
  // ── ORIGINAL 5 ──────────────────────────────────────────
  ftmo:{
    name:"FTMO", color:"#00dd77",
    phases:[
      {name:"PHASE 1",profitTarget:10,maxDD:10,dailyDD:5,minDays:10,maxDays:30},
      {name:"PHASE 2",profitTarget:5, maxDD:10,dailyDD:5,minDays:10,maxDays:60},
    ],
    sizes:[10000,25000,50000,100000,200000],
  },
  the5ers:{
    name:"THE 5%ERS", color:"#ffaa00",
    phases:[
      {name:"PHASE 1",profitTarget:8,maxDD:8,dailyDD:4,minDays:0,maxDays:60},
      {name:"PHASE 2",profitTarget:5,maxDD:8,dailyDD:4,minDays:0,maxDays:60},
    ],
    sizes:[6000,12000,30000,80000],
  },
  myfundedfx:{
    name:"MYFUNDEDFX", color:"#4499ff",
    phases:[
      {name:"PHASE 1",profitTarget:8, maxDD:10,dailyDD:5,minDays:5,maxDays:30},
      {name:"PHASE 2",profitTarget:5, maxDD:10,dailyDD:5,minDays:5,maxDays:60},
    ],
    sizes:[10000,25000,50000,100000,200000],
  },
  apex:{
    name:"APEX TRADER", color:"#ff4444",
    phases:[
      {name:"EVALUATION",profitTarget:6,maxDD:6,dailyDD:3,minDays:7,maxDays:30},
    ],
    sizes:[25000,50000,100000,150000,250000],
  },
  trueforex:{
    name:"TRUE FOREX", color:"#bb88ff",
    phases:[
      {name:"PHASE 1",profitTarget:10,maxDD:10,dailyDD:5,minDays:5,maxDays:30},
      {name:"PHASE 2",profitTarget:5, maxDD:10,dailyDD:5,minDays:5,maxDays:60},
    ],
    sizes:[10000,25000,50000,100000,200000],
  },
  // ── NEW FIRMS ───────────────────────────────────────────
  fundingpips:{
    name:"FUNDING PIPS", color:"#00bbff",
    phases:[
      {name:"PHASE 1",profitTarget:8,maxDD:8,dailyDD:5,minDays:0,maxDays:30},
      {name:"PHASE 2",profitTarget:5,maxDD:8,dailyDD:5,minDays:0,maxDays:60},
    ],
    sizes:[5000,10000,25000,50000,100000,200000],
  },
  fundednext:{
    name:"FUNDEDNEXT", color:"#ff6622",
    phases:[
      {name:"PHASE 1",profitTarget:10,maxDD:10,dailyDD:5,minDays:5,maxDays:30},
      {name:"PHASE 2",profitTarget:5, maxDD:10,dailyDD:5,minDays:5,maxDays:60},
    ],
    sizes:[6000,15000,25000,50000,100000,200000],
  },
  alphacapital:{
    name:"ALPHA CAPITAL", color:"#44ffcc",
    phases:[
      {name:"PHASE 1",profitTarget:10,maxDD:6,dailyDD:3,minDays:0,maxDays:45},
      {name:"PHASE 2",profitTarget:5, maxDD:6,dailyDD:3,minDays:0,maxDays:60},
    ],
    sizes:[10000,25000,50000,100000,200000],
  },
  blueguardian:{
    name:"BLUE GUARDIAN", color:"#4488ff",
    phases:[
      {name:"PHASE 1",profitTarget:8,maxDD:8,dailyDD:4,minDays:5,maxDays:45},
      {name:"PHASE 2",profitTarget:4,maxDD:8,dailyDD:4,minDays:5,maxDays:45},
    ],
    sizes:[10000,25000,50000,100000,200000],
  },
  funderpro:{
    name:"FUNDERPRO", color:"#ff44aa",
    phases:[
      {name:"PHASE 1",profitTarget:8,maxDD:8,dailyDD:4,minDays:0,maxDays:30},
      {name:"PHASE 2",profitTarget:4,maxDD:8,dailyDD:4,minDays:0,maxDays:60},
    ],
    sizes:[5000,10000,25000,50000,100000],
  },
  custom:{
    name:"CUSTOM", color:"#ffee44",
    phases:[{name:"PHASE 1",profitTarget:10,maxDD:10,dailyDD:5,minDays:10,maxDays:30}],
    sizes:[],
  },
};

/* ═══════════════════════════════════════════════════════════
   MONTE CARLO ENGINE — 5 000 simulations
   Runs synchronously inside a setTimeout(fn, 60) to release
   the render thread before the heavy computation starts.
   Typical runtime: 30–80 ms for 2 phases × 5 000 passes.
═══════════════════════════════════════════════════════════ */
function simulate({ winRate, rr, riskPct, tradesPerDay, phase, numSims = 5000 }) {
  const { profitTarget, maxDD, dailyDD, minDays, maxDays } = phase;
  const pWin = winRate / 100;
  let passes = 0, ruins = 0, sumT = 0, sumP = 0, sumDD = 0, sumDays = 0;
  const curves = [];

  for (let s = 0; s < numSims; s++) {
    let eq = 100, loEq = 100, passed = false, failed = false;
    let td = 0, daysDone = 0, targetMet = false;
    const curve = [100];

    outer: for (let day = 0; day < maxDays; day++) {
      daysDone = day + 1;
      if (targetMet) {
        curve.push(eq);
        if (daysDone >= minDays) { passed = true; break; }
        continue;
      }
      const dayStart = eq;
      for (let tr = 0; tr < tradesPerDay; tr++) {
        const win = Math.random() < pWin;
        const risk = eq * (riskPct / 100);
        eq += win ? risk * rr : -risk;
        td++;
        if (eq < loEq) loEq = eq;
        if (dayStart > 0 && ((dayStart - eq) / dayStart) * 100 >= dailyDD) { failed = true; ruins++; break outer; }
        if (100 - eq >= maxDD) { failed = true; ruins++; break outer; }
        if (eq <= 0) { failed = true; ruins++; break outer; }
        if (eq - 100 >= profitTarget) { targetMet = true; break; }
      }
      if (!failed) curve.push(parseFloat(eq.toFixed(3)));
    }

    if (!passed && !failed) {
      if (targetMet && daysDone >= minDays) passed = true;
      else failed = true;
    }

    if (passed) { passes++; sumP += eq - 100; sumDays += daysDone; }
    sumT += td;
    sumDD += 100 - loEq;
    if (curves.length < 80) curves.push({ pts: curve, pass: passed });
  }

  return {
    prob: passes / numSims,
    expectedTrades: Math.round(sumT / numSims),
    expectedDays: passes > 0 ? Math.round(sumDays / passes) : 0,
    expectedProfit: passes > 0 ? sumP / passes : 0,
    avgDD: sumDD / numSims,
    riskRuin: ruins / numSims,
    curves,
  };
}

/* ═══════════════════════════════════════════════════════════
   SHARE CARD GENERATOR — Canvas API, zero external deps
   Output: 1200×630 PNG blob (OG / Twitter card format).
   Fonts VT323 + Share Tech Mono are already loaded by the
   Google Fonts @import in CSS — available via canvas2D.
═══════════════════════════════════════════════════════════ */
async function generateShareCard(results, strat, phases, acct, firmName) {
  const W = 1200, H = 630;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Ensure Google Fonts are available in the canvas context
  try {
    await document.fonts.ready;
    await Promise.race([
      Promise.all([
        document.fonts.load('40px VT323'),
        document.fonts.load('12px "Share Tech Mono"'),
      ]),
      new Promise(r => setTimeout(r, 1500)),
    ]);
  } catch (_) { /* silent fallback — Courier New renders fine */ }

  const VT = '"VT323","Share Tech Mono","Courier New",monospace';
  const MN = '"Share Tech Mono","Courier New",monospace';

  const pct = Math.round(results.overall * 100);
  const probColor = pct > 65 ? '#99ff00' : pct > 40 ? '#ffdd00' : pct > 25 ? '#ffaa00' : pct > 10 ? '#ff7700' : '#ff3300';
  const ev = (strat.winRate / 100) * strat.rr - (1 - strat.winRate / 100);
  const evStr = `${ev >= 0 ? '+' : ''}${ev.toFixed(3)}R`;

  // Helper: draw equity curves on a sub-canvas area
  const drawCurves = (curves, aX, aY, aW, aH) => {
    const sample = curves.slice(0, 50);
    let minV = Infinity, maxV = -Infinity, maxLen = 2;
    sample.forEach(c => {
      if (c.pts.length > maxLen) maxLen = c.pts.length;
      c.pts.forEach(v => { if (v < minV) minV = v; if (v > maxV) maxV = v; });
    });
    const vr = maxV - minV || 1;
    const cX = i => aX + (i / (maxLen - 1)) * aW;
    const cY = v => aY + aH - ((v - minV) / vr) * aH;
    ctx.lineWidth = 1;
    sample.filter(c => !c.pass).forEach(c => {
      if (c.pts.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,50,0,0.2)';
      c.pts.forEach((v, i) => i === 0 ? ctx.moveTo(cX(i), cY(v)) : ctx.lineTo(cX(i), cY(v)));
      ctx.stroke();
    });
    sample.filter(c => c.pass).forEach(c => {
      if (c.pts.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(153,255,0,0.28)';
      c.pts.forEach((v, i) => i === 0 ? ctx.moveTo(cX(i), cY(v)) : ctx.lineTo(cX(i), cY(v)));
      ctx.stroke();
    });
  };

  // ── Background ───────────────────────────────────────────
  ctx.fillStyle = '#060400';
  ctx.fillRect(0, 0, W, H);

  // Dot grid
  ctx.fillStyle = 'rgba(255,170,0,0.025)';
  for (let x = 22; x < W; x += 44)
    for (let y = 22; y < H; y += 44)
      ctx.fillRect(x, y, 1, 1);

  // Amber border lines
  ctx.fillStyle = '#ffaa00';
  ctx.fillRect(0, 0, W, 2);
  ctx.fillRect(0, H - 2, W, 2);

  // ── Header (0–70) ────────────────────────────────────────
  ctx.fillStyle = '#0c0800';
  ctx.fillRect(0, 2, W, 68);

  ctx.strokeStyle = '#1a0a00';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, 70); ctx.lineTo(W, 70); ctx.stroke();

  // Logo
  ctx.font = `42px ${VT}`;
  ctx.fillStyle = '#ffaa00';
  ctx.textBaseline = 'alphabetic';
  ctx.shadowColor = '#ffaa00';
  ctx.shadowBlur = 14;
  ctx.fillText('FUNDEDCALC_', 50, 55);
  ctx.shadowBlur = 0;

  // Firm + account size (right-aligned)
  ctx.font = `12px ${MN}`;
  ctx.fillStyle = '#553300';
  ctx.textAlign = 'right';
  ctx.fillText(`${String(firmName).toUpperCase()}  ·  $${Number(acct).toLocaleString('en')}`, W - 50, 55);
  ctx.textAlign = 'left';

  // ── Vertical divider ─────────────────────────────────────
  ctx.strokeStyle = '#1a0a00';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(680, 70); ctx.lineTo(680, 558); ctx.stroke();

  // ── LEFT COLUMN: Probability (x: 50–650) ─────────────────
  ctx.font = `10px ${MN}`;
  ctx.fillStyle = '#553300';
  ctx.fillText('PASS  PROBABILITY', 50, 108);

  // Big percentage number
  ctx.font = `148px ${VT}`;
  ctx.fillStyle = probColor;
  ctx.shadowColor = probColor;
  ctx.shadowBlur = 28;
  ctx.fillText(`${pct}%`, 46, 272);
  ctx.shadowBlur = 0;

  // ASCII progress bar
  const barLen = 20;
  const barFilled = Math.round(pct / 100 * barLen);
  ctx.font = `18px ${MN}`;
  ctx.fillStyle = probColor;
  ctx.fillText('█'.repeat(barFilled) + '░'.repeat(barLen - barFilled), 50, 308);

  // Horizontal separator
  ctx.strokeStyle = '#1a0a00';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(50, 342); ctx.lineTo(630, 342); ctx.stroke();

  // 4-column stat grid
  const statItems = [
    { label: 'WIN RATE',   val: `${strat.winRate}%`        },
    { label: 'R/R RATIO',  val: `1:${strat.rr}`            },
    { label: 'RISK/TRADE', val: `${strat.riskPct}%`        },
    { label: 'EDGE (EV)',  val: evStr                        },
  ];
  statItems.forEach((s, i) => {
    const x = 50 + i * 148;
    ctx.font = `9px ${MN}`;
    ctx.fillStyle = '#553300';
    ctx.fillText(s.label, x, 368);
    ctx.font = `25px ${VT}`;
    ctx.fillStyle = '#ffaa00';
    ctx.shadowColor = '#ffaa00';
    ctx.shadowBlur = 6;
    ctx.fillText(s.val, x, 397);
    ctx.shadowBlur = 0;
  });

  // Simulation count note
  ctx.font = `9px ${MN}`;
  ctx.fillStyle = '#2a1400';
  ctx.fillText('5,000 MONTE CARLO SIMULATIONS', 50, 440);

  // ── RIGHT COLUMN: Phase results (x: 710–1150) ────────────
  const RX = 710;

  ctx.font = `9px ${MN}`;
  ctx.fillStyle = '#553300';
  ctx.fillText('PHASE  RESULTS', RX, 108);

  let phaseY = 128;
  results.probs.forEach((p, i) => {
    const ppct    = (p * 100).toFixed(1);
    const pCol    = p > .65 ? '#99ff00' : p > .4 ? '#ffdd00' : p > .25 ? '#ffaa00' : p > .1 ? '#ff7700' : '#ff3300';
    const pName   = (phases[i]?.name || `PHASE ${i + 1}`).toUpperCase();
    const barMaxW = (W - 50) - RX;

    ctx.font = `10px ${MN}`;
    ctx.fillStyle = '#553300';
    ctx.fillText(pName, RX, phaseY);

    ctx.font = `26px ${VT}`;
    ctx.fillStyle = pCol;
    ctx.shadowColor = pCol;
    ctx.shadowBlur = 10;
    ctx.textAlign = 'right';
    ctx.fillText(`${ppct}%`, W - 50, phaseY + 14);
    ctx.textAlign = 'left';
    ctx.shadowBlur = 0;

    // Bar
    ctx.fillStyle = '#120d00';
    ctx.fillRect(RX, phaseY + 18, barMaxW, 6);
    ctx.fillStyle = pCol;
    ctx.fillRect(RX, phaseY + 18, barMaxW * p, 6);

    // Sub-info
    if (phases[i]) {
      ctx.font = `9px ${MN}`;
      ctx.fillStyle = '#2a1400';
      ctx.fillText(
        `TARGET ${phases[i].profitTarget}%  ·  DD ${phases[i].maxDD}%  ·  DAILY ${phases[i].dailyDD}%`,
        RX, phaseY + 43
      );
    }

    phaseY += 72;
  });

  // Mini equity chart (only if vertical space allows)
  if (results.curves?.length > 0 && phaseY < 452) {
    const cY = phaseY + 8;
    const cH = 546 - cY;
    const cW = (W - 50) - RX;
    if (cH > 50) {
      ctx.fillStyle = '#0c0800';
      ctx.fillRect(RX, cY, cW, cH);
      ctx.strokeStyle = '#1a0a00';
      ctx.lineWidth = 1;
      ctx.strokeRect(RX, cY, cW, cH);
      ctx.font = `8px ${MN}`;
      ctx.fillStyle = '#2a1400';
      ctx.fillText('MONTE CARLO EQUITY PATHS', RX, cY - 5);
      drawCurves(results.curves, RX, cY, cW, cH);
    }
  }

  // ── Footer (558–630) ─────────────────────────────────────
  ctx.fillStyle = '#0c0800';
  ctx.fillRect(0, 558, W, 72);
  ctx.strokeStyle = '#1a0a00';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, 558); ctx.lineTo(W, 558); ctx.stroke();

  ctx.font = `11px ${MN}`;
  ctx.fillStyle = '#2a1400';
  ctx.textAlign = 'left';
  ctx.fillText('fundedcalc.fr', 50, 601);

  ctx.font = `22px ${VT}`;
  ctx.fillStyle = '#2a1400';
  ctx.textAlign = 'center';
  ctx.fillText('Simulated on FUNDEDCALC', W / 2, 601);

  ctx.font = `9px ${MN}`;
  ctx.fillStyle = '#2a1400';
  ctx.textAlign = 'right';
  ctx.fillText('Not financial advice  ·  Past performance ≠ future results', W - 50, 601);
  ctx.textAlign = 'left';

  return new Promise(resolve => canvas.toBlob(blob => resolve(blob), 'image/png'));
}

/* ═══════════════════════════════════════════════════════════
   RETRO GAUGE — big VT323 display
═══════════════════════════════════════════════════════════ */
function RetroGauge({ value }) {
  const pct  = Math.max(0, Math.min(1, value));
  const col  = pct < .2 ? "#ff3300" : pct < .38 ? "#ff7700" : pct < .55 ? "#ffcc00" : pct < .72 ? "#aaff00" : "#00ffaa";
  const bars = 24, filled = Math.round(pct * bars);
  const glw  = `0 0 16px ${col}, 0 0 32px ${col}44`;
  return (
    <div style={{ textAlign: "center", padding: "8px 0" }}>
      <div style={{ fontFamily: "var(--vt)", fontSize: 76, color: col, lineHeight: 1, textShadow: glw, letterSpacing: 4 }}>
        {Math.round(pct * 100)}%
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: col, marginTop: 8, letterSpacing: 2, textShadow: `0 0 8px ${col}88` }}>
        {"█".repeat(filled)}{"░".repeat(bars - filled)}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EQUITY CURVE CHART
═══════════════════════════════════════════════════════════ */
function EquityCurve({ curves, phase }) {
  if (!curves?.length) return null;
  const W = 600, H = 200, P = { t: 12, r: 12, b: 24, l: 48 };
  const cw = W - P.l - P.r, ch = H - P.t - P.b;
  let maxLen = 2, minV = Infinity, maxV = -Infinity;
  curves.forEach(c => {
    maxLen = Math.max(maxLen, c.pts.length);
    c.pts.forEach(v => { minV = Math.min(minV, v); maxV = Math.max(maxV, v); });
  });
  const vr   = maxV - minV || 1;
  const X    = i => P.l + (i / (maxLen - 1)) * cw;
  const Y    = v => P.t + ch - ((v - minV) / vr) * ch;
  const pathD = pts => pts.map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  const ty   = Y(100 + phase.profitTarget), by = Y(100), dy = Y(100 - phase.maxDD);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      <rect x={P.l} y={P.t} width={cw} height={Math.max(0, ty - P.t)} fill="rgba(153,255,0,.04)" />
      <rect x={P.l} y={Math.max(P.t, dy)} width={cw} height={Math.max(0, H - P.b - Math.max(P.t, dy))} fill="rgba(255,50,0,.04)" />
      {[0, .25, .5, .75, 1].map(t => (
        <line key={t} x1={P.l + t * cw} y1={P.t} x2={P.l + t * cw} y2={H - P.b} stroke="#1a1000" strokeWidth={1} />
      ))}
      <line x1={P.l} y1={ty} x2={W - P.r} y2={ty} stroke="rgba(153,255,0,.55)" strokeWidth={1} strokeDasharray="5 4" />
      <line x1={P.l} y1={by} x2={W - P.r} y2={by} stroke="rgba(255,170,0,.2)"  strokeWidth={1} strokeDasharray="2 4" />
      <line x1={P.l} y1={dy} x2={W - P.r} y2={dy} stroke="rgba(255,50,0,.55)"  strokeWidth={1} strokeDasharray="5 4" />
      {curves.filter(c => !c.pass).map((c, i) => <path key={`f${i}`} d={pathD(c.pts)} fill="none" stroke="rgba(255,50,0,.18)"  strokeWidth={1} />)}
      {curves.filter(c =>  c.pass).map((c, i) => <path key={`p${i}`} d={pathD(c.pts)} fill="none" stroke="rgba(153,255,0,.2)"   strokeWidth={1} />)}
      <line x1={P.l} y1={P.t}    x2={P.l}    y2={H - P.b} stroke="#331a00" strokeWidth={1} />
      <line x1={P.l} y1={H - P.b} x2={W - P.r} y2={H - P.b} stroke="#331a00" strokeWidth={1} />
      <text x={P.l - 5} y={ty + 4} textAnchor="end" fill="#99ff00" style={{ fontFamily: "var(--mono)", fontSize: 9 }}>+{phase.profitTarget}%</text>
      <text x={P.l - 5} y={by + 4} textAnchor="end" fill="#553300" style={{ fontFamily: "var(--mono)", fontSize: 9 }}>BASE</text>
      <text x={P.l - 5} y={dy + 4} textAnchor="end" fill="#ff5500" style={{ fontFamily: "var(--mono)", fontSize: 9 }}>-{phase.maxDD}%</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADVICE ENGINE
═══════════════════════════════════════════════════════════ */
function getAdvice(strat, results, phases, lang) {
  const { winRate, rr, riskPct, tpd } = strat;
  const { prob, riskRuin } = results;
  const p  = phases[0];
  const ev = (winRate / 100) * rr - (1 - winRate / 100);
  const bk = 100 / (rr + 1);
  const items = [];

  if (ev <= 0) {
    items.push({ type: "danger",
      en: `[ERR] NEGATIVE EDGE — EV = ${ev.toFixed(3)}R. With ${winRate}% WR + ${rr}:1 R/R you lose money on average. Required win rate for break-even: ${bk.toFixed(1)}%. Fix your strategy before funding any challenge.`,
      fr: `[ERR] EDGE NÉGATIF — VE = ${ev.toFixed(3)}R. Avec ${winRate}% de taux et un R/R de ${rr}:1 vous perdez en moyenne. Taux requis pour le seuil de rentabilité : ${bk.toFixed(1)}%. Corrigez votre stratégie avant de financer un challenge.`
    });
  } else if (ev > 0.3) {
    items.push({ type: "success",
      en: `[OK] STRONG EDGE — EV = +${ev.toFixed(3)}R/trade. Mathematical advantage is solid and well above break-even. Focus on execution consistency and emotional discipline to capture this edge across the full challenge.`,
      fr: `[OK] EDGE SOLIDE — VE = +${ev.toFixed(3)}R/trade. Avantage mathématique confirmé et largement au-dessus du seuil. Concentrez-vous sur la régularité d'exécution et la discipline émotionnelle pour réaliser cet avantage sur l'ensemble du challenge.`
    });
  } else {
    items.push({ type: "info",
      en: `[INFO] POSITIVE EDGE — EV = +${ev.toFixed(3)}R/trade. Profitable but with a modest margin. Statistical variance will play a significant role — expect swings and stay disciplined through inevitable drawdown periods.`,
      fr: `[INFO] EDGE POSITIF — VE = +${ev.toFixed(3)}R/trade. Rentable mais avec une marge modeste. La variance statistique jouera un rôle important — anticipez les fluctuations et restez discipliné pendant les périodes de drawdown inévitables.`
    });
  }

  const maxDailyLoss = riskPct * tpd;
  if (maxDailyLoss > p.dailyDD * 0.75) {
    items.push({ type: "warning",
      en: `[WARN] DAILY DD EXPOSURE — ${tpd} trades × ${riskPct}% risk = ${maxDailyLoss.toFixed(1)}% max daily loss. Your ${p.dailyDD}% daily limit can be hit in a single bad session. Recommended max risk/trade: ${(p.dailyDD * 0.6 / tpd).toFixed(2)}%.`,
      fr: `[WARN] SUREXPOSITION JOURNALIÈRE — ${tpd} trades × ${riskPct}% = ${maxDailyLoss.toFixed(1)}% de perte max en une journée. Votre limite de ${p.dailyDD}% peut être atteinte en une seule mauvaise session. Risque max recommandé : ${(p.dailyDD * 0.6 / tpd).toFixed(2)}%/trade.`
    });
  }

  const streak     = Math.ceil(p.maxDD / riskPct);
  const streakProb = ((1 - winRate / 100) ** streak * 100).toFixed(2);
  items.push({ type: riskPct > 1.5 ? "warning" : "info",
    en: `[${riskPct > 1.5 ? "WARN" : "INFO"}] DRAWDOWN ANALYSIS — ${streak} consecutive losses breach max DD at current ${riskPct}% risk. With ${winRate}% WR, probability of ${streak}-loss streak: ${streakProb}%. ${riskPct > 1.5 ? "HIGH RISK — strongly consider reducing position size." : "Risk level appears manageable."}`,
    fr: `[${riskPct > 1.5 ? "WARN" : "INFO"}] ANALYSE DRAWDOWN — ${streak} pertes consécutives dépassent le DD max à ${riskPct}% de risque. Avec ${winRate}% de taux, probabilité de ${streak} pertes de suite : ${streakProb}%. ${riskPct > 1.5 ? "RISQUE ÉLEVÉ — réduisez fortement la taille des positions." : "Le niveau de risque semble gérable."}`
  });

  if (prob < 0.15) {
    items.push({ type: "danger",
      en: `[ERR] CRITICAL PROBABILITY — ${(prob * 100).toFixed(1)}% pass rate is extremely low. Challenge parameters are far too restrictive for this strategy profile. Recommended actions: increase R/R ratio, reduce risk per trade below 0.5%, or significantly improve win rate before attempting.`,
      fr: `[ERR] PROBABILITÉ CRITIQUE — ${(prob * 100).toFixed(1)}% de taux de succès est extrêmement faible. Les paramètres du challenge sont trop restrictifs pour ce profil de stratégie. Actions recommandées : augmenter le R/R, réduire le risque sous 0.5%/trade, ou améliorer significativement le taux de réussite avant de tenter.`
    });
  } else if (prob > 0.65) {
    items.push({ type: "success",
      en: `[OK] FAVORABLE CONDITIONS — ${(prob * 100).toFixed(1)}% pass probability. Your strategy aligns well with these challenge rules. Execute with strict discipline. The primary threat is now emotional deviation: revenge trading, overtrading after losses, or breaking the daily limit.`,
      fr: `[OK] CONDITIONS FAVORABLES — ${(prob * 100).toFixed(1)}% de probabilité de succès. Votre stratégie s'aligne bien avec les règles du challenge. Exécutez avec une discipline stricte. La principale menace est maintenant la déviation émotionnelle : revenge trading, surtrading après les pertes, ou dépassement de la limite journalière.`
    });
  }

  if (riskRuin > 0.05) {
    items.push({ type: "warning",
      en: `[WARN] ELEVATED RUIN RISK — ${(riskRuin * 100).toFixed(1)}% of simulations ended in full account breach. This metric should be near zero. Halving your risk per trade would dramatically improve ruin protection while preserving profitability.`,
      fr: `[WARN] RISQUE DE RUINE ÉLEVÉ — ${(riskRuin * 100).toFixed(1)}% des simulations se sont soldées par une violation totale du compte. Ce chiffre devrait être proche de zéro. Diviser votre risque par trade par deux améliorerait drastiquement la protection contre la ruine tout en préservant la rentabilité.`
    });
  }

  items.push({ type: "info",
    en: `[INFO] SAMPLE SIZE — Backtest reliability requires minimum 200–300 trades in real market conditions. Small samples produce high parameter uncertainty. Over-optimized backtests consistently overstate live performance by 30–50%. The more trades in your sample, the more reliable these simulations become.`,
    fr: `[INFO] TAILLE D'ÉCHANTILLON — La fiabilité d'un backtest nécessite au minimum 200–300 trades en conditions réelles. Les petits échantillons génèrent une forte incertitude sur les paramètres. Les backtests sur-optimisés surestiment systématiquement les performances en live de 30–50%. Plus votre échantillon est large, plus ces simulations deviennent fiables.`
  });

  return items;
}

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
const AC   = { danger: "#ff3300", warning: "#ffaa00", success: "#99ff00", info: "#44aaff" };
const pCol = p => p > .65 ? "#99ff00" : p > .4 ? "#ffdd00" : p > .25 ? "#ffaa00" : p > .1 ? "#ff7700" : "#ff3300";
const pLbl = (p, t) => p > .65 ? t.excellent : p > .4 ? t.high : p > .25 ? t.moderate : p > .1 ? t.low : t.vlow;
const fmt  = (n, d = 0) => Number(n).toLocaleString("en", { maximumFractionDigits: d });
const glow = c => ({ textShadow: `0 0 8px ${c}88` });

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [lang,       setLang]       = useState("en");
  const t = TR[lang];

  const [firmKey,    setFirmKey]    = useState("ftmo");
  const [customName, setCustomName] = useState("MY FIRM");
  const [acctSize,   setAcctSize]   = useState(10000);
  const [phases,     setPhases]     = useState(() => FIRMS.ftmo.phases.map(p => ({ ...p })));
  const [activeTab,  setActiveTab]  = useState(0);
  const [strat,      setStrat]      = useState({ winRate: 50, rr: 2, riskPct: 1, tpd: 3 });
  const [results,    setResults]    = useState(null);
  const [running,    setRunning]    = useState(false);
  const [modalType,  setModalType]  = useState(null);
  // Share state
  const [sharing,    setSharing]    = useState(false);
  const [shareToast, setShareToast] = useState(null); // null | 'copied' | 'downloaded' | 'error'
  // Raw string buffer for phase inputs — lets user clear/retype freely without React clamping back
  const [phaseRaw,   setPhaseRaw]   = useState({});

  const firm             = FIRMS[firmKey];
  const acct             = acctSize;
  const firmDisplayName  = firmKey === "custom" ? customName : firm.name;

  // Auto-dismiss share toast after 3 s
  useEffect(() => {
    if (!shareToast) return;
    const timer = setTimeout(() => setShareToast(null), 3000);
    return () => clearTimeout(timer);
  }, [shareToast]);

  /* ── Firm selection ──────────────────────────────────── */
  const pickFirm = k => {
    setFirmKey(k);
    setPhases(FIRMS[k].phases.map(p => ({ ...p })));
    if (FIRMS[k].sizes.length > 0) setAcctSize(FIRMS[k].sizes[0]);
    setActiveTab(0);
    setResults(null);
  };

  /* ── Phase CRUD ──────────────────────────────────────── */
  const editPhase = (idx, field, v) => {
    // Allow any numeric value — no artificial lower bound
    const n = parseFloat(v);
    if (!isNaN(n)) setPhases(prev => prev.map((p, i) => i === idx ? { ...p, [field]: n } : p));
  };

  // Clear raw draft when switching tab so stale strings don't bleed across phases
  const switchTab = i => { setActiveTab(i); setPhaseRaw({}); };

  const addPhase = () => {
    if (phases.length >= 3) return;
    const newPhase  = { name: `PHASE ${phases.length + 1}`, profitTarget: 5, maxDD: 10, dailyDD: 5, minDays: 10, maxDays: 60 };
    const newPhases = [...phases, newPhase];
    setPhases(newPhases);
    setActiveTab(newPhases.length - 1);
  };

  const delPhase = idx => {
    if (phases.length <= 1) return;
    const newPhases = phases.filter((_, i) => i !== idx);
    setPhases(newPhases);
    setActiveTab(Math.max(0, Math.min(activeTab, newPhases.length - 1)));
  };

  /* ── Simulation ──────────────────────────────────────── */
  const run = () => {
    setRunning(true);
    setResults(null); // clear stale results immediately
    // setTimeout(60) yields to the browser so the "COMPUTING…" state renders
    // before the synchronous MC loop starts (~30–80 ms for 2-phase × 5 000)
    setTimeout(() => {
      try {
        const pr = phases.map(phase => simulate({
          winRate: strat.winRate, rr: strat.rr,
          riskPct: strat.riskPct, tradesPerDay: strat.tpd, phase,
        }));
        setResults({
          overall:      pr.reduce((a, r) => a * r.prob, 1),
          probs:        pr.map(r => r.prob),
          trades:       pr.reduce((a, r) => a + r.expectedTrades, 0),
          days:         pr.reduce((a, r) => a + r.expectedDays, 0),
          profit:       pr.reduce((a, r) => a + r.expectedProfit, 0),
          avgDD:        pr[0].avgDD,
          ruin:         pr[0].riskRuin,
          curves:       pr[0].curves,
          phaseResults: pr,
        });
      } finally {
        setRunning(false);
      }
    }, 60);
  };

  /* ── Share handler ───────────────────────────────────── */
  const handleShare = useCallback(async () => {
    if (!results || sharing) return;
    setSharing(true);
    try {
      const blob = await generateShareCard(results, strat, phases, acct, firmDisplayName);

      // Prefer Clipboard API (requires user gesture — button click qualifies)
      if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setShareToast('copied');
          return;
        } catch (_) { /* clipboard permission denied — fall through to download */ }
      }

      // Fallback: trigger file download
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href     = url;
      a.download = `fundedcalc-${Math.round(results.overall * 100)}pct.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setShareToast('downloaded');
    } catch (e) {
      console.error('[FundedCalc] Share error:', e);
      setShareToast('error');
    } finally {
      setSharing(false);
    }
  }, [results, strat, phases, acct, firmDisplayName, sharing]);

  /* ── Derived values ──────────────────────────────────── */
  const ev        = (strat.winRate / 100) * strat.rr - (1 - strat.winRate / 100);
  const bkWR      = 100 / (strat.rr + 1);
  const evCol     = ev >= 0 ? "#99ff00" : "#ff3300";
  const minTrades = Math.ceil(phases[0].profitTarget / ((strat.riskPct / 100) * strat.rr * (strat.winRate / 100)));
  const rng       = (v, lo, hi) => ({ background: `linear-gradient(90deg,var(--amber) ${((v - lo) / (hi - lo)) * 100}%,var(--bg2) ${((v - lo) / (hi - lo)) * 100}%)` });

  /* ── Micro styles ────────────────────────────────────── */
  const LBL  = { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--text2)", display: "block", marginBottom: 8 };
  const safe = activeTab < phases.length ? activeTab : 0;

  /* ═══════════════════════════════════════════════════════
     JSX
  ════════════════════════════════════════════════════════ */
  return (
    <div style={{ fontFamily: "var(--mono)", background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <style>{CSS}</style>

      {/* ══ HEADER ══════════════════════════════════════════ */}
      <header style={{ background: "#050300", borderBottom: "2px solid #2a1400", padding: "0 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,170,0,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,170,0,.025) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <div style={{ position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)", width: 500, height: 120, background: "radial-gradient(ellipse,rgba(255,170,0,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 72, display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ fontFamily: "var(--vt)", fontSize: 21, color: "var(--amber)", letterSpacing: 3, ...glow("#ffaa00") }}>
              {t.title}<span className="blink" style={{ color: "var(--amber3)" }}>_</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--text2)", letterSpacing: 1.5, marginTop: 2 }}>{t.sub}</div>
          </div>
          <button onClick={() => setLang(l => l === "en" ? "fr" : "en")}
            style={{ background: "var(--bg2)", border: "1px solid var(--dimb)", color: "var(--amber)", padding: "6px 14px", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 2 }}>
            [{lang === "en" ? "🇫🇷 FR" : "🇬🇧 EN"}]
          </button>
        </div>
      </header>

      {/* ══ MAIN ════════════════════════════════════════════ */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "22px 20px" }}>
        <div className="twocol" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

          {/* ──── LEFT COLUMN ──── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* FIRM + ACCOUNT */}
            <div className="panel">
              <div className="shd">{t.firm}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {Object.entries(FIRMS).map(([k, f]) => (
                  <button key={k} className={`fpill${firmKey === k ? " on" : ""}`} onClick={() => pickFirm(k)}
                    style={firmKey === k ? { borderColor: f.color, color: f.color, boxShadow: `0 0 10px ${f.color}44` } : {}}>
                    {f.name}
                  </button>
                ))}
              </div>

              {firmKey === "custom" && (
                <input className="ni" type="text" value={customName}
                  onChange={e => setCustomName(e.target.value.toUpperCase())}
                  placeholder={t.firmph}
                  style={{ marginBottom: 10, letterSpacing: 1 }} />
              )}

              <div className="shd" style={{ fontSize: 13 }}>{t.acct}</div>
              {/* Free number input — no min/max, full user control */}
              <input
                className="ni"
                type="text"
                inputMode="decimal"
                value={acctSize}
                onChange={e => setAcctSize(e.target.value)}
                onBlur={e => {
                  const n = parseFloat(e.target.value);
                  setAcctSize(isNaN(n) || n <= 0 ? 1000 : n);
                }}
                placeholder="10000"
                style={{ marginBottom: 6 }}
              />
              {/* Quick-select preset pills (visible when firm has presets) */}
              {firm.sizes.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                  {firm.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setAcctSize(sz)}
                      style={{
                        background: acctSize === sz ? "rgba(255,170,0,.12)" : "transparent",
                        border: `1px solid ${acctSize === sz ? "var(--amber)" : "var(--dim)"}`,
                        color: acctSize === sz ? "var(--amber)" : "var(--text2)",
                        padding: "2px 8px", fontFamily: "var(--mono)", fontSize: 10,
                        cursor: "pointer", letterSpacing: 1, textTransform: "uppercase",
                        transition: "all .15s",
                      }}
                    >
                      ${sz.toLocaleString()}
                    </button>
                  ))}
                </div>
              )}
              <div style={{ fontSize: 11, color: "var(--dimb)", marginTop: 6, letterSpacing: 1 }}>
                1% = ${fmt(acct * 0.01, 0)}  ·  TARGET = ${fmt(acct * phases[0].profitTarget / 100, 0)}  ·  MAX DD = ${fmt(acct * phases[0].maxDD / 100, 0)}
              </div>
            </div>

            {/* PHASES */}
            <div className="panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div className="shd" style={{ marginBottom: 0, borderBottom: "none" }}>{t.phases}</div>
                {phases.length < 3 && (
                  <button onClick={addPhase}
                    style={{ background: "none", border: "1px solid var(--dimb)", color: "var(--amber3)", padding: "3px 10px", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1 }}>
                    {t.add}
                  </button>
                )}
              </div>

              <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                {phases.map((p, i) => (
                  <button key={i} className={`ptab${safe === i ? " on" : ""}`} onClick={() => switchTab(i)}>
                    {p.name}
                  </button>
                ))}
              </div>

              {phases.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { f: "profitTarget", label: `🎯 ${t.target}`, sfx: "%" },
                    { f: "maxDD",        label: `📉 ${t.maxdd}`,  sfx: "%" },
                    { f: "dailyDD",      label: `📅 ${t.daily}`,  sfx: "%" },
                    { f: "minDays",      label: `▸ ${t.mind}`,    sfx: "D" },
                    { f: "maxDays",      label: `⏳ ${t.maxd}`,   sfx: "D" },
                  ].map(({ f, label, sfx }) => (
                    <div key={f}>
                      <span style={{ ...LBL, fontSize: 9 }}>{label}</span>
                      <div style={{ position: "relative" }}>
                        <input className="ni" type="text" inputMode="decimal"
                          value={phaseRaw[`${safe}-${f}`] ?? String(phases[safe][f])}
                          onChange={e => {
                            // Store raw string while typing — never block the user
                            setPhaseRaw(prev => ({ ...prev, [`${safe}-${f}`]: e.target.value }));
                          }}
                          onBlur={e => {
                            const n = parseFloat(e.target.value);
                            // Commit numeric value; if blank/invalid revert to previous
                            if (!isNaN(n)) editPhase(safe, f, String(n));
                            setPhaseRaw(prev => {
                              const next = { ...prev };
                              delete next[`${safe}-${f}`];
                              return next;
                            });
                          }}
                          style={{ paddingRight: 26 }} />
                        <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: "var(--dimb)", fontSize: 11, pointerEvents: "none" }}>{sfx}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    {phases.length > 1 ? (
                      <button onClick={() => delPhase(safe)}
                        style={{ background: "rgba(255,50,0,.08)", border: "1px solid #441100", color: "#ff5500", padding: "7px", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 11, width: "100%", letterSpacing: 1 }}>
                        {t.del}
                      </button>
                    ) : <div />}
                  </div>
                </div>
              )}
            </div>

            {/* STRATEGY */}
            <div className="panel">
              <div className="shd">{t.strat}</div>

              {[
                { key: "winRate", label: `🎯 ${t.wr}`,   min: 20, max: 85, step: 1,   sfx: "%" },
                { key: "riskPct", label: `💰 ${t.risk}`,  min: 0.1, max: 5, step: 0.1, sfx: "%" },
                { key: "tpd",     label: `📊 ${t.tpd}`,   min: 1,  max: 20, step: 1,   sfx: ""  },
              ].map(({ key, label, min, max, step, sfx }) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ ...LBL, marginBottom: 0 }}>{label}</span>
                    <span style={{ fontFamily: "var(--vt)", fontSize: 22, color: "var(--amber)", ...glow("#ffaa00") }}>
                      {key === "riskPct" ? strat[key].toFixed(1) : strat[key]}{sfx}
                    </span>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={strat[key]}
                    style={rng(strat[key], min, max)}
                    onChange={e => setStrat(prev => ({ ...prev, [key]: Number(e.target.value) }))} />
                  {key === "riskPct" && acct > 0 && (
                    <div style={{ fontSize: 11, color: "var(--dimb)", marginTop: 4, letterSpacing: 1 }}>
                      = ${fmt(acct * strat.riskPct / 100, 0)} per trade
                    </div>
                  )}
                </div>
              ))}

              {/* R:R selector */}
              <div style={{ marginBottom: 16 }}>
                <span style={{ ...LBL, fontSize: 9 }}>⚡ {t.rr}</span>
                <select value={strat.rr} onChange={e => setStrat(prev => ({ ...prev, rr: Number(e.target.value) }))}>
                  {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 3, 3.5, 4, 5].map(v => (
                    <option key={v} value={v}>1 : {v}  —  ({v}R)</option>
                  ))}
                </select>
              </div>

              {/* Inline derived metrics */}
              <div style={{ borderTop: "1px dashed var(--dim)", paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
                {[
                  { label: t.ev,         val: `${ev >= 0 ? "+" : ""}${ev.toFixed(3)}R`, col: evCol },
                  { label: t.bk,         val: `${bkWR.toFixed(1)}%`,                    col: strat.winRate >= bkWR ? "#99ff00" : "#ff7700" },
                  { label: t.mintrades,  val: minTrades,                                col: "#ffaa00" },
                ].map(({ label, val, col }) => (
                  <div key={label} style={{ background: "var(--bg2)", border: "1px solid var(--dim)", padding: "8px 9px", textAlign: "center" }}>
                    <div style={{ ...LBL, fontSize: 8, textAlign: "center", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: "var(--vt)", fontSize: 22, color: col, ...glow(col) }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RUN BUTTON */}
            <button className="runbtn" onClick={run} disabled={running}>
              <span>
                {running ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                    <span style={{ display: "inline-block", animation: "spin .7s linear infinite" }}>◌</span>
                    {t.running}
                  </span>
                ) : t.run}
              </span>
            </button>
          </div>

          {/* ──── RIGHT COLUMN ──── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {!results ? (
              <div className="panel" style={{ minHeight: 440, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", borderStyle: "dashed" }}>
                <div style={{ fontFamily: "var(--vt)", fontSize: 48, color: "var(--dim)", marginBottom: 16 }}>[ — ]</div>
                <div style={{ fontFamily: "var(--mono)", color: "var(--dim)", fontSize: 11, letterSpacing: 2, maxWidth: 290, lineHeight: 1.9 }}>{t.empty}</div>
                <div className="blink" style={{ fontFamily: "var(--mono)", color: "var(--dimb)", fontSize: 10, marginTop: 18, letterSpacing: 2 }}>AWAITING INPUT_</div>
              </div>
            ) : (
              <>
                {/* OVERALL GAUGE */}
                <div className="fu" style={{ background: "var(--bg1)", border: `2px solid ${pCol(results.overall)}`, padding: 18, boxShadow: `0 0 24px ${pCol(results.overall)}22` }}>
                  <div className="shd" style={{ color: pCol(results.overall), borderColor: pCol(results.overall) }}>{t.overall}</div>
                  <RetroGauge value={results.overall} />
                  <div style={{ textAlign: "center", marginTop: 10 }}>
                    <span style={{ fontFamily: "var(--vt)", fontSize: 20, color: pCol(results.overall), letterSpacing: 4, ...glow(pCol(results.overall)) }}>
                      ◆ {pLbl(results.overall, t)} ◆
                    </span>
                  </div>
                  <div style={{ textAlign: "center", fontSize: 10, color: "var(--dimb)", marginTop: 6, letterSpacing: 1 }}>5,000 {t.sims}</div>
                </div>

                {/* PHASE BARS + STATS GRID */}
                <div className="panel fu1">
                  {results.probs.map((p, i) => (
                    <div key={i} style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 11, color: "var(--text2)", letterSpacing: 1 }}>{t.phase} {i + 1} — {phases[i].name}</span>
                        <span style={{ fontFamily: "var(--vt)", fontSize: 20, color: pCol(p), ...glow(pCol(p)) }}>{(p * 100).toFixed(1)}%</span>
                      </div>
                      <div className="pbar">
                        <div className="pfill" style={{ width: `${p * 100}%`, background: pCol(p), boxShadow: `0 0 8px ${pCol(p)}88` }} />
                      </div>
                    </div>
                  ))}

                  {/* Stats grid — v2.2: larger values, clearer labels */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px dashed var(--dim)" }}>
                    {[
                      { label: t.trades, val: results.trades,                         col: "#ffaa00", icon: "🔄" },
                      { label: t.days,   val: `${results.days}D`,                      col: "#ffdd44", icon: "📅" },
                      { label: t.ruin,   val: `${(results.ruin * 100).toFixed(1)}%`,   col: "#ff5500", icon: "💀" },
                      { label: t.dd,     val: `${results.avgDD.toFixed(2)}%`,           col: "#ff8800", icon: "📉" },
                      { label: t.profit, val: `+${results.profit.toFixed(2)}%`,         col: "#99ff00", icon: "💰",
                        sub: acct > 0 ? `$${fmt(acct * results.profit / 100, 0)}` : null },
                    ].map(({ label, val, col, icon, sub }) => (
                      <div key={label} className="sbox">
                        {/* v2.2: improved label readability */}
                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text2)", display: "block", marginBottom: 5 }}>
                          {icon} {label}
                        </div>
                        {/* v2.2: fontSize 22 → 26 for clearer metric reading */}
                        <div style={{ fontFamily: "var(--vt)", fontSize: 26, color: col, ...glow(col) }}>{val}</div>
                        {sub && <div style={{ fontSize: 10, color: "var(--dimb)", marginTop: 2, letterSpacing: 1 }}>{sub}</div>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* EQUITY CHART */}
                <div className="panel fu2">
                  <div className="shd">{t.chart}</div>
                  <EquityCurve curves={results.curves} phase={phases[0]} />
                  <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, color: "rgba(153,255,0,.7)", letterSpacing: 1 }}>▬ {results.curves.filter(c => c.pass).length} {t.passing}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,50,0,.7)",  letterSpacing: 1 }}>▬ {results.curves.filter(c => !c.pass).length} {t.failing}</span>
                  </div>
                  <div style={{ fontSize: 9, color: "var(--dimb)", marginTop: 4, letterSpacing: 1 }}>* {t.ddnote}</div>
                </div>

                {/* SHARE BUTTON — prominent, same visual weight as run button */}
                <button className="sharebtn" onClick={handleShare} disabled={sharing}>
                  {sharing ? (
                    <>
                      <span style={{ display: "inline-block", animation: "spin .7s linear infinite" }}>◌</span>
                      <span>{t.sharing}</span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: 22 }}>⬡</span>
                      <span>{t.share}</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* ══ ADVICE ══════════════════════════════════════════ */}
        {results && (() => {
          const advice = getAdvice(strat, { prob: results.overall, riskRuin: results.ruin, avgDD: results.avgDD }, phases, lang);
          return (
            <div className="panel" style={{ marginTop: 14 }}>
              <div className="shd">{t.advice}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
                {advice.map((a, i) => (
                  <div key={i} className="adv" style={{ borderColor: AC[a.type] }}>
                    {/* v2.2: fontSize 11 → 12, lineHeight 1.7 → 1.85 */}
                    <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: AC[a.type], lineHeight: 1.85, letterSpacing: .35 }}>{a[lang]}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ══ HOW TO USE ════════════════════════════════════ */}
        <div className="panel" style={{ marginTop: 14 }}>
          <div className="shd">{t.how}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {t.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ fontFamily: "var(--vt)", fontSize: 22, color: "var(--amber3)", minWidth: 30, flexShrink: 0 }}>{`0${i + 1}`.slice(-2)}</div>
                <div style={{ width: 1, background: "var(--dim)", alignSelf: "stretch", flexShrink: 0 }} />
                {/* v2.2: fontSize 12 → 13, lineHeight 1.75 → 1.85, color: text → amber at .8 opacity */}
                <p style={{ margin: 0, color: "var(--amber)", opacity: .8, fontSize: 13, lineHeight: 1.85, letterSpacing: .4 }}>{step}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", border: "1px solid var(--dimb)", borderLeft: "3px solid var(--amber3)" }}>
            {/* v2.2: dimb → text2 for better disclaimer readability */}
            <p style={{ margin: 0, color: "var(--text2)", fontSize: 11, lineHeight: 1.75, letterSpacing: .3 }}>{t.disclaimer}</p>
          </div>
        </div>
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer style={{ marginTop: 36, borderTop: "2px solid #ffaa00", background: "#000000", padding: "24px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: "var(--vt)", fontSize: 30, color: "var(--amber)", ...glow("#ffaa00") }}>📈</span>
              <div>
                <div style={{ fontSize: 9, color: "var(--dimb)", letterSpacing: 2, marginBottom: 2 }}>{t.by}</div>
                <div style={{ fontFamily: "var(--vt)", fontSize: 22, color: "var(--amber)", letterSpacing: 3, ...glow("#ffaa00") }}>RAYTHAN WEB DESIGN</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              {[t.priv, t.terms, t.cont, t.legNotice].map(l => (
                <span key={l} onClick={() => setModalType(l)}
                  style={{ color: "var(--dimb)", fontSize: 10, cursor: "pointer", letterSpacing: 1, transition: "color .15s" }}
                  onMouseEnter={e => e.target.style.color = "var(--amber3)"}
                  onMouseLeave={e => e.target.style.color  = "var(--dimb)"}>
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px dashed #1a0a00", paddingTop: 14 }}>
            <div style={{ fontSize: 9, color: "var(--dimb)", letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>{t.leg}</div>
            <div style={{ margin: 0, color: "#1a0a00", fontSize: 9, lineHeight: 1.9, letterSpacing: 0.3 }}>
              {t.legTxt}
            </div>
          </div>
        </div>
      </footer>

      {/* ══ LEGAL MODAL ════════════════════════════════════ */}
      {modalType && (
        <div onClick={() => setModalType(null)}
          style={{ position: "fixed", inset: 0, background: "#121212", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, cursor: "pointer" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: "var(--bg1)", border: "2px solid var(--amber)", maxWidth: 600, width: "90%", maxHeight: "80vh", overflow: "auto", padding: 24, cursor: "default" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--vt)", fontSize: 24, color: "var(--amber)", letterSpacing: 2 }}>{modalType}</div>
              <button onClick={() => setModalType(null)}
                style={{ background: "none", border: "none", color: "var(--amber)", fontSize: 24, cursor: "pointer", fontFamily: "var(--mono)" }}>X</button>
            </div>
            <div style={{ color: "var(--text)", fontSize: 12, lineHeight: 1.8, letterSpacing: .3 }}>
              {modalType === t.priv && (
                <>
                  <p style={{ marginBottom: 12 }}>LAST UPDATED: JUNE 2026</p>
                  <p style={{ marginBottom: 12 }}>WE COLLECT NO PERSONAL DATA. THIS TOOL OPERATES ENTIRELY CLIENT-SIDE. ALL CALCULATIONS ARE PERFORMED LOCALLY IN YOUR BROWSER.</p>
                  <p style={{ marginBottom: 12 }}>NO COOKIES. NO TRACKING. NO ANALYTICS. NO THIRD-PARTY SERVICES.</p>
                  <p>YOUR DATA STAYS ON YOUR DEVICE.</p>
                </>
              )}
              {modalType === t.terms && (
                <>
                  <p style={{ marginBottom: 12 }}>THIS TOOL IS PROVIDED "AS IS" FOR EDUCATIONAL PURPOSES ONLY.</p>
                  <p style={{ marginBottom: 12 }}>MONTE CARLO SIMULATIONS ARE PROBABILISTIC ESTIMATES BASED ON USER-PROVIDED PARAMETERS. THEY DO NOT GUARANTEE FUTURE RESULTS.</p>
                  <p style={{ marginBottom: 12 }}>THIS IS NOT FINANCIAL ADVICE. ALWAYS VERIFY PROP FIRM RULES WITH OFFICIAL DOCUMENTATION.</p>
                  <p>BY USING THIS TOOL, YOU ACKNOWLEDGE THAT TRADING INVOLVES SUBSTANTIAL RISK OF LOSS.</p>
                </>
              )}
              {modalType === t.cont && (
                <>
                  <p style={{ marginBottom: 12 }}>RAYTHAN WEB DESIGN</p>
                  <p style={{ marginBottom: 12 }}>EMAIL: CONTACT@RAYTHAN.COM</p>
                  <p style={{ marginBottom: 12 }}>FOR BUSINESS INQUIRIES, PARTNERSHIPS, OR CUSTOM DEVELOPMENT PROJECTS.</p>
                  <p>RESPONSE TIME: 24-48 HOURS</p>
                </>
              )}
              {modalType === t.legNotice && lang === "fr" && (
                <>
                  <p style={{ marginBottom: 12, fontWeight: "bold", color: "var(--amber)" }}>ÉDITEUR DU SITE</p>
                  <p style={{ marginBottom: 12 }}>Le site et l'application FundedCalc sont édités par Raythan Web Design, entreprise individuelle basée à Nantes, France.</p>
                  <p style={{ marginBottom: 12 }}>Contact : raythanwebdesign@gmail.com</p>
                  <p style={{ marginBottom: 12, fontWeight: "bold", color: "var(--amber)" }}>HÉBERGEUR DU SITE</p>
                  <p style={{ marginBottom: 12 }}>Le site est hébergé par la société Vercel Inc., situé au 650 California St, San Francisco, CA 94108, États-Unis.</p>
                  <p style={{ marginBottom: 12 }}>Site web : https://vercel.com</p>
                  <p style={{ marginBottom: 12, fontWeight: "bold", color: "var(--amber)" }}>PROPRIÉTÉ INTELLECTUELLE</p>
                  <p style={{ marginBottom: 12 }}>L'ensemble des contenus (textes, graphismes, logos, codes sources, simulateurs) présents sur ce site est la propriété exclusive de Raythan Web Design. Toute reproduction ou représentation totale ou partielle de ce site est interdite sans autorisation préalable.</p>
                  <p style={{ marginBottom: 12, fontWeight: "bold", color: "var(--amber)" }}>DONNÉES PERSONNELLES & COOKIES</p>
                  <p>Conformément au RGPD, ce site n'utilise aucun cookie de traçage, ne collecte aucune donnée personnelle et n'utilise aucun service tiers. Toutes les simulations mathématiques sont exécutées localement dans le navigateur de l'utilisateur.</p>
                </>
              )}
              {modalType === t.legNotice && lang === "en" && (
                <>
                  <p style={{ marginBottom: 12, fontWeight: "bold", color: "var(--amber)" }}>WEBSITE EDITOR</p>
                  <p style={{ marginBottom: 12 }}>The website and the FundedCalc application are edited by Raythan Web Design, a sole proprietorship based in Nantes, France.</p>
                  <p style={{ marginBottom: 12 }}>Contact: raythanwebdesign@gmail.com</p>
                  <p style={{ marginBottom: 12, fontWeight: "bold", color: "var(--amber)" }}>WEB HOSTING</p>
                  <p style={{ marginBottom: 12 }}>The website is hosted by Vercel Inc., located at 650 California St, San Francisco, CA 94108, USA.</p>
                  <p style={{ marginBottom: 12 }}>Website: https://vercel.com</p>
                  <p style={{ marginBottom: 12, fontWeight: "bold", color: "var(--amber)" }}>INTELLECTUAL PROPERTY</p>
                  <p style={{ marginBottom: 12 }}>All content (text, graphics, logos, source code, simulators) on this website is the exclusive property of Raythan Web Design. Any total or partial reproduction or representation of this site is strictly prohibited without prior authorization.</p>
                  <p style={{ marginBottom: 12, fontWeight: "bold", color: "var(--amber)" }}>PERSONAL DATA & COOKIES</p>
                  <p>In compliance with the GDPR, this website does not use any tracking cookies, collects no personal data, and uses no third-party services. All mathematical simulations are executed entirely client-side within the user's browser.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══ SHARE TOAST ════════════════════════════════════ */}
      {shareToast && (
        <div className="toast">
          {shareToast === 'copied'     && t.shareCopied}
          {shareToast === 'downloaded' && t.shareDownloaded}
          {shareToast === 'error'      && t.shareError}
        </div>
      )}
    </div>
  );
}
