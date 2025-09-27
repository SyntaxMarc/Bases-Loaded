// --- NEW UTILITY FUNCTION: ODDS TO PROBABILITY ---
function calculateImpliedProbability(odds) {
    if (odds < 0) {
        // Favorite (Negative Odds): (-odds) / ((-odds) + 100) * 100
        return (-odds) / ((-odds) + 100) * 100;
    } else if (odds > 0) {
        // Underdog (Positive Odds): 100 / (odds + 100) * 100
        return 100 / (odds + 100) * 100;
    }
    return 50.0; // Assume 50% for 0 odds (push/tie)
}

// Mock Data (Updated to simulate The Odds API structure)
const mockGames = [
  {
    home: "Yankees",
    away: "Red Sox",
    h2h: "50%",
    pitcher: "Strong",
    last10: "7-3",
    recommendation: "Home",
    // --- MOCK ODDS ADDED ---
    bookmakers: [{
        title: "BetMGM",
        markets: [{
            key: "h2h",
            outcomes: [
                { name: "New York Yankees", price: -150 }, // Home
                { name: "Boston Red Sox", price: 130 },   // Away
            ]
        }]
    }]
  },
  {
    home: "Dodgers",
    away: "Giants",
    h2h: "45%",
    pitcher: "Average",
    last10: "5-5",
    recommendation: "Away",
    // --- MOCK ODDS ADDED ---
    bookmakers: [{
        title: "FanDuel",
        markets: [{
            key: "h2h",
            outcomes: [
                { name: "Los Angeles Dodgers", price: 110 }, // Home
                { name: "San Francisco Giants", price: -130 }, // Away
            ]
        }]
    }]
  }
];

// API Keys
const oddsApiKey = "6d667177117b78ce8b2c728ee4721cb9";
// NOTE: Balldontlie.io is for the NBA. A better MLB API is needed for stats.
const balldontlieApi = "03b94385-b4ec-4575-9bb8-1f5954410c64"; 

let oddsApiCount = 0;

// Fetch OddsAPI (example)
async function fetchOddsAPI() {
    // Note: Use this only for debugging API counts
    // if (oddsApiCount >= 500) return; 
    // oddsApiCount++; 
    
    // Example request
    try {
        const res = await fetch(`https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?apiKey=${oddsApiKey}&regions=us&markets=h2h`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("OddsAPI fetch error, using mock data.");
        return mockGames;
    }
}

// Fetch Ball Don't Lie API (Placeholder/To be replaced with MLB Stats API)
async function fetchBalldontlie() {
    try {
        const res = await fetch(`https://www.balldontlie.io/api/v1/games`);
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.log("Balldontlie fetch error, returning empty array.");
        return [];
    }
}

// --- MODIFIED RENDER CARDS FUNCTION ---
function renderCards(games) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";
    
    // Process each game to extract and calculate key data
    games.forEach(game => {
        let homeTeamOdds = 'N/A';
        let awayTeamOdds = 'N/A';
        let homeProb = 'N/A';
        let awayProb = 'N/A';
        let bookmakerTitle = 'N/A';
        
        // Find a valid bookmaker/market from the API data
        const bookmaker = game.bookmakers && game.bookmakers[0];
        if (bookmaker) {
            bookmakerTitle = bookmaker.title;
            const h2hMarket = bookmaker.markets && bookmaker.markets.find(m => m.key === 'h2h');
            
            if (h2hMarket && h2hMarket.outcomes) {
                // Determine home/away odds based on team name. Uses .includes() for flexible matching.
                const homeOutcome = h2hMarket.outcomes.find(o => o.name.includes(game.home));
                const awayOutcome = h2hMarket.outcomes.find(o => o.name.includes(game.away));

                if (homeOutcome) {
                    homeTeamOdds = homeOutcome.price;
                    homeProb = calculateImpliedProbability(homeTeamOdds).toFixed(1);
                }
                if (awayOutcome) {
                    awayTeamOdds = awayOutcome.price;
                    awayProb = calculateImpliedProbability(awayTeamOdds).toFixed(1);
                }
            }
        }
        
        // --- Card Generation with New Data ---
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${game.home} vs ${game.away}</h3>
            <p>Odds Source: ${bookmakerTitle}</p>
            <p>
                ${game.home} Odds: 
                <strong>${homeTeamOdds}</strong> 
                <span class="probability">(${homeProb}%)</span>
            </p>
            <p>
                ${game.away} Odds: 
                <strong>${awayTeamOdds}</strong> 
                <span class="probability">(${awayProb}%)</span>
            </p>
            <hr>
            <p>H2H: ${game.h2h}</p>
            <p>Pitcher: ${game.pitcher}</p>
            <p>Last 10: ${game.last10}</p>
            <p>Recommendation: <strong>${game.recommendation}</strong></p>
        `;
        container.appendChild(card);
    });
}

// Main
async function main() {
    const oddsData = await fetchOddsAPI();
    const balldontlieData = await fetchBalldontlie(); // Currently not used for rendering

    // Use odds data for display if available, otherwise use mockGames
    const displayData = Array.isArray(oddsData) && oddsData.length ? oddsData.slice(0, 5) : mockGames;

    renderCards(displayData);
}

main();
