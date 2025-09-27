// script.js - Core Logic, State Management, and Event Listeners

// =======================================================================
// Global State, Constants, and Budget/Visitor Tracking
// =======================================================================

// --- Admin & Budget Constants ---
const ADMIN_PASSWORD = "admin8pm"; // <<< CHOOSE YOUR OWN SECURE CODE
const MAX_REQUESTS_PER_MONTH = 500;
const LS_REQUEST_COUNT_KEY = 'apiRequestsUsed';

// --- Visitor Tracking Constants ---
const UNIQUE_VISITOR_FLAG = 'dashboardVisited';
const LS_UNIQUE_COUNT_KEY = 'globalUniqueVisitorCount';
const LS_TOTAL_VIEWS_KEY = 'globalTotalViewsCount';

// --- Application State (Load from Local Storage or initialize) ---
let currentPortfolio = []; // Stored only in session for now
let currentLang = localStorage.getItem('appLang') || 'en';
let currentSortCriteria = 'default';
let currentFilterType = 'all';

// Trackers
let lastUpdateTime = localStorage.getItem('lastApiUpdate') || 'Never';
let apiRequestsUsed = parseInt(localStorage.getItem(LS_REQUEST_COUNT_KEY) || '0');
let globalUniqueVisitors = parseInt(localStorage.getItem(LS_UNIQUE_COUNT_KEY) || '0');
let globalTotalViews = parseInt(localStorage.getItem(LS_TOTAL_VIEWS_KEY) || '0');

// Mock Historical Data (For Charting)
let mockHistoricalData = [
    { day: 1, bankroll: 1000, profit: 0 }, { day: 5, bankroll: 1020, profit: 5 }, 
    { day: 10, bankroll: 1048, profit: 8 }, { day: 15, bankroll: 1070, profit: -5 },
    { day: 20, bankroll: 1105, profit: 5 }, { day: 30, bankroll: 1170, profit: 15 },
];


// =======================================================================
// Utility Functions (EV, Staking, VIG)
// =======================================================================

function calculateEV(odds, trueProbability) {
    const probDecimal = trueProbability / 100;
    // EV = (Probability * Odds) - 1
    return ((probDecimal * odds) - 1) * 100;
}

function determineStake(evPercent) {
    if (evPercent >= 5.0) return 3.0;
    if (evPercent >= 3.0) return 2.0;
    if (evPercent >= 2.0) return 1.0;
    if (evPercent >= 0.5) return 0.5;
    return 0.0;
}

function getMarketConfidence(oddsHome, oddsAway) {
    const ipHome = 1 / oddsHome;
    const ipAway = 1 / oddsAway;
    const vigPercent = ((ipHome + ipAway) - 1) * 100;
    
    let score;
    let message;

    if (vigPercent >= 8.0) {
        score = 'Low';
        message = `VIG: ${vigPercent.toFixed(1)}%. Wide market. Higher chance of price errors!`;
    } else if (vigPercent >= 5.0) {
        score = 'Medium';
        message = `VIG: ${vigPercent.toFixed(1)}%. Standard market width.`;
    } else {
        score = 'High';
        message = `VIG: ${vigPercent.toFixed(1)}%. Market is tight and confident.`;
    }
    return { score, message };
}

// =======================================================================
// Data Processing and Budget/Visitor Tracking
// =======================================================================

function initializeGameData() {
    // This function applies all the EV logic to the raw data (from mock_data.js)
    // and makes the data ready for display.
    mockGameData = mockGameData.map(game => {
        const homeEV = calculateEV(game.oddsHome, game.probHome);
        const awayEV = calculateEV(game.oddsAway, game.probAway);
        
        const teamToBet = homeEV > awayEV ? game.home : game.away;
        const evToBet = Math.max(homeEV, awayEV);
        const oddsToBet = teamToBet === game.home ? game.oddsHome : game.oddsAway;
        const stake = determineStake(evToBet);
        const marketConfidence = getMarketConfidence(game.oddsHome, game.oddsAway);
        
        // Ensure lineup status is consistent for the mock data
        const lineupStatus = game.lineupStatus || (Math.random() > 0.8 ? 'Impactful' : 'Expected'); 

        return {
            ...game,
            teamToBet,
            oddsToBet,
            evToBet,
            stake,
            marketConfidenceScore: marketConfidence.score,
            marketConfidenceMessage: marketConfidence.message,
            lineupStatus: lineupStatus,
        };
    });
}

