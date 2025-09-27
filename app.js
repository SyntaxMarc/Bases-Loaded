// --- CONFIG ---
const oddsAPIKey = "6d667177117b78ce8b2c728ee4721cb9";
const balldontlieURL = "https://www.balldontlie.io/api/v1/games";
let oddsAPIUsed = 0;
let balldontlieUsed = 0;

// --- MOCK DATA (backup) ---
const mockGames = [
  {
    date: "2025-09-27T18:30:00Z",
    team1: "Yankees",
    team2: "Red Sox",
    recommended: "Yankees",
    odds: { team1: 1.9, team2: 1.85 }
  },
  {
    date: "2025-09-27T21:00:00Z",
    team1: "Dodgers",
    team2: "Giants",
    recommended: "Dodgers",
    odds: { team1: 1.75, team2: 2.05 }
  }
];

// --- DOM Elements ---
const gamesContainer = document.getElementById("games-container");
const oddsapiCountEl = document.getElementById("oddsapi-count");
const balldontlieCountEl = document.getElementById("balldontlie-count");

// --- UTIL FUNCTIONS ---
function formatPHTime(utcStr) {
  const date = new Date(utcStr);
  const phOffset = 8 * 60; // +8 hrs
  const localDate = new Date(date.getTime() + phOffset*60000);
  return localDate.toLocaleString();
}

function createGameCard(game) {
  const card = document.createElement("div");
  card.className = "game-card";
  card.innerHTML = `
    <h3>${game.team1} vs ${game.team2}</h3>
    <p>Date: ${formatPHTime(game.date)}</p>
    <p>Recommended: <span class="recommended">${game.recommended}</span></p>
    <p>Odds: ${game.team1} (${game.odds.team1}) - ${game.team2} (${game.odds.team2})</p>
  `;
  return card;
}

function renderGames(games) {
  gamesContainer.innerHTML = "";
  games.forEach(game => {
    gamesContainer.appendChild(createGameCard(game));
  });
}

// --- API FETCH FUNCTIONS ---
async function fetchOddsAPI() {
  try {
    // NOTE: Replace with your actual API endpoint
    const url = `https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?apiKey=${oddsAPIKey}`;
    const res = await fetch(url);
    oddsAPIUsed++;
    oddsapiCountEl.textContent = oddsAPIUsed;
    if (!res.ok) throw new Error("OddsAPI fetch error");
    const data = await res.json();
    // map data to our card structure
    const games = data.map(g => ({
      date: g.commence_time,
      team1: g.home_team,
      team2: g.away_team,
      recommended: g.home_team, // simple mock logic
      odds: { team1: g.bookmakers[0].markets[0].outcomes[0].price, team2: g.bookmakers[0].markets[0].outcomes[1].price }
    }));
    return games;
  } catch (err) {
    console.warn(err);
    return mockGames; // fallback
  }
}

async function fetchBalldontlie() {
  try {
    const res = await fetch(`${balldontlieURL}`);
    balldontlieUsed++;
    balldontlieCountEl.textContent = balldontlieUsed;
    if (!res.ok) throw new Error("Balldontlie fetch error");
    const data = await res.json();
    // map to simplified structure
    const games = data.data.slice(0, 5).map(g => ({
      date: g.date,
      team1: g.home_team.full_name,
      team2: g.visitor_team.full_name,
      recommended: g.home_team.full_name, // simple mock logic
      odds: { team1: 1.9, team2: 1.85 } // placeholder
    }));
    return games;
  } catch (err) {
    console.warn(err);
    return mockGames;
  }
}

// --- MAIN FUNCTION ---
async function initDashboard() {
  const oddsGames = await fetchOddsAPI();
  const balldontlieGames = await fetchBalldontlie();
  const combinedGames = [...oddsGames, ...balldontlieGames];
  renderGames(combinedGames);
}

initDashboard();
