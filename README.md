# FlagLens — Habit Evaluation Tool

FlagLens is a web-based habit evaluation tool that helps users evaluate everyday habits through a simple Yes/No questionnaire. Based on the user's responses, the application calculates a score and generates a personalized flag-based result. Each completed evaluation is logged to a Neon Postgres database via a small Flask API.

## Features

- Enter your own name and the name of the friend being evaluated before starting
- Randomized habit-based questions
- Yes/No response system
- Automatic score calculation
- Five result categories:
  - Green Flag
  - Mostly Green
  - Neutral
  - Mostly Red
  - Red Flag
- Personalized suggestions based on responses
- Progress tracking during the questionnaire
- Visual score representation
- Downloadable result card
- Restart option
- Question data maintained separately in CSV format
- Modular JavaScript architecture for easier maintenance
- Results (evaluator, friend, timestamp, score, flag status) saved to a Postgres database

## Project Structure

```
FlagLens/
│
├── index.html
├── style.css
├── questions.csv
│
├── app.js
├── data.js
├── scoring.js
├── ui.js
│
├── app.py
├── requirements.txt
├── schema.sql
├── .env.example
└── .gitignore
```

### File Responsibilities

| File | Responsibility |
|---|---|
| `index.html` | Defines the structure and screens of the application |
| `style.css` | Handles the visual design, layout, animations, and responsive styling |
| `questions.csv` | Stores the habit questions and their Yes/No score values |
| `data.js` | Handles question data loading, parsing, and question selection |
| `scoring.js` | Handles score calculation, score normalization, and result classification |
| `ui.js` | Handles displaying questions, progress, results, suggestions, and screen updates |
| `app.js` | Connects the application modules, handles overall application flow, and sends completed results to the backend |
| `app.py` | Flask server that serves the frontend and exposes the `/api/save-result` endpoint, which writes results to Postgres |
| `requirements.txt` | Python dependencies for the Flask server |
| `schema.sql` | SQL to create the `flaglens_results` table in Neon Postgres |
| `.env.example` | Template for the environment variables the server needs (`DATABASE_URL`, `PORT`) |

## Application Workflow

```
User enters their name and their friend's name
                    ↓
            Questions are loaded
                    ↓
           Questions are selected
                    ↓
           User answers Yes / No
                    ↓
            Score is calculated
                    ↓
       Result category is determined
                    ↓
     Personalized suggestions are displayed
                    ↓
   Result is saved to the Postgres database
                    ↓
    User can download the result card
```

## Scoring System

Each question contains separate score values for a Yes and No response.

The responses are combined to calculate the user's overall score.

The final normalized score determines the result category:

| Score Range | Result |
|---|---|
| ≥ 0.5 | Green Flag |
| ≥ 0.1 | Mostly Green |
| ≥ -0.1 | Neutral |
| ≥ -0.5 | Mostly Red |
| < -0.5 | Red Flag |

For database storage, the result is additionally simplified into a binary `flag_status` of `green` (score ≥ 0) or `red` (score < 0).

## Data Format

Questions are stored in `questions.csv`.

The CSV contains the question text along with the corresponding score values for Yes and No responses.

Keeping the questions in a separate data file makes it easier to add, remove, or modify questions without changing the application logic.

## Result Storage

Every completed evaluation is sent from the browser to the Flask backend and inserted into a `flaglens_results` table in a Neon Postgres database, with the following columns:

| Column | Description |
|---|---|
| `user_name` | Name of the person taking the evaluation |
| `friend_name` | Name of the friend being evaluated |
| `timestamp` | When the result was recorded (set automatically) |
| `score` | The final normalized score (-1 to 1) |
| `flag_status` | Simplified result: `green` or `red` |

See `schema.sql` for the table definition and `app.py` for the endpoint that writes to it.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- CSV
- Google Fonts
- html2canvas
- Python 3
- Flask
- psycopg2
- Neon (serverless Postgres)

## Architecture

FlagLens follows a modular client-side architecture backed by a minimal Flask API:

```
              questions.csv
                   ↓
                data.js
                   ↓
                app.js
              ↙         ↘
        scoring.js     ui.js
              ↓         ↓
           Results    Interface
              ↓
        app.py (Flask API)
              ↓
      Neon Postgres database
```

### Separation of Responsibilities

The application separates its major responsibilities into independent modules:

- **Data Layer:** `questions.csv` and `data.js`
- **Application Layer:** `app.js`
- **Scoring Layer:** `scoring.js`
- **UI Layer:** `ui.js`
- **Presentation Layer:** `index.html` and `style.css`
- **API Layer:** `app.py`
- **Persistence Layer:** Neon Postgres (`flaglens_results` table, defined in `schema.sql`)

This structure makes the code easier to understand, maintain, test, and extend.

## Running the Project

The application now requires the Flask server to be running, both to serve the frontend and to save results to Postgres.

1. **Install dependencies**
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Configure the database connection**
   - Copy `.env.example` to `.env`
   - Fill in your Neon connection string as `DATABASE_URL`

3. **Create the database table**
   - Run `schema.sql` against your Neon database (via the Neon SQL Editor or `psql "$DATABASE_URL" -f schema.sql`)

4. **Start the server**
   ```bash
   python app.py
   ```

5. Open `http://localhost:3000` in your browser.

## Future Improvements

Possible future improvements include:

- Adding more habit categories
- Adding additional question sets
- Improving accessibility
- Building a dashboard/history view for past results stored in Postgres
- Adding more detailed analytics
- Adding user authentication