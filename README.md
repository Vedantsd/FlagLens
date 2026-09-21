# FlagLens — Habit Evaluation Tool

FlagLens is a web-based habit evaluation tool that helps users evaluate everyday habits through a simple Yes/No questionnaire. Based on the user's responses, the application calculates a score and generates a personalized flag-based result.

## Features

- Enter the name of a friend/user before starting the evaluation
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

## Project Structure
FlagLens/
│
├── index.html
├── style.css
├── questions.csv
│
├── app.js
├── data.js
├── scoring.js
└── ui.js

File Responsibilities
index.html	Defines the structure and screens of the application
style.css	Handles the visual design, layout, animations, and responsive styling
questions.csv	Stores the habit questions and their Yes/No score values
data.js	Handles question data loading, parsing, and question selection
scoring.js	Handles score calculation, score normalization, and result classification
ui.js	Handles displaying questions, progress, results, suggestions, and screen updates
app.js	Connects the application modules and handles the overall application flow.

Application Workflow
User enters name
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
User can download the result card
Scoring System

Each question contains separate score values for a Yes and No response.

The responses are combined to calculate the user's overall score.

The final normalized score determines the result category:

Score Range	Result
≥ 0.5	Green Flag
≥ 0.1	Mostly Green
≥ -0.1	Neutral
≥ -0.5	Mostly Red
< -0.5	Red Flag
Data Format

Questions are stored in questions.csv.

The CSV contains the question text along with the corresponding score values for Yes and No responses.

Keeping the questions in a separate data file makes it easier to add, remove, or modify questions without changing the application logic.

Technologies Used
HTML5
CSS3
JavaScript
CSV
Google Fonts
html2canvas
Architecture

FlagLens follows a modular client-side architecture:

              questions.csv
                   ↓
                data.js
                   ↓
                app.js
              ↙         ↘
        scoring.js     ui.js
              ↓         ↓
           Results    Interface
Separation of Responsibilities

The application separates its major responsibilities into independent modules:

Data Layer: questions.csv and data.js
Application Layer: app.js
Scoring Layer: scoring.js
UI Layer: ui.js
Presentation Layer: index.html and style.css

This structure makes the code easier to understand, maintain, test, and extend.

Running the Project

Because the application loads the CSV file using JavaScript, it should be run through a local web server rather than directly opening index.html.

For example, using VS Code Live Server:

Open the FlagLens project in VS Code.
Install the Live Server extension if it is not already installed.
Right-click index.html.
Select Open with Live Server.
The application will open in your browser.

Future Improvements
Possible future improvements include:

Adding more habit categories
Adding additional question sets
Improving accessibility
Adding persistent result history
Adding more detailed analytics
Adding user authentication
Adding backend storage for results
