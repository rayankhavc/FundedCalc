import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   CSS — AMBER RETRO TERMINAL THEME
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

/* ASCII PROGRESS BAR */
.pbar{height:10px;background:var(--bg2);border:1px solid var(--dimb);overflow:hidden;position:relative;}
.pfill{
  height:100%;transition:width .9s cubic-bezier(.4,0,.2,1);
  background:var(--amber);
  background-image:repeating-linear-gradient(90deg,transparent 0,transparent 5px,rgba(0,0,0,.35) 5px,rgba(0,0,0,.35) 6px);
}

/* STAT BOXES */
.sbox{background:var(--bg2);border:1px solid var(--dim);padding:10px 12px;}

/* SECTION HEADER */
.shd{
  font-family:var(--vt);font-size:16px;color:var(--amber);
  letter-spacing:3px;text-transform:uppercase;
  border-bottom:1px solid var(--dim);padding-bottom:6px;margin-bottom:14px;
}

/* ADVICE */
.adv{border-left:3px solid;padding:12px 14px;background:rgba(0,0,0,.4);}

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
    sub:"MONTE CARLO ENGINE v2.1  ·  STRATEGY PROBABILITY ANALYZER  ·  BY RAYTHAN WEB DESIGN",
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
    by:"CREATED BY",leg:"",
    style:{ color: '#FF4500' },
    legTxt:"© 2026 RAYTHAN WEB DESIGN. ALL RIGHTS RESERVED. PROVIDED FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY. DOES NOT CONSTITUTE FINANCIAL OR INVESTMENT ADVICE. MONTE CARLO RESULTS BASED ON USER-PROVIDED PARAMETERS. PROP FIRM RULES VARY — ALWAYS CONSULT OFFICIAL DOCUMENTATION.",
    priv:"PRIVACY POLICY",terms:"TERMS OF USE",cont:"CONTACT",legNotice:"LEGAL NOTICE",
    excellent:"EXCELLENT",high:"HIGH",moderate:"MODERATE",low:"LOW",vlow:"VERY LOW",
    firmph:"ENTER FIRM NAME",
  },
  fr:{
    title:"CALCULATEUR CHALLENGE PROP FIRM",
    sub:"MOTEUR MONTE CARLO v2.1  ·  ANALYSEUR DE PROBABILITÉ STRATÉGIQUE  ·  BY RAYTHAN WEB DESIGN",
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
    by:"CRÉÉ PAR",leg:"",
    legTxt: ( <p style={{ color: "#ffffff", fontSize: "11px", textAlign: "center", opacity: 0.8, marginTop: "2rem", paddingBottom: "1rem", backgroundColor: "transparent" }}>
  © 2026 RAYTHAN WEB DESIGN. ALL RIGHTS RESERVED. PROVIDED FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY. DOES NOT CONSTITUTE FINANCIAL OR INVESTMENT ADVICE. MONTE CARLO RESULTS BASED ON USER-PROVIDED PARAMETERS. PROP FIRM RULES VARY — ALWAYS CONSULT OFFICIAL DOCUMENTATION.
</p> ),
    priv:"POLITIQUE CONFIDENTIALITÉ",terms:"CONDITIONS D'UTILISATION",cont:"CONTACT",legNotice:"MENTIONS LÉGALES",
    excellent:"EXCELLENTE",high:"ÉLEVÉE",moderate:"MODÉRÉE",low:"FAIBLE",vlow:"TRÈS FAIBLE",
    firmph:"ENTREZ LE NOM DE LA FIRM",
  },
};

/* ═══════════════════════════════════════════════════════════
   PROP FIRMS DATA
═══════════════════════════════════════════════════════════ */
const FIRMS = {
  ftmo:{name:"FTMO",color:"#00dd77",
    phases:[{name:"PHASE 1",profitTarget:10,maxDD:10,dailyDD:5,minDays:10,maxDays:30},{name:"PHASE 2",profitTarget:5,maxDD:10,dailyDD:5,minDays:10,maxDays:60}],
    sizes:[10000,25000,50000,100000,200000]},
  the5ers:{name:"THE 5%ERS",color:"#ffaa00",
    phases:[{name:"PHASE 1",profitTarget:8,maxDD:8,dailyDD:4,minDays:0,maxDays:60},{name:"PHASE 2",profitTarget:5,maxDD:8,dailyDD:4,minDays:0,maxDays:60}],
    sizes:[6000,12000,30000,80000]},
  myfundedfx:{name:"MYFUNDEDFX",color:"#4499ff",
    phases:[{name:"PHASE 1",profitTarget:8,maxDD:10,dailyDD:5,minDays:5,maxDays:30},{name:"PHASE 2",profitTarget:5,maxDD:10,dailyDD:5,minDays:5,maxDays:60}],
    sizes:[10000,25000,50000,100000,200000]},
  apex:{name:"APEX TRADER",color:"#ff4444",
    phases:[{name:"EVALUATION",profitTarget:6,maxDD:6,dailyDD:3,minDays:7,maxDays:30}],
    sizes:[25000,50000,100000,150000,250000]},
  trueforex:{name:"TRUE FOREX",color:"#bb88ff",
    phases:[{name:"PHASE 1",profitTarget:10,maxDD:10,dailyDD:5,minDays:5,maxDays:30},{name:"PHASE 2",profitTarget:5,maxDD:10,dailyDD:5,minDays:5,maxDays:60}],
    sizes:[10000,25000,50000,100000,200000]},
  custom:{name:"CUSTOM",color:"#ffee44",
    phases:[{name:"PHASE 1",profitTarget:10,maxDD:10,dailyDD:5,minDays:10,maxDays:30}],
    sizes:[]},
};

