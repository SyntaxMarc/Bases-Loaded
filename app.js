// --- Mock Games Data ---
const mockGames=[
  {
    home:"Yankees",
    away:"Red Sox",
    time:"2025-09-28T08:00:00Z",
    stadium:"Yankee Stadium",
    homePitcher:"Gerrit Cole",
    awayPitcher:"Chris Sale"
  },
  {
    home:"Dodgers",
    away:"Giants",
    time:"2025-09-28T10:00:00Z",
    stadium:"Dodger Stadium",
    homePitcher:"Walker Buehler",
    awayPitcher:"Logan Webb"
  }
];

const teamInput=document.getElementById("teamInput");

// --- Convert UTC/ISO to PH Time ---
function toPHTime(isoString){
  const date=new Date(isoString);
  const phOffset=8*60;
  const localDate=new Date(date.getTime() + phOffset*60000);
  return localDate.toLocaleString("en-PH",{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
}

// --- Populate Game Panel ---
teamInput.addEventListener("change",()=>{
  const team=teamInput.value;
  const game=mockGames.find(g=>g.home===team||g.away===team);
  if(!game){document.getElementById("gamePanel").style.display="none";return;}
  document.getElementById("gamePanel").style.display="block";
  document.getElementById("matchTitle").textContent=`${game.away} @ ${game.home} • ${toPHTime(game.time)}`;
  document.getElementById("gameLogo").src="https://upload.wikimedia.org/wikipedia/en/0/0b/MLB_logo.svg";
  document.getElementById("stadiumText").textContent=game.stadium;
  document.getElementById("homePitcher").textContent=`Home: ${game.homePitcher}`;
  document.getElementById("awayPitcher").textContent=`Away: ${game.awayPitcher}`;
  document.getElementById("lineupsList").innerHTML="<li>Lineup 1, Lineup 2...</li>";
  document.getElementById("injuriesList").innerHTML="<li>Player A injured, Player B day-to-day</li>";
});

// --- Mock News Feed ---
const newsList=document.getElementById("newsList");
const mockNews=[
  "MLB: Yankees vs Red Sox - Key match tonight!",
  "Dodgers' Walker Buehler ready for showdown vs Giants",
  "Cubs announce final lineup vs White Sox",
  "Mets activate star player from IL",
  "Phillies' bullpen strategy ahead of Cardinals game"
];
function loadNews(){
  newsList.innerHTML="";
  mockNews.forEach(n=>{
    const li=document.createElement("li");
    li.textContent=n;
    newsList.appendChild(li);
  });
}
loadNews();
setInterval(loadNews,300000);

// --- Recommended Teams (Mock Logic) ---
const recTeamsList=document.getElementById("recTeamsList");
const recommended=["Yankees","Dodgers"];
recTeamsList.innerHTML="";
recommended.forEach(t=>{
  const li=document.createElement("li");
  li.textContent=t;
  recTeamsList.appendChild(li);
});