function fetchAndRenderData() {
    // CRITICAL: Budget Check and Increment
    if (apiRequestsUsed >= MAX_REQUESTS_PER_MONTH) {
        alert("API BUDGET EXCEEDED: Cannot fetch new data until next month.");
        return; 
    }

    console.log("Simulating API Call: Fetching new snapshot...");

    // 1. Increment Budget Counter
    apiRequestsUsed++;
    localStorage.setItem(LS_REQUEST_COUNT_KEY, apiRequestsUsed);

    // 2. Update Timestamp and Process Data
    lastUpdateTime = new Date().toLocaleTimeString();
    localStorage.setItem('lastApiUpdate', lastUpdateTime);
    initializeGameData(); 
    
    // 3. Update UI
    updateHeaderStatus();
    renderGames(); 
    findBestEVPlay();
    renderPortfolio(); 
}

function updateHeaderStatus() {
    document.getElementById('data-update-status').textContent = `Data Last Updated: ${lastUpdateTime}`;
    document.getElementById('budget-status').textContent = `API Budget: ${apiRequestsUsed}/${MAX_REQUESTS_PER_MONTH} Used`;
}

function trackVisitors() {
    let isNewVisitor = localStorage.getItem(UNIQUE_VISITOR_FLAG) === null;

    // 1. Increment Total Views
    globalTotalViews++;
    localStorage.setItem(LS_TOTAL_VIEWS_KEY, globalTotalViews);

    // 2. Check for Unique Visitor (via local browser flag)
    if (isNewVisitor) {
        globalUniqueVisitors++;
        localStorage.setItem(LS_UNIQUE_COUNT_KEY, globalUniqueVisitors);
        localStorage.setItem(UNIQUE_VISITOR_FLAG, 'true');
    }

    // 3. Render the counts on the dashboard
    document.getElementById('unique-visitors-count').textContent = globalUniqueVisitors;
    document.getElementById('total-views-count').textContent = globalTotalViews;
}

// =======================================================================
// Translation and Rendering (omitted for brevity, assume full functions exist)
// =======================================================================

function translatePage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (languageDictionary[key] && languageDictionary[key][lang]) {
            element.textContent = languageDictionary[key][lang];
        }
    });
    // Must re-render dynamic content to apply translations
    renderGames(); 
    findBestEVPlay();
    // ... (other renders)
}

function renderGames() { /* ... full function for filtering, sorting, and displaying cards ... */ }
function findBestEVPlay() { /* ... full function for finding and rendering best play ... */ }
function renderPortfolio() { /* ... full function for updating portfolio display ... */ }
function calculateManualEV() { /* ... full function for manual calculator ... */ }
// ... (All other helper functions) ...

// =======================================================================
// DOM Load and Event Listeners
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INITIAL SETUP
    trackVisitors();
    updateHeaderStatus();
    
    // Load translation preference and apply initial translations
    document.getElementById('language-select').value = currentLang;
    translatePage(currentLang);

    // Initial data fetch (Simulates the guaranteed 8PM or first load request)
    fetchAndRenderData();

    // 2. EVENT LISTENERS
    
    // Language Switch Listener
    document.getElementById('language-select').addEventListener('change', (event) => {
        const newLang = event.target.value;
        localStorage.setItem('appLang', newLang);
        translatePage(newLang);
    });
    
    // ADMIN LOCK & API Fetch Listener
    const adminInput = document.getElementById('admin-code-input');
    const fetchButton = document.getElementById('fetch-data-btn');

    adminInput.addEventListener('input', () => {
        const isBudgetAvailable = apiRequestsUsed < MAX_REQUESTS_PER_MONTH;

        if (adminInput.value === ADMIN_PASSWORD && isBudgetAvailable) {
            fetchButton.classList.remove('disabled');
            fetchButton.removeAttribute('disabled');
            adminInput.style.borderColor = '#4CAF50';
        } else {
            fetchButton.classList.add('disabled');
            fetchButton.setAttribute('disabled', 'disabled');
            adminInput.style.borderColor = '#555';
        }
    });

    fetchButton.addEventListener('click', () => {
        // Only run if the button is enabled (via Admin Code and budget check)
        if (!fetchButton.classList.contains('disabled')) {
            fetchAndRenderData();
        }
    });

    // ... (Remaining listeners for Sort, Filter, Portfolio Add, Calculator, etc.) ...

    // Portfolio Action Listener
    document.getElementById('games-container').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-portfolio-btn')) {
            // Simplified togglePortfolioBet placeholder logic
            alert("Portfolio function placeholder executed.");
        }
    });

    // Calculator Listener
    document.getElementById('calculate-ev-btn').addEventListener('click', calculateManualEV);

});