/* ═══════════════════════════════════════════════════════════
   MONTE CARLO ENGINE  — 5 000 simulations
═══════════════════════════════════════════════════════════ */
function simulate({winRate, rr, riskPct, tradesPerDay, phase, numSims = 5000}) {
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
   RETRO GAUGE — big VT323 display
═══════════════════════════════════════════════════════════ */
function RetroGauge({ value }) {
  const pct = Math.max(0, Math.min(1, value));
  const col = pct < .2 ? "#ff3300" : pct < .38 ? "#ff7700" : pct < .55 ? "#ffcc00" : pct < .72 ? "#aaff00" : "#00ffaa";
  const bars = 24, filled = Math.round(pct * bars);
  const glow = `0 0 16px ${col}, 0 0 32px ${col}44`;

  return (
    <div style={{ textAlign: "center", padding: "8px 0" }}>
      <div style={{ fontFamily: "var(--vt)", fontSize: 76, color: col, lineHeight: 1, textShadow: glow, letterSpacing: 4 }}>
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
  const vr = maxV - minV || 1;
  const X = i => P.l + (i / (maxLen - 1)) * cw;
  const Y = v => P.t + ch - ((v - minV) / vr) * ch;
  const pathD = pts => pts.map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  const ty = Y(100 + phase.profitTarget), by = Y(100), dy = Y(100 - phase.maxDD);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      <rect x={P.l} y={P.t} width={cw} height={Math.max(0, ty - P.t)} fill="rgba(153,255,0,.04)" />
      <rect x={P.l} y={Math.max(P.t, dy)} width={cw} height={Math.max(0, H - P.b - Math.max(P.t, dy))} fill="rgba(255,50,0,.04)" />
      {[0, .25, .5, .75, 1].map(t => (
        <line key={t} x1={P.l + t * cw} y1={P.t} x2={P.l + t * cw} y2={H - P.b} stroke="#1a1000" strokeWidth={1} />
      ))}
      <line x1={P.l} y1={ty} x2={W - P.r} y2={ty} stroke="rgba(153,255,0,.55)" strokeWidth={1} strokeDasharray="5 4" />
      <line x1={P.l} y1={by} x2={W - P.r} y2={by} stroke="rgba(255,170,0,.2)" strokeWidth={1} strokeDasharray="2 4" />
      <line x1={P.l} y1={dy} x2={W - P.r} y2={dy} stroke="rgba(255,50,0,.55)" strokeWidth={1} strokeDasharray="5 4" />
      {curves.filter(c => !c.pass).map((c, i) => <path key={`f${i}`} d={pathD(c.pts)} fill="none" stroke="rgba(255,50,0,.18)" strokeWidth={1} />)}
      {curves.filter(c => c.pass).map((c, i) => <path key={`p${i}`} d={pathD(c.pts)} fill="none" stroke="rgba(153,255,0,.2)" strokeWidth={1} />)}
      <line x1={P.l} y1={P.t} x2={P.l} y2={H - P.b} stroke="#331a00" strokeWidth={1} />
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
  const p = phases[0];
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

  const streak = Math.ceil(p.maxDD / riskPct);
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
const AC = { danger: "#ff3300", warning: "#ffaa00", success: "#99ff00", info: "#44aaff" };
const pCol = p => p > .65 ? "#99ff00" : p > .4 ? "#ffdd00" : p > .25 ? "#ffaa00" : p > .1 ? "#ff7700" : "#ff3300";
const pLbl = (p, t) => p > .65 ? t.excellent : p > .4 ? t.high : p > .25 ? t.moderate : p > .1 ? t.low : t.vlow;
const fmt = (n, d = 0) => Number(n).toLocaleString("en", { maximumFractionDigits: d });
const glow = c => ({ textShadow: `0 0 8px ${c}88` });

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang] = useState("en");
  const t = TR[lang];

  const [firmKey, setFirmKey] = useState("ftmo");
  const [customName, setCustomName] = useState("MY FIRM");
  const [acctSize, setAcctSize] = useState(10000);
  const [customAcct, setCustomAcct] = useState(10000);
  const [phases, setPhases] = useState(() => FIRMS.ftmo.phases.map(p => ({ ...p })));
  const [activeTab, setActiveTab] = useState(0);
  const [strat, setStrat] = useState({ winRate: 50, rr: 2, riskPct: 1, tpd: 3 });
  const [results, setResults] = useState(null);
  const [running, setRunning] = useState(false);
  const [modalType, setModalType] = useState(null);

  const firm = FIRMS[firmKey];
  const acct = firmKey === "custom" ? customAcct : acctSize;

  /* Firm selection */
  const pickFirm = k => {
    setFirmKey(k);
    const np = FIRMS[k].phases.map(p => ({ ...p }));
    setPhases(np);
    if (FIRMS[k].sizes.length > 0) setAcctSize(FIRMS[k].sizes[0]);
    setActiveTab(0);
    setResults(null);
  };

  /* Phase CRUD — fixed tab management */
  const editPhase = (idx, field, v) => {
    const n = parseFloat(v);
    if (!isNaN(n) && n >= 0) setPhases(prev => prev.map((p, i) => i === idx ? { ...p, [field]: n } : p));
  };

  const addPhase = () => {
    if (phases.length >= 3) return;
    const newPhase = { name: `PHASE ${phases.length + 1}`, profitTarget: 5, maxDD: 10, dailyDD: 5, minDays: 10, maxDays: 60 };
    const newPhases = [...phases, newPhase];
    setPhases(newPhases);
    setActiveTab(newPhases.length - 1); // auto-switch to new phase
  };

  const delPhase = idx => {
    if (phases.length <= 1) return;
    const newPhases = phases.filter((_, i) => i !== idx);
    setPhases(newPhases);
    setActiveTab(Math.max(0, Math.min(activeTab, newPhases.length - 1)));
  };

  /* Simulation */
  const run = () => {
    setRunning(true);
    setTimeout(() => {
      try {
        const pr = phases.map(phase => simulate({ winRate: strat.winRate, rr: strat.rr, riskPct: strat.riskPct, tradesPerDay: strat.tpd, phase }));
        setResults({
          overall: pr.reduce((a, r) => a * r.prob, 1),
          probs: pr.map(r => r.prob),
          trades: pr.reduce((a, r) => a + r.expectedTrades, 0),
          days: pr.reduce((a, r) => a + r.expectedDays, 0),
          profit: pr.reduce((a, r) => a + r.expectedProfit, 0),
          avgDD: pr[0].avgDD,
          ruin: pr[0].riskRuin,
          curves: pr[0].curves,
          phaseResults: pr,
        });
      } finally {
        setRunning(false);
      }
    }, 60);
  };

  /* Derived */
  const ev = (strat.winRate / 100) * strat.rr - (1 - strat.winRate / 100);
  const bkWR = 100 / (strat.rr + 1);
  const evCol = ev >= 0 ? "#99ff00" : "#ff3300";
  const minTrades = Math.ceil(phases[0].profitTarget / ((strat.riskPct / 100) * strat.rr * (strat.winRate / 100)));
  const rng = (v, lo, hi) => ({ background: `linear-gradient(90deg,var(--amber) ${((v - lo) / (hi - lo)) * 100}%,var(--bg2) ${((v - lo) / (hi - lo)) * 100}%)` });

  /* Micro styles */
  const LBL = { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--text2)", display: "block", marginBottom: 8 };
  const safe = activeTab < phases.length ? activeTab : 0;

  return (
    <div style={{ fontFamily: "var(--mono)", background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      <style>{CSS}</style>

      {/* ══ HEADER ══════════════════════════════════════════════════ */}
      <header style={{ background: "#050300", borderBottom: "2px solid #2a1400", padding: "0 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,170,0,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,170,0,.025) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <div style={{ position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)", width: 500, height: 120, background: "radial-gradient(ellipse,rgba(255,170,0,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 72, display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ fontFamily: "var(--vt)", fontSize: 21, color: "var(--amber)", letterSpacing: 3, ...glow("#ffaa00") }}>
              {t.title}<span className="blink" style={{ color: "var(--amber3)" }}>_</span>
            </div>
            <div style={{ fontSize: 9, color: "var(--text2)", letterSpacing: 1, marginTop: 2 }}>{t.sub}</div>
          </div>
          <button onClick={() => setLang(l => l === "en" ? "fr" : "en")}
            style={{ background: "var(--bg2)", border: "1px solid var(--dimb)", color: "var(--amber)", padding: "6px 14px", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 2 }}>
            [{lang === "en" ? "🇫🇷 FR" : "🇬🇧 EN"}]
          </button>
        </div>
      </header>

      {/* ══ MAIN ════════════════════════════════════════════════════ */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "22px 20px" }}>
        <div className="twocol" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

          {/* ──── LEFT ──── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* FIRM + ACCOUNT ─────────────────────────────────── */}
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
              {firm.sizes.length > 0 ? (
                <select value={acctSize} onChange={e => setAcctSize(Number(e.target.value))}>
                  {firm.sizes.map(sz => <option key={sz} value={sz}>${sz.toLocaleString()}</option>)}
                </select>
              ) : (
                <input className="ni" type="number" value={customAcct}
                  onChange={e => setCustomAcct(Number(e.target.value))} min={100} placeholder="10000" />
              )}
              <div style={{ fontSize: 11, color: "var(--dimb)", marginTop: 6, letterSpacing: 1 }}>
                1% = ${fmt(acct * 0.01, 0)}  ·  TARGET = ${fmt(acct * phases[0].profitTarget / 100, 0)}  ·  MAX DD = ${fmt(acct * phases[0].maxDD / 100, 0)}
              </div>
            </div>

            {/* PHASES ─────────────────────────────────────────── */}
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

              {/* tabs */}
              <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                {phases.map((p, i) => (
                  <button key={i} className={`ptab${safe === i ? " on" : ""}`} onClick={() => setActiveTab(i)}>
                    {p.name}
                  </button>
                ))}
              </div>

              {/* phase fields */}
              {phases.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { f: "profitTarget", label: `🎯 ${t.target}`, sfx: "%" },
                    { f: "maxDD", label: `📉 ${t.maxdd}`, sfx: "%" },
                    { f: "dailyDD", label: `📅 ${t.daily}`, sfx: "%" },
                    { f: "minDays", label: `▸ ${t.mind}`, sfx: "D" },
                    { f: "maxDays", label: `⏳ ${t.maxd}`, sfx: "D" },
                  ].map(({ f, label, sfx }) => (
                    <div key={f}>
                      <span style={{ ...LBL, fontSize: 9 }}>{label}</span>
                      <div style={{ position: "relative" }}>
                        <input className="ni" type="number"
                          value={phases[safe][f]}
                          onChange={e => editPhase(safe, f, e.target.value)}
                          step={f.includes("Days") ? 1 : 0.5} min={0}
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

            {/* STRATEGY ───────────────────────────────────────── */}
            <div className="panel">
              <div className="shd">{t.strat}</div>

              {[
                { key: "winRate", label: `🎯 ${t.wr}`, min: 20, max: 85, step: 1, sfx: "%" },
                { key: "riskPct", label: `💰 ${t.risk}`, min: 0.1, max: 5, step: 0.1, sfx: "%" },
                { key: "tpd", label: `📊 ${t.tpd}`, min: 1, max: 20, step: 1, sfx: "" },
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

              {/* Metrics row */}
              <div style={{ borderTop: "1px dashed var(--dim)", paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
                {[
                  { label: t.ev, val: `${ev >= 0 ? "+" : ""}${ev.toFixed(3)}R`, col: evCol },
                  { label: t.bk, val: `${bkWR.toFixed(1)}%`, col: strat.winRate >= bkWR ? "#99ff00" : "#ff7700" },
                  { label: t.mintrades, val: minTrades, col: "#ffaa00" },
                ].map(({ label, val, col }) => (
                  <div key={label} style={{ background: "var(--bg2)", border: "1px solid var(--dim)", padding: "8px 9px", textAlign: "center" }}>
                    <div style={{ ...LBL, fontSize: 8, textAlign: "center", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: "var(--vt)", fontSize: 19, color: col, ...glow(col) }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RUN */}
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

          {/* ──── RIGHT ──── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {!results ? (
              <div className="panel" style={{ minHeight: 440, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", borderStyle: "dashed" }}>
                <div style={{ fontFamily: "var(--vt)", fontSize: 48, color: "var(--dim)", marginBottom: 16 }}>[ — ]</div>
                <div style={{ fontFamily: "var(--mono)", color: "var(--dim)", fontSize: 11, letterSpacing: 2, maxWidth: 290, lineHeight: 1.9 }}>{t.empty}</div>
                <div className="blink" style={{ fontFamily: "var(--mono)", color: "var(--dimb)", fontSize: 10, marginTop: 18, letterSpacing: 2 }}>AWAITING INPUT_</div>
              </div>
            ) : (
              <>
                {/* GAUGE */}
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

                {/* PHASE BARS */}
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

                  {/* Stats grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px dashed var(--dim)" }}>
                    {[
                      { label: t.trades, val: results.trades, col: "#ffaa00", icon: "🔄" },
                      { label: t.days, val: `${results.days}D`, col: "#ffdd44", icon: "📅" },
                      { label: t.ruin, val: `${(results.ruin * 100).toFixed(1)}%`, col: "#ff5500", icon: "💀" },
                      { label: t.dd, val: `${results.avgDD.toFixed(2)}%`, col: "#ff8800", icon: "📉" },
                      { label: t.profit, val: `+${results.profit.toFixed(2)}%`, col: "#99ff00", icon: "💰", sub: acct > 0 ? `$${fmt(acct * results.profit / 100, 0)}` : null },
                    ].map(({ label, val, col, icon, sub }) => (
                      <div key={label} className="sbox">
                        <div style={{ ...LBL, fontSize: 9, marginBottom: 4 }}>{icon} {label}</div>
                        <div style={{ fontFamily: "var(--vt)", fontSize: 22, color: col, ...glow(col) }}>{val}</div>
                        {sub && <div style={{ fontSize: 10, color: "var(--dimb)", marginTop: 2, letterSpacing: 1 }}>{sub}</div>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CHART */}
                <div className="panel fu2">
                  <div className="shd">{t.chart}</div>
                  <EquityCurve curves={results.curves} phase={phases[0]} />
                  <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, color: "rgba(153,255,0,.7)", letterSpacing: 1 }}>▬ {results.curves.filter(c => c.pass).length} {t.passing}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,50,0,.7)", letterSpacing: 1 }}>▬ {results.curves.filter(c => !c.pass).length} {t.failing}</span>
                  </div>
                  <div style={{ fontSize: 9, color: "var(--dimb)", marginTop: 4, letterSpacing: 1 }}>* {t.ddnote}</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ══ ADVICE ══════════════════════════════════════════════════ */}
        {results && (() => {
          const advice = getAdvice(strat, { prob: results.overall, riskRuin: results.ruin, avgDD: results.avgDD }, phases, lang);
          return (
            <div className="panel" style={{ marginTop: 14 }}>
              <div className="shd">{t.advice}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
                {advice.map((a, i) => (
                  <div key={i} className="adv" style={{ borderColor: AC[a.type] }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: AC[a.type], lineHeight: 1.7, letterSpacing: .3 }}>{a[lang]}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ══ HOW TO USE ══════════════════════════════════════════════ */}
        <div className="panel" style={{ marginTop: 14 }}>
          <div className="shd">{t.how}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ fontFamily: "var(--vt)", fontSize: 20, color: "var(--amber3)", minWidth: 30, flexShrink: 0 }}>{`0${i + 1}`.slice(-2)}</div>
                <div style={{ width: 1, background: "var(--dim)", alignSelf: "stretch", flexShrink: 0 }} />
                <p style={{ margin: 0, color: "var(--text)", fontSize: 12, lineHeight: 1.75, letterSpacing: .5 }}>{step}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", border: "1px solid var(--dimb)", borderLeft: "3px solid var(--amber3)" }}>
            <p style={{ margin: 0, color: "var(--dimb)", fontSize: 11, lineHeight: 1.7, letterSpacing: .3 }}>{t.disclaimer}</p>
          </div>
        </div>
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════════════ */}
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
                <span key={l} onClick={() => setModalType(l)} style={{ color: "var(--dimb)", fontSize: 10, cursor: "pointer", letterSpacing: 1, transition: "color .15s" }}
                  onMouseEnter={e => e.target.style.color = "var(--amber3)"}
                  onMouseLeave={e => e.target.style.color = "var(--dimb)"}>
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px dashed #1a0a00", paddingTop: 14 }}>
            <div style={{ fontSize: 9, color: "var(--dimb)", letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>{t.leg}</div>
            <p style={{ margin: 0, color: "#1a0a00", fontSize: 9, lineHeight: 1.9, letterSpacing: .3 }}>{t.legTxt}</p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {modalType && (
        <div onClick={() => setModalType(null)} style={{ position: "fixed", inset: 0, background: "rgba(219, 113, 14, 0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, cursor: "pointer" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "var(--bg1)", border: "2px solid var(--amber)", maxWidth: 600, width: "90%", maxHeight: "80vh", overflow: "auto", padding: 24, cursor: "default" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--vt)", fontSize: 24, color: "var(--amber)", letterSpacing: 2 }}>{modalType}</div>
              <button onClick={() => setModalType(null)} style={{ background: "none", border: "none", color: "var(--amber)", fontSize: 24, cursor: "pointer", fontFamily: "var(--mono)" }}>X</button>
            </div>
            <div style={{ color: "var(--text)", fontSize: 12, lineHeight: 1.8, letterSpacing: .3 }}>
              {modalType === t.priv && (
                <>
                  <p style={{ marginBottom: 12 }}>LAST UPDATED: JANUARY 2025</p>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}