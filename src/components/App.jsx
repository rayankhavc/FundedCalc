import React, { useState } from 'react';
import { TrendingUp, BarChart3, Calculator, DollarSign, Percent, Target } from 'lucide-react';

const TR = {
  en: {
    title: 'Crypto Trading ROI Calculator',
    subtitle: 'Simulate your potential gains with precision',
    capital: 'Initial Capital',
    capitalPlaceholder: 'Enter your starting amount ($)',
    winRate: 'Win Rate (%)',
    winRatePlaceholder: 'Enter your win rate (0-100)',
    avgWin: 'Average Win (%)',
    avgWinPlaceholder: 'Enter average win percentage',
    avgLoss: 'Average Loss (%)',
    avgLossPlaceholder: 'Enter average loss percentage',
    tradesPerDay: 'Trades Per Day',
    tradesPerDayPlaceholder: 'Enter number of trades per day',
    tradingDays: 'Trading Days',
    tradingDaysPlaceholder: 'Enter number of trading days',
    profitTarget: 'Profit Target ($)',
    profitTargetPlaceholder: 'Enter your profit target (optional)',
    calculateBtn: 'Calculate',
    resetBtn: 'Reset',
    resultsTitle: 'Projected Results',
    totalCapitalRisk: 'Total Capital at Risk',
    totalGains: 'Total Gains',
    totalLosses: 'Total Losses',
    netProfit: 'Net Profit',
    roi: 'ROI (%)',
    daysToTarget: 'Days to Target',
    daysCap: 'days',
    notReached: 'Not reached in timeframe',
    header: 'CRYPTO TRADING ROI CALCULATOR',
    legalLinks: 'Legal Information',
    termsOfUse: 'Terms of Use',
    privacyPolicy: 'Privacy Policy',
    legalNotice: 'Legal Notice',
    close: 'Close',
    riskWarning: 'Risk Warning',
    riskWarningText: 'This simulator is provided for educational and informational purposes only. It is not financial advice. Cryptocurrency trading carries significant financial risk, including the potential loss of your entire capital. Past performance does not guarantee future results. Please consult with a qualified financial advisor before making any trading decisions.',
    gdprNotice: 'GDPR & Data Protection',
    gdprText: 'Your data is protected in accordance with GDPR regulations. We do not store or process any personal information unless explicitly provided by you. This calculator runs entirely in your browser without server-side data collection.',
    disclaimerTitle: 'Disclaimer',
    disclaimerText: 'This is a simulation tool and not a financial calculator. Results are based on inputs provided and do not account for slippage, fees, market volatility, or psychological factors. Use this tool at your own risk and responsibility.',
    copyright: 'Copyright © 2026. All rights reserved.',
    powered: 'Powered by Raythan Trade Analytics',
  },
  fr: {
    title: 'Calculateur ROI Trading Crypto',
    subtitle: 'Simulez vos gains potentiels avec précision',
    capital: 'Capital Initial',
    capitalPlaceholder: 'Entrez votre montant initial ($)',
    winRate: 'Taux de Réussite (%)',
    winRatePlaceholder: 'Entrez votre taux de réussite (0-100)',
    avgWin: 'Gain Moyen (%)',
    avgWinPlaceholder: 'Entrez le pourcentage de gain moyen',
    avgLoss: 'Perte Moyenne (%)',
    avgLossPlaceholder: 'Entrez le pourcentage de perte moyen',
    tradesPerDay: 'Trades par Jour',
    tradesPerDayPlaceholder: 'Entrez le nombre de trades par jour',
    tradingDays: 'Jours de Trading',
    tradingDaysPlaceholder: 'Entrez le nombre de jours de trading',
    profitTarget: 'Objectif de Profit ($)',
    profitTargetPlaceholder: 'Entrez votre objectif de profit (optionnel)',
    calculateBtn: 'Calculer',
    resetBtn: 'Réinitialiser',
    resultsTitle: 'Résultats Projetés',
    totalCapitalRisk: 'Capital Total en Risque',
    totalGains: 'Gains Totaux',
    totalLosses: 'Pertes Totales',
    netProfit: 'Profit Net',
    roi: 'ROI (%)',
    daysToTarget: 'Jours pour Atteindre l\'Objectif',
    daysCap: 'jours',
    notReached: 'Non atteint dans le délai',
    header: 'CALCULATEUR ROI TRADING CRYPTO',
    legalLinks: 'Informations Légales',
    termsOfUse: 'Conditions d\'Utilisation',
    privacyPolicy: 'Politique de Confidentialité',
    legalNotice: 'Mentions Légales',
    close: 'Fermer',
    riskWarning: 'Avertissement de Risque',
    riskWarningText: 'Ce simulateur est fourni à titre éducatif et informatif uniquement. Il ne constitue pas un conseil financier. Le trading de cryptomonnaies comporte un risque financier important, y compris la perte totale de votre capital. Les performances passées ne garantissent pas les résultats futurs. Veuillez consulter un conseiller financier qualifié avant de prendre des décisions de trading.',
    gdprNotice: 'RGPD et Protection des Données',
    gdprText: 'Vos données sont protégées conformément aux règlements RGPD. Nous ne stockons ni ne traitons aucune information personnelle sauf si explicitement fournie par vous. Ce calculateur s\'exécute entièrement dans votre navigateur sans collecte de données côté serveur.',
    disclaimerTitle: 'Clause de Non-Responsabilité',
    disclaimerText: 'Ceci est un outil de simulation et non un calculateur financier. Les résultats sont basés sur les entrées fournies et ne tiennent pas compte du glissement, des frais, de la volatilité du marché ou des facteurs psychologiques. Utilisez cet outil à vos propres risques et responsabilités.',
    copyright: 'Copyright © 2026. Tous droits réservés.',
    powered: 'Alimenté par Raythan Trade Analytics',
  },
};

export default function App() {
  const [language, setLanguage] = useState('en');
  const [activeModal, setActiveModal] = useState(null);
  const [capital, setCapital] = useState('');
  const [winRate, setWinRate] = useState('');
  const [avgWin, setAvgWin] = useState('');
  const [avgLoss, setAvgLoss] = useState('');
  const [tradesPerDay, setTradesPerDay] = useState('');
  const [tradingDays, setTradingDays] = useState('');
  const [profitTarget, setProfitTarget] = useState('');
  const [results, setResults] = useState(null);

  const t = TR[language];

  const calculateROI = () => {
    const cap = parseFloat(capital);
    const wr = parseFloat(winRate) / 100;
    const aw = parseFloat(avgWin) / 100;
    const al = parseFloat(avgLoss) / 100;
    const tpd = parseFloat(tradesPerDay);
    const td = parseFloat(tradingDays);
    const pt = profitTarget ? parseFloat(profitTarget) : null;

    if (!cap || !wr || !aw || !al || !tpd || !td) {
      alert('Please fill in all required fields');
      return;
    }

    const totalTrades = tpd * td;
    const winningTrades = totalTrades * wr;
    const losingTrades = totalTrades * (1 - wr);

    let currentCapital = cap;
    let daysToTarget = null;
    let daysPassed = 0;

    for (let day = 0; day < td; day++) {
      const dailyTrades = tpd;
      const dailyWins = dailyTrades * wr;
      const dailyLosses = dailyTrades * (1 - wr);

      const gains = currentCapital * dailyWins * aw;
      const losses = currentCapital * dailyLosses * al;

      currentCapital += gains - losses;
      daysPassed++;

      if (pt && currentCapital >= pt && daysToTarget === null) {
        daysToTarget = daysPassed;
      }
    }

    const totalGains = cap * winningTrades * aw;
    const totalLosses = cap * losingTrades * al;
    const netProfit = currentCapital - cap;
    const roi = (netProfit / cap) * 100;

    setResults({
      totalCapitalRisk: cap,
      totalGains,
      totalLosses,
      netProfit,
      roi,
      daysToTarget,
    });
  };

  const resetForm = () => {
    setCapital('');
    setWinRate('');
    setAvgWin('');
    setAvgLoss('');
    setTradesPerDay('');
    setTradingDays('');
    setProfitTarget('');
    setResults(null);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'terms':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-amber-400">{t.termsOfUse}</h3>
            <p className="text-gray-300">{t.disclaimerText}</p>
            <p className="text-gray-300">{t.riskWarningText}</p>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-amber-400">{t.privacyPolicy}</h3>
            <p className="text-gray-300">{t.gdprText}</p>
            <p className="text-gray-300">{t.riskWarningText}</p>
          </div>
        );
      case 'legal':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-amber-400">{t.legalNotice}</h3>
            <p className="text-gray-300">{t.disclaimerText}</p>
            <p className="text-gray-300">{t.gdprText}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Calculator className="w-8 h-8 text-amber-400" />
            <h1 className="text-2xl font-bold text-amber-400">{t.header}</h1>
          </div>
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition duration-200"
          >
            {language === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t.title}
          </h2>
          <p className="text-xl text-gray-400 flex items-center justify-center space-x-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <span>{t.subtitle}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2 text-amber-400">
              <BarChart3 className="w-6 h-6" />
              <span>Input Parameters</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  {t.capital}
                </label>
                <input
                  type="number"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  placeholder={t.capitalPlaceholder}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <Percent className="inline w-4 h-4 mr-1" />
                  {t.winRate}
                </label>
                <input
                  type="number"
                  value={winRate}
                  onChange={(e) => setWinRate(e.target.value)}
                  placeholder={t.winRatePlaceholder}
                  min="0"
                  max="100"
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  {t.avgWin}
                </label>
                <input
                  type="number"
                  value={avgWin}
                  onChange={(e) => setAvgWin(e.target.value)}
                  placeholder={t.avgWinPlaceholder}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <TrendingUp className="inline w-4 h-4 mr-1 rotate-180" />
                  {t.avgLoss}
                </label>
                <input
                  type="number"
                  value={avgLoss}
                  onChange={(e) => setAvgLoss(e.target.value)}
                  placeholder={t.avgLossPlaceholder}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <BarChart3 className="inline w-4 h-4 mr-1" />
                  {t.tradesPerDay}
                </label>
                <input
                  type="number"
                  value={tradesPerDay}
                  onChange={(e) => setTradesPerDay(e.target.value)}
                  placeholder={t.tradesPerDayPlaceholder}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <Calculator className="inline w-4 h-4 mr-1" />
                  {t.tradingDays}
                </label>
                <input
                  type="number"
                  value={tradingDays}
                  onChange={(e) => setTradingDays(e.target.value)}
                  placeholder={t.tradingDaysPlaceholder}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  <Target className="inline w-4 h-4 mr-1" />
                  {t.profitTarget}
                </label>
                <input
                  type="number"
                  value={profitTarget}
                  onChange={(e) => setProfitTarget(e.target.value)}
                  placeholder={t.profitTargetPlaceholder}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex space-x-3 pt-6">
                <button
                  onClick={calculateROI}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded transition duration-200"
                >
                  {t.calculateBtn}
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                  {t.resetBtn}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2 text-amber-400">
              <DollarSign className="w-6 h-6" />
              <span>{t.resultsTitle}</span>
            </h3>

            {results ? (
              <div className="space-y-4">
                <div className="bg-slate-700 p-4 rounded border border-slate-600">
                  <p className="text-gray-400 text-sm">{t.totalCapitalRisk}</p>
                  <p className="text-2xl font-bold text-green-400">
                    ${results.totalCapitalRisk.toFixed(2)}
                  </p>
                </div>

                <div className="bg-slate-700 p-4 rounded border border-slate-600">
                  <p className="text-gray-400 text-sm">{t.totalGains}</p>
                  <p className="text-2xl font-bold text-green-400">
                    ${results.totalGains.toFixed(2)}
                  </p>
                </div>

                <div className="bg-slate-700 p-4 rounded border border-slate-600">
                  <p className="text-gray-400 text-sm">{t.totalLosses}</p>
                  <p className="text-2xl font-bold text-red-400">
                    -${results.totalLosses.toFixed(2)}
                  </p>
                </div>

                <div className="bg-slate-700 p-4 rounded border border-amber-500">
                  <p className="text-gray-400 text-sm">{t.netProfit}</p>
                  <p className={`text-3xl font-bold ${results.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${results.netProfit.toFixed(2)}
                  </p>
                </div>

                <div className="bg-slate-700 p-4 rounded border border-slate-600">
                  <p className="text-gray-400 text-sm">{t.roi}</p>
                  <p className={`text-2xl font-bold ${results.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {results.roi.toFixed(2)}%
                  </p>
                </div>

                <div className="bg-slate-700 p-4 rounded border border-slate-600">
                  <p className="text-gray-400 text-sm">{t.daysToTarget}</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {results.daysToTarget ? `${results.daysToTarget} ${t.daysCap}` : t.notReached}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>{language === 'en' ? 'Fill in the parameters and click Calculate' : 'Remplissez les paramètres et cliquez sur Calculer'}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-amber-400 font-bold mb-4">{t.legalLinks}</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="text-gray-400 hover:text-amber-400 transition duration-200"
                  >
                    {t.termsOfUse}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="text-gray-400 hover:text-amber-400 transition duration-200"
                  >
                    {t.privacyPolicy}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('legal')}
                    className="text-gray-400 hover:text-amber-400 transition duration-200"
                  >
                    {t.legalNotice}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-bold mb-4">Information</h4>
              <p className="text-gray-400 text-sm">
                {language === 'en'
                  ? 'This is an educational simulator for cryptocurrency trading ROI calculations.'
                  : 'Ceci est un simulateur éducatif pour les calculs ROI du trading de cryptomonnaies.'}
              </p>
            </div>
            <div>
              <h4 className="text-amber-400 font-bold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">{t.powered}</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8">
            <p className="text-center text-gray-500 text-sm">{t.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-85 backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>
          <div className="relative bg-black border-4 border-amber-400 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-amber-400 hover:text-amber-300 text-2xl font-bold"
            >
              ✕
            </button>
            <div className="mt-4">
              {renderModalContent()}
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-8 w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded transition duration-200"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
