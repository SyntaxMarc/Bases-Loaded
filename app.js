// Mock Data
const mockGames = [
  {
    home: "Yankees",
    away: "Red Sox",
    h2h: "50%",
    pitcher: "Strong",
    last10: "7-3",
    recommendation: "Home",
  },
  {
    home: "Dodgers",
    away: "Giants",
    h2h: "45%",
    pitcher: "Average",
    last10: "5-5",
    recommendation: "Away",
  }
];

// API Keys
const oddsApiKey = "6d667177117b78ce8b2c728ee4721cb9";
const balldontlieApi = "03b94385-b4ec-4575-9bb8-1f5954410c64";

let oddsApiCount = 0;

// Fetch OddsAPI (example)
async function fetchOddsAPI() {
  if (oddsApiCount >= 500) return;
  oddsApiCount++;
  document.getElementById("oddsapi-count").innerText = oddsApiCount;

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

// Fetch Ball Don't Lie API
async function fetchBalldontlie() {
  try {
    const res = await fetch(`https://www.balldontlie.io/api/v1/games`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log("Balldontlie fetch error, using mock data.");
    return mockGames;
  }
}

// Render Cards
function renderCards(games) {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";
  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${game.home} vs ${game.away}</h3>
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
  const balldontlieData = await fetchBalldontlie();

  // Merge or prioritize API data, fallback to mock
  const displayData = oddsData.length ? oddsData.slice(0, 5) : mockGames;

  renderCards(displayData);
}

main();
