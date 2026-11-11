# Week 6: Asynchronous JavaScript

## Author
- **Name:** Catherine Nduku
- **GitHub:** [Ndush-gif](https://github.com/Ndush-gif)
- **Date:** Nov 11, 2026

## Project Description
A weather dashboard that fetches current weather from the OpenWeatherMap API, plus practice files for promises, async/await and the Fetch API.

## Technologies Used
- HTML5
- CSS3
- JavaScript (Promises, async/await, Fetch API, localStorage)
- OpenWeatherMap API
- GitHub Actions and GitHub Pages

## Features
- Search for a city and see its temperature, icon, description, feels like, humidity, wind and pressure
- Loading state, and clear errors for an unknown city, a bad key or no network
- The last five searches are saved in localStorage and can be clicked to search again
- A user directory fetched from JSONPlaceholder
- Five daily challenges: `daily-challenges.html`

## How to Run
1. Clone this repository
2. Copy `config.example.js` to `config.js` and paste your OpenWeatherMap API key between the quotes
3. Open `index.html` with Live Server

## Lessons Learned
- `fetch` only rejects when there is no network, so a 404 must be caught by checking `response.ok`.
- `try`, `catch` and `finally` handle success, failure and cleanup, such as hiding the loading message.
- The API key lives in a git-ignored `config.js` and a GitHub Actions secret, so it never enters the repository.

## Challenges Faced
- My user directory page only showing `loading`.

## Live Demo
[View Live Demo](https://ndush-gif.github.io/iyf-s12-week-06-Ndush-gif/)