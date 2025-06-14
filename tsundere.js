#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Define paths
const homeDir = process.env.HOME;
const configDir = path.join(homeDir, '.config', 'tsundere');
const stateFile = path.join(configDir, 'state');
const dateFile = path.join(configDir, 'date');

// Ensure the config directory exists.
fs.mkdirSync(configDir, { recursive: true });

// Get the current date as a string (YYYY-MM-DD)
const currentDate = new Date().toISOString().slice(0, 10);

// Read the last saved date, if any.
let lastDate = null;
if (fs.existsSync(dateFile)) {
  lastDate = fs.readFileSync(dateFile, 'utf8').trim();
}

// If the day has changed, reset the state and update the date file.
if (lastDate !== currentDate) {
  fs.writeFileSync(stateFile, '0', 'utf8');
  fs.writeFileSync(dateFile, currentDate, 'utf8');
}

// Read the current state (defaulting to 0 if the file doesn't exist)
let state = 0;
if (fs.existsSync(stateFile)) {
  const fileContent = fs.readFileSync(stateFile, 'utf8').trim();
  const parsedState = parseInt(fileContent, 10);
  if (!isNaN(parsedState)) {
    state = parsedState;
  }
}

// Define the progression of tsundere greetings.
const greetings = [
  "I-It's not like I care that you're here or anything...",
  "Oh, you're still here? I guess I could say hello...",
  "Don't think I like you or anything, but hi, again.",
  "Ugh, you better not get a big head over my greetings.",
  "Fine, I'll admit it... I enjoy your company."
];

// Define a smaller set of final greetings once the progression is complete.
const finalGreetings = [
  "Oh, it's you again. I... I'm glad you're still here.",
  "Hmph. It's not like I’d care if you left... but the terminal would feel... quieter.",
  "Look, if you really want to see me happy, then... okay, here's a greeting."
];

if (state < greetings.length) {
  console.log(greetings[state]);
  // Increment the state for the next greeting.
  state++;
  fs.writeFileSync(stateFile, state.toString(), 'utf8');
} else {
  // When the progression is complete, randomly select one of the final greetings.
  const randomIndex = Math.floor(Math.random() * finalGreetings.length);
  console.log(finalGreetings[randomIndex]);
}

