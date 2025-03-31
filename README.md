# Tic Tac Toe Game API

This project is a backend game management system for playing and tracking **Tic Tac Toe** games, built with **NestJS**, **TypeScript**, and **OpenAI integration** for AI-powered moves.

---

## Features

- Evaluate Tic Tac Toe game state and determine a winner
- Store completed games in a JSON-based datastore
- Retrieve a list of past completed games
- Supports dynamic grid sizes (e.g., 3x3, 4x4, 5x5)
- Optional: Play against an AI (powered by OpenAI - requires a aditional key that should be added to .env)

---

## Tech Stack

- **Node.js** + **NestJS**
- **TypeScript**
- **file-based JSON storage**
- **OpenAI GPT integration** (optional)
- **Jest** for unit testing

---

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/on-air-tic-tac-toe.git
cd on-air-tic-tac-toe

# Install dependencies
yarn

# Create a `.env` file (if using AI)
cp .env.example .env
# Add your OPENAI_API_KEY to .env

# Run the app
yarn start:dev