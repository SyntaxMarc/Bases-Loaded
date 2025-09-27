// mock_data.js - Initial Mock Data (Simulates your 8 PM API snapshot)

let mockGameData = [
    { id: 1, date: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(19, 0, 0, 0), sport: 'NBA', home: 'Lakers', away: 'Celtics', oddsHome: 2.10, oddsAway: 1.80, probHome: 46, probAway: 54 },
    { id: 2, date: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(21, 30, 0, 0), sport: 'NFL', home: 'Cowboys', away: 'Eagles', oddsHome: 1.65, oddsAway: 2.30, probHome: 62, probAway: 38 },
    { id: 3, date: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(12, 0, 0, 0), sport: 'MLB', home: 'Yankees', away: 'Red Sox', oddsHome: 1.95, oddsAway: 1.95, probHome: 52, probAway: 48 },
    { id: 4, date: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(15, 0, 0, 0), sport: 'NBA', home: 'Warriors', away: 'Suns', oddsHome: 1.85, oddsAway: 2.15, probHome: 56, probAway: 44 },
    { id: 5, date: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(17, 0, 0, 0), sport: 'NFL', home: 'Chiefs', away: 'Bills', oddsHome: 1.70, oddsAway: 2.25, probHome: 60, probAway: 40 },
    // Add more mock data here if needed
];
