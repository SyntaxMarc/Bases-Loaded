// translations.js - Language Dictionary

const languageDictionary = {
    // App & Header
    'appTitle': { 'en': 'EV Strategy Dashboard', 'tl': 'EV Stratehiya Dashboard' },
    'languageLabel': { 'en': 'Wika/Language:', 'tl': 'Wika/Wika:' },
    'fetchDataButton': { 'en': 'FETCH SNAPSHOT (1 Request)', 'tl': 'KUHAIN ANG SNAPSHOT (1 Request)' },
    'uniqueVisitorsLabel': { 'en': 'Unique Visitors:', 'tl': 'Mga Natatanging Bisita:' },
    'totalViewsLabel': { 'en': 'Total Views:', 'tl': 'Kabuuang Pagtingin:' },

    // Dashboard & Controls
    'mainDashboardTitle': { 'en': 'Today\'s Value Bets', 'tl': 'Mga Pustang May Halaga Ngayon' },
    'sortLabel': { 'en': 'Sort By:', 'tl': 'Ayusin Ayon sa:' },
    'sortDefault': { 'en': 'Default (Time)', 'tl': 'Default (Oras)' },
    'sortEV': { 'en': 'EV (High to Low)', 'tl': 'EV (Mataas hanggang Mababa)' },
    'sortStake': { 'en': 'Stake (High to Low)', 'tl': 'Pusta (Mataas hanggang Mababa)' },
    'filterLabel': { 'en': 'Filter:', 'tl': 'I-filter:' },
    'filterLowVig': { 'en': 'Sharp Markets (Low VIG)', 'tl': 'Matalas na Merkado (Mababang VIG)' },
    'filterHighVig': { 'en': 'Soft Markets (High VIG)', 'tl': 'Malambot na Merkado (Mataas na VIG)' },
    'filterLineup': { 'en': 'Lineup Alerts', 'tl': 'Alerto sa Lineup' },
    'filterReset': { 'en': 'Show All', 'tl': 'Ipakita Lahat' },

    // Best Play
    'bestPlayTitle': { 'en': '⭐ Best Value Play of the Day', 'tl': '⭐ Pinakamahusay na Value Play Ngayon' },
    'noBestPlay': { 'en': 'Analyzing market for elite value...', 'tl': 'Sinisuri ang merkado para sa elite na halaga...' },
    
    // Calculator
    'manualEVTitle': { 'en': 'Manual EV Calculator', 'tl': 'Manu-manong EV Calculator' },
    'inputOddsLabel': { 'en': 'Book Odds (Decimal):', 'tl': 'Book Odds (Decimal):' },
    'inputProbLabel': { 'en': 'Your Model Probability (%):', 'tl': 'Probabilidad ng Iyong Modelo (%):' },
    'calculateButton': { 'en': 'Calculate EV', 'tl': 'Kalkulahin ang EV' },
    'actionVerdictTitle': { 'en': 'Action Verdict:', 'tl': 'Desisyon sa Pusta:' },
    'verdictInput': { 'en': 'Input Required', 'tl': 'Kailangan ang Input' },
    'verdictStrongBuy': { 'en': '🔥 STRONG BUY! Elite Value Bet', 'tl': '🔥 MALAKAS NA BILHIN! Elite Value Bet' },
    'verdictGoodValue': { 'en': '✅ GOOD VALUE. Place Standard Unit', 'tl': '✅ MAGANDANG HALAGA. Pusta ng Standard Unit' },
    'verdictMarginal': { 'en': '⚠️ MARGINAL VALUE. Place Min Unit Only', 'tl': '⚠️ MARGINAL NA HALAGA. Pusta Lamang ng Min Unit' },
    'verdictAvoid': { 'en': '❌ AVOID. Negative or Zero EV', 'tl': '❌ IWASAN. Negatibo o Zero EV' },

    // Portfolio
    'portfolioTitle': { 'en': 'EV Portfolio Simulation (Today)', 'tl': 'EV Portfolio Simula (Ngayon)' },
    'expectedGain': { 'en': 'Expected Unit Gain', 'tl': 'Inaasahang Dagdag na Unit' },
    'totalWagered': { 'en': 'Total Units Wagered', 'tl': 'Kabuuang Unit na Pinusta' },
    'projectedROI': { 'en': 'Projected ROI', 'tl': 'Proyektadong ROI' },
    'portfolioEmpty': { 'en': 'Add +EV bets to your portfolio below.', 'tl': 'Magdagdag ng +EV na pusta sa iyong portfolio sa ibaba.' },
    'buttonAdded': { 'en': '✅ Added', 'tl': '✅ Naidagdag' },
    'buttonAdd': { 'en': 'Add', 'tl': 'Idagdag' },
    'cannotAddAlert': { 'en': 'Cannot add to portfolio: EV must be at least +0.5% to be considered a value bet.', 'tl': 'Hindi pwedeng idagdag sa portfolio: Ang EV ay dapat na hindi bababa sa +0.5% para ituring na value bet.' },

    // Daily Results
    'dailyResultsTitle': { 'en': '🎯 Day-End Mock Results', 'tl': '🎯 Peke na Resulta sa Katapusan ng Araw' },
    'todayROILabel': { 'en': 'Today\'s Mock ROI', 'tl': 'Peke na ROI Ngayon' },
    'todayUnitsPL': { 'en': 'Today\'s Units P/L', 'tl': 'Units P/L Ngayon' },
    'weeklyUnitsPL': { 'en': 'Weekly Units P/L', 'tl': 'Lingguhang Units P/L' },
    'settledBetsHeader': { 'en': 'Today\'s Settled Bets', 'tl': 'Mga Naayos na Pusta Ngayon' },
    'noSettledBets': { 'en': 'Simulate the day\'s results below!', 'tl': 'Simulahin ang mga resulta ng araw sa ibaba!' },
    'simulateButton': { 'en': '🎲 SIMULATE TODAY\'S OUTCOMES', 'tl': '🎲 SIMULAHIN ANG RESULTA NGAYON' },
    'resetButton': { 'en': '🔄 RESET ALL MOCK DATA', 'tl': '🔄 I-RESET ANG LAHAT NG PEKE NA DATOS' },
    
    // Chart
    'chartTitle': { 'en': '📈 Simulated Bankroll Growth (Long-Term View)', 'tl': '📈 Simula ng Paglago ng Bankroll (Pangmatagalang View)' },

    // Game Card / Data
    'oddsLabel': { 'en': 'Odds', 'tl': 'Odds' },
    'evLabel': { 'en': 'EV', 'tl': 'EV' },
    'stakeLabel': { 'en': 'Stake', 'tl': 'Pusta' },
    'confidenceLabel': { 'en': 'Market Confidence', 'tl': 'Kumpiyansa sa Merkado' },
    'highConfidence': { 'en': 'High', 'tl': 'Mataas' },
    'mediumConfidence': { 'en': 'Medium', 'tl': 'Katamtaman' },
    'lowConfidence': { 'en': 'Low', 'tl': 'Mababa' },
    'lineupLabel': { 'en': 'Lineup', 'tl': 'Lineup' },
    'expectedLineup': { 'en': 'Expected', 'tl': 'Inaasahan' },
    'impactfulLineup': { 'en': 'Impactful', 'tl': 'Maimpluwensya' },
    'resultWIN': { 'en': 'WIN', 'tl': 'PANALO' },
    'resultLOSS': { 'en': 'LOSS', 'tl': 'TALO' },

    // Glossary (omitted for brevity, assume content exists)
    'glossaryEV': { 'en': 'Expected Value (EV): The average profit/loss expected from a bet if placed repeatedly. Sharp bettors only place +EV bets.', 'tl': 'Expected Value (EV): Ang average na tubo/talo na inaasahan mula sa isang pusta kung paulit-ulit itong ilalagay. Ang mga sharp bettor ay pumupusta lamang sa mga +EV bets.' },
    'glossaryVIG': { 'en': 'Vigorish (VIG): The bookmaker\'s commission, or the "juice." High VIG means the line is softer and less certain.', 'tl': 'Vigorish (VIG): Ang komisyon ng bookmaker. Ang mataas na VIG ay nangangahulugang mas malambot at hindi sigurado ang linya.' },
    'glossaryROI': { 'en': 'Return on Investment (ROI): Total profit divided by total money risked. The key long-term measure of success.', 'tl': 'Return on Investment (ROI): Kabuuang tubo na hinati sa kabuuang pera na ipinusta. Ang pangunahing panukat para sa pangmatagalang tagumpay.' },
    'glossaryUnit': { 'en': 'Unit (U): The standardized size of your bet, used for disciplined bankroll management (typically 1-3% of total bankroll).', 'tl': 'Unit (U): Ang standardized na laki ng iyong pusta, ginagamit para sa disiplinadong bankroll management.' },
};
