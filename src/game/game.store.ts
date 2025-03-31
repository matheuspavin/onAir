import { GameResult } from './game.types';

const fs = require('fs');
const DB_FILE = 'src/game/games.json';

export function loadGames(): GameResult[] {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, '[]');
  }

  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  try {
    return JSON.parse(raw) as GameResult[];
  } catch (e) {
    console.error('Failed to parse games.json. Resetting file.');
    fs.writeFileSync(DB_FILE, '[]');
    return [];
  }
}

export async function saveGame(game: GameResult) {
  console.log(game);
  const current = await loadGames();
  console.log('Checking the games for debug: ', current);
  current.push(game);
  fs.writeFileSync(DB_FILE, JSON.stringify(current, null, 2));
}
