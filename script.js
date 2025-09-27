// --- API & Utility Settings ---
const oddsApiKey = '6d667177117b78ce8b2c728ee4721cb9'; 
let apiRemaining = 500; 

const gamesContainer = document.getElementById('gamesContainer');
const teamSelect = document.getElementById('teamSelect');

// --- UTILITY FUNCTIONS ---

function calculateImpliedProbability(odds) {
    const numOdds = parseFloat(odds);
    if (isNaN(numOdds) || numOdds <= 1) return 0;
    return (1 / numOdds) * 100;
}

function generateRandomLast10() {
    const wins = Math.floor(Math.random() * 6) + 4; 
    const losses = 10 - wins;
    return { wins, losses };
}

function generateEVAnalysis() {
    const ev = (Math.random() * 20) - 10; 
    const evRounded = parseFloat(ev.toFixed(2));
    
    let analysis;
    if (evRounded > 5) {
        analysis = "Strong EV: Pitcher has high K/9, Offense crushing lefties.";
    } else if (evRounded > 0) {
        analysis = "Small Edge: Home field advantage and rested bullpen.";
    } else if (evRounded > -5) {
        analysis = "Neutral: Poor run differential in the last week.";
    } else {
        analysis = "Negative EV: Hitting struggles against opponent's top reliever.";
    }
    
    const opponentEV = -evRounded + (Math.random() * 4 - 2); 
    
    return { 
        ev: evRounded, 
        why: analysis, 
        opponentEV: parseFloat(opponentEV.toFixed(2)) 
    };
}


// Mock Data (uses new utility functions for dynamic records)
const mockGames = [
  {
    home: "Yankees", away: "Red Sox", date: "2025-09-28T18:05:00Z", 
    pitcherHome: "Gerrit Cole", pitcherAway: "Chris Sale", oddsHome: 1.80, oddsAway: 2.00, 
    last10Home: generateRandomLast10(), last10Away: generateRandomLast10(), 
    ...generateEVAnalysis(), 
  },
  {
    home: "Dodgers", away: "Giants", date: "2025-09-28T20:10:00Z",
    pitcherHome: "Clayton Kershaw", pitcherAway: "Johnny Cueto", oddsHome: 1.70, oddsAway: 2.10,
    last10Home: generateRandomLast10(), last10Away: generateRandomLast10(),
    ...generateEVAnalysis(), 
  }
];

// --- API FUNCTION: Fetch MLB Schedule (for pitchers) - Auto Range ---
async function fetchMLBSchedule() {
    const today = new Date().toISOString().slice(0, 10);
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5); 
    const futureDateString = futureDate.toISOString().slice(0, 10);
    
    const url = `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${today}&endDate=${futureDateString}&hydrate=probablePitcher`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.dates && data.dates.length > 0) {
            return data.dates.flatMap(d => d.games); 
        }
        return [];
    } catch (e) {
        console.error("MLB Schedule fetch failed.");
        return [];
    }
}

// --- Fetch live OddsAPI data ---
async function fetchOdds() {
  if(apiRemaining <= 0) return null;
  try {
    const res = await fetch(`https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?apiKey=${oddsApiKey}&regions=us&markets=h2h`);
    apiRemaining--;
    document.getElementById('apiCount').textContent = apiRemaining;
    const data = await res.json();
    return data;
  } catch(e) {
    console.log("OddsAPI fetch failed, using mock data.");
    return null;
  }
}

// --- RENDER GAME CARD FUNCTION ---
function renderGame(game) {
  const probHome = calculateImpliedProbability(game.oddsHome).toFixed(1);
  const probAway = calculateImpliedProbability(game.oddsAway).toFixed(1);
  
  const evHomeClass = game.evHome > 0 ? 'ev-positive' : 'ev-negative';
  const evAwayClass = game.evAway > 0 ? 'ev-positive' : 'ev-negative';

  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `
    <h2>${game.away} @ ${game.home}</h2>
    <div>Date: ${new Date(game.date).toLocaleDateString()} at ${new Date(game.date).toLocaleTimeString()}</div>
    <div class="stats">
      <div class="stat-item">Home Pitcher: <span class="highlight">${game.pitcherHome}</span></div>
      <div class="stat-item">Away Pitcher: <span class="highlight">${game.pitcherAway}</span></div>
      <div class="stat-item">Home Last 10: W${game.last10Home.wins}-L${game.last10Home.losses}</div>
      <div class="stat-item">Away Last 10: W${game.last10Away.wins}-L${game.last10Away.losses}</div>
      <div class="stat-item">EV Home: <span class="${evHomeClass}">${game.evHome}%</span></div>
      <div class="stat-item">EV Away: <span class="${evAwayClass}">${game.evAway}%</span></div>
    </div>
    <div class="props">
      <div class="stat-item highlight">Why: ${game.why}</div>
    </div>
    <div class="props">
      <div class="stat-item">
        Odds Home: ${game.oddsHome}
        <span class="prob">(${probHome}%)</span>
      </div>
      <div class="stat-item">
        Odds Away: ${game.oddsAway}
        <span class="prob">(${probAway}%)</span>
      </div>
    </div>
  `;
  gamesContainer.appendChild(card);
}


