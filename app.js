// ---------- PH time display ----------
function updateLocalTime(){
  const now = new Date();
  const utc = new Date(now.getTime() + now.getTimezoneOffset()*60000);
  const ph = new Date(utc.getTime() + 8*3600000);
  const hh = ph.getHours().toString().padStart(2,'0');
  const mm = ph.getMinutes().toString().padStart(2,'0');
  document.getElementById('localTime').textContent = hh+':'+mm;
}
updateLocalTime(); 
setInterval(updateLocalTime,30000);

// ---------- Mock games ----------
const mockGames = [
  {home:'New York Yankees',away:'Boston Red Sox',timeUtc:'2025-09-27T18:30:00Z',venue:'Yankee Stadium'},
  {home:'Los Angeles Dodgers',away:'San Francisco Giants',timeUtc:'2025-09-27T20:10:00Z',venue:'Dodger Stadium'},
  {home:'Tampa Bay Rays',away:'Toronto Blue Jays',timeUtc:'2025-09-27T12:05:00Z',venue:'Tropicana Field'},
  {home:'Chicago Cubs',away:'St. Louis Cardinals',timeUtc:'2025-09-27T23:15:00Z',venue:'Wrigley Field'}
];

function toPH(utcString){
  const d = new Date(utcString);
  const ph = new Date(d.getTime() + 8*3600000);
  return ph.toLocaleString('en-PH', {weekday:'short',month:'short',day:'numeric', hour:'2-digit',minute:'2-digit'});
}

function renderGames(){
  const list = document.getElementById('gamesList');
  list.innerHTML='';
  mockGames.forEach((g,i)=>{
    const div = document.createElement('div');
    div.className='game-item';
    div.innerHTML = `
      <div style="display:flex;flex-direction:column">
        <div class="abbrev">${g.away}</div>
        <div class="small" style="color:var(--muted)">${g.home}</div>
      </div>
      <div class="game-meta">
        <div class="time-pill">${toPH(g.timeUtc)}</div>
        <div class="small" style="margin-top:6px">${g.venue}</div>
      </div>
    `;
    div.onclick = ()=>selectGame(i);
    list.appendChild(div);
  });
}
renderGames();

function selectGame(idx){
  const g = mockGames[idx];
  document.getElementById('teamAway').textContent = g.away;
  document.getElementById('teamHome').textContent = g.home;
  document.getElementById('matchTime').textContent = toPH(g.timeUtc);
  document.getElementById('stadium').textContent = g.venue;
  document.getElementById('awayPitch').textContent = 'Probable: Pitcher A (R)';
  document.getElementById('homePitch').textContent = 'Probable: Pitcher B (L)';
  document.getElementById('whyText').textContent = g.away + ' stronger recent form; pitching matchup favors '+g.away+'. H2H: 6-4 last 10.';
  document.getElementById('matchStatus').textContent = 'Pre';
  renderRecs(g);
  renderNews();
}

// ---------- Recommendations ----------
function renderRecs(game){
  const recs = document.getElementById('recs');
  recs.innerHTML='';
  const picks = [
    {team:game.away,prob:73,why:'Hot vs RHP • Last10: 8-2'},
    {team:game.home,prob:70,why:'Home advantage • Lineup strong'}
  ];
  picks.forEach(p=>{
    const div=document.createElement('div');
    div.className='rec-item';
    div.innerHTML = `<div>
      <div style="font-weight:800">${p.team}</div>
      <div class="meta small">${p.why}</div>
    </div>
    <div style="text-align:right">
      <div style="font-weight:800">${p.prob}%</div>
      <button class="btn" style="margin-top:8px;padding:6px 8px" onclick="autoFillTeam('${p.team}')">Auto</button>
    </div>`;
    recs.appendChild(div);
  });
}

// ---------- News ----------
function renderNews(){
  const nf = document.getElementById('newsFeed');
  nf.innerHTML='';
  const news = [
    'Yankees: Update — Starting lineup posted.',
    'Dodgers: Pitching change ahead of tonight\'s game.',
    'Rays: Closer day-to-day, monitor bullpen.'
  ];
  news.forEach(n=>{
    const d=document.createElement('div'); d.className='news-item'; d.textContent=n; nf.appendChild(d);
  });
}

// ---------- Quick bet actions ----------
function autoFillTeam(team){
  const quick = document.getElementById('quickTeam');
  quick.value = team;
  document.getElementById('quickOdds').value = (1.8 + Math.random()*0.6).toFixed(2);
  document.getElementById('quickStake').value = 100;
  document.getElementById('slip').innerHTML = `<div class="small">Auto-filled: ${team} • Odds: ${document.getElementById('quickOdds').value}</div>`;
  const apiEl = document.getElementById('apiLeft');
  let val = parseInt(apiEl.textContent);
  apiEl.textContent = Math.max(0,val-1);
}

function autoFillProp(name){
  document.getElementById('quickTeam').value = name;
  document.getElementById('quickOdds').value = (1.6 + Math.random()*1.0).toFixed(2);
  document.getElementById('quickStake').value = 50;
  document.getElementById('slip').innerHTML = `<div class="small">Auto-filled prop: ${name}</div>`;
}

function addQuickBet(){
  const t = document.getElementById('quickTeam').value;
  const o = document.getElementById('quickOdds').value;
  const s = document.getElementById('quickStake').value;
  if(!t||!o||!s){ alert('fill team, odds, stake'); return; }
  const slip = document.getElementById('slip');
  const el = document.createElement('div'); el.className='news-item';
  el.innerHTML = `<strong>${t}</strong> — Odds: ${o} • Stake: ${s}`;
  slip.appendChild(el);
  const apiEl = document.getElementById('apiLeft');
  let val = parseInt(apiEl.textContent);
  apiEl.textContent = Math.max(0,val-1);
}

// init first game
selectGame(0);
      
