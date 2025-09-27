EV Strategy Dashboard
🎯 Overview
The EV Strategy Dashboard is a localized, budget-conscious tool for sharp sports bettors. It performs essential Expected Value (EV) and Vigorish (VIG) calculations on game odds, provides disciplined staking recommendations (Kelly Criterion-based), and enforces strict control over API usage to manage a limited monthly budget.

✨ Key Features
Strict API Budget Control: Enforces a hard limit of 500 API Requests per Month.

Admin-Only Refresh: The manual data refresh button is locked behind an Admin Code to prevent unauthorized users from consuming the budget.

Advanced Analysis: Calculates Expected Value (EV), Vigorish (VIG) (Market Confidence), and provides Unit Staking recommendations.

Multilingual Support: Instantaneous translation between English (EN) and Tagalog (TL) for all core metrics.

Manual EV Calculator: A zero-cost tool for instant analysis of any third-party odds (e.g., 1xBet, Sofascore) without using an API request.

Visitor Tracking: Tracks a simulated count of Unique Visitors and Total Views using browser local storage.

🛠️ Project Structure (The 5 Files)
The dashboard is built entirely on the front end (client-side) using HTML, CSS, and JavaScript. It simulates API calls by fetching data from a static file (mock_data.js).

File	Role	Description
index.html	Structure (HTML)	The main layout, links to all scripts/styles, and contains the UI elements (buttons, inputs, cards).
style.css	Styling (CSS)	Defines the dark theme, layout grid, and crucial color-coding for EV (Green/Red).
script.js	Logic (JavaScript)	The Brain. Contains all calculations, the Admin Lock logic, the API budget counter, and the rendering functions.
translations.js	Data (JavaScript)	The comprehensive dictionary object for EN/TL translations.
mock\_data.js	Data (JavaScript)	Simulates the external API data feed. This file contains the raw odds and model probabilities.
🚀 Setup and Usage
1. Initial Setup
Download: Save all five files (index.html, style.css, script.js, translations.js, mock_data.js, and README.md) into a single folder.

Open: Double-click index.html in your web browser (Chrome, Firefox, etc.). No web server is required.

2. Administrator Controls (Budget Protection)
To perform a manual data refresh that consumes 1 of your 500 API requests:

Action	Cost	Steps
Initial Daily Snapshot	1 Request	The dashboard automatically runs a fetchAndRenderData() call upon the first load of the day. This simulates the guaranteed 8 PM snapshot.
Manual Refresh	1 Request	1. Enter the Admin Code (admin8pm) into the "Admin Code" input field. 2. The FETCH SNAPSHOT button will become clickable. 3. Click the button to update the data and increment the counter.
⚠️ IMPORTANT: Change the ADMIN_PASSWORD in script.js immediately to a private, secure code.

3. Calculating Expected Value (EV)
Dashboard Games: Games listed in the main grid are automatically calculated using the model probability vs. the book odds.

Manual Calculation: Use the Manual EV Calculator at the bottom of the page to analyze any odds from any source without spending your API budget.

Input the Book Odds (Decimal) (e.g., 2.50).

Input Your Model Probability (%) (e.g., 45.0).

Click "Calculate EV" to get an instant verdict and staking recommendation.

⚙️ Customization and Maintenance
A. Updating the API Key and Budget
Open script.js.

Modify const ADMIN_PASSWORD = "admin8pm"; to your secure code.

Modify const MAX_REQUESTS_PER_MONTH = 500; if your real API plan changes.

B. Integrating Live Data
When you are ready to switch from mock data to a live API feed:

In script.js, update the fetchAndRenderData() function to make a real fetch() call to your realsportsio API endpoint instead of loading data from mock_data.js.

Ensure your API response format matches the structure in mock_data.js so the EV logic can process it correctly.

C. Adding/Editing Translations
Open translations.js.

All user-facing text is managed here. Simply add new keys or edit the Tagalog (tl) or English (en) values. The change is instantly reflected across the entire dashboard.