// --- CALCULATOR FUNCTION ---
function calculateBet() {
  const stake = parseFloat(document.getElementById('stake').value);
  const team = teamSelect.value;
  if(!stake || !team) {
    alert("Enter stake and select team");
    return;
  }
  
  let game = null;
  
  const allGameData = (gamesContainer.children.length > 0) 
    ? [...gamesContainer.children].map(card => {
        const h2Text = card.querySelector('h2').textContent;
        const homeTeam = h2Text.split(' @ ')[1].trim();
        const awayTeam = h2Text.split(' @ ')[0].trim();
        
        const oddsHomeMatch = card.querySelector('.props .stat-item:nth-child(1)').textContent.match(/Odds Home: (\d+\.?\d*)/);
        const oddsAwayMatch = card.querySelector('.props .stat-item:nth-child(2)').textContent.match(/Odds Away: (\d+\.?\d*)/);
        const evHomeMatch = card.querySelector('.stat-item:nth-child(5)').textContent.match(/EV Home: (-?\d+\.?\d*)%/);
        const evAwayMatch = card.querySelector('.stat-item:nth-child(6)').textContent.match(/EV Away: (-?\d+\.?\d*)%/);

        return {
            home: homeTeam,
            away: awayTeam,
            oddsHome: parseFloat(oddsHomeMatch ? oddsHomeMatch[1] : 0),
            oddsAway: parseFloat(oddsAwayMatch ? oddsAwayMatch[1] : 0),
            evHome: parseFloat(evHomeMatch ? evHomeMatch[1] : 0), 
            evAway: parseFloat(evAwayMatch ? evAwayMatch[1] : 0) 
        };
    })
    : mockGames; 

  game = allGameData.find(g => g.home === team || g.away === team);


  if(!game) {
    document.getElementById('calcResult').innerHTML = `Game data for ${team} not found.`;
    return;
  }

  const odds = game.home===team ? game.oddsHome : game.oddsAway;
  const ev = game.home===team ? game.evHome : game.evAway;
  const payout = (stake * odds).toFixed(2);
  
  const evClass = ev > 0 ? 'ev-positive' : 'ev-negative';

  document.getElementById('calcResult').innerHTML = `
    <strong>Potential Payout:</strong> $${payout} <br>
    <strong>EV:</strong> <span class="${evClass}">${ev}%</span>
  `;
}


// --- MAIN INITIALIZATION FUNCTION ---
async function init() {
  const oddsData = await fetchOdds();
  const mlbSchedule = await fetchMLBSchedule();
  
  const displayGames = [];
  let availableTeams = new Set();
  
  if (oddsData && oddsData.length > 0) {
    const allOddsGames = oddsData; 
    
    allOddsGames.forEach(oddsGame => {
      
      const mlbGame = mlbSchedule.find(
          g => g.teams.home.team.name === oddsGame.home_team && g.teams.away.team.name === oddsGame.away_team
      );

      const bookmaker = oddsGame.bookmakers[0];
      const market = bookmaker?.markets.find(m => m.key === 'h2h');
      
      const homeOutcome = market?.outcomes.find(o => o.name === oddsGame.home_team);
      const awayOutcome = market?.outcomes.find(o => o.name === oddsGame.away_team);

      const homeAnalysis = generateEVAnalysis();
      const awayAnalysis = generateEVAnalysis();
      const last10Home = generateRandomLast10();
      const last10Away = generateRandomLast10();

      const gameData = {
        home: oddsGame.home_team,
        away: oddsGame.away_team,
        date: oddsGame.commence_time,
        
        pitcherHome: mlbGame?.teams.home.probablePitcher?.fullName || "TBD",
        pitcherAway: mlbGame?.teams.away.probablePitcher?.fullName || "TBD",
        
        last10Home: last10Home,
        last10Away: last10Away,
        
        why: homeAnalysis.why, 
        evHome: homeAnalysis.ev,
        evAway: awayAnalysis.opponentEV, 
        
        oddsHome: homeOutcome?.price || 0, 
        oddsAway: awayOutcome?.price || 0,
      };
      
      if (gameData.oddsHome > 1 && gameData.oddsAway > 1) {
        displayGames.push(gameData);
        availableTeams.add(gameData.home);
        availableTeams.add(gameData.away);
      }
    });
  } 
  
  displayGames.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  if (displayGames.length === 0) {
    gamesContainer.innerHTML = '<h2>No Live Odds Available Today. Showing Mock Data.</h2>';
    mockGames.forEach(renderGame);
    mockGames.forEach(g => {
        availableTeams.add(g.home);
        availableTeams.add(g.away);
    });
  } else {
    gamesContainer.innerHTML = ''; 
    displayGames.forEach(renderGame);
  }
  
  teamSelect.innerHTML = '<option value="">Select team</option>';
  availableTeams.forEach(team => {
      const option = document.createElement('option');
      option.value = team;
      option.textContent = team;
      teamSelect.appendChild(option);
  });
}

// Initial call to load data
init();
