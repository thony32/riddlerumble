# RiddleRumble 🌍🕵️‍♂️💣

## Link

https://riddlerumble.vercel.app

Welcome to RiddleRumble, an exciting mini-game where players put their geographical knowledge to the test! 🌎✨

## Table of Contents

- [About the Game](#about-the-game)
- [Features](#features)
- [How to Play](#how-to-play)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## About the Game

In RiddleRumble, players are challenged to guess a place or city based on four statements or facts. It's a thrilling game that combines deduction, strategy, and a bit of luck! 🕵️‍♂️🌇

## Features

- 🌍 Guess places or cities from 4 statements
- 👥 Multiplayer rooms with 4 players each
- 🔍 Normal and High difficulty levels
- 🗺️ Interactive map for pointing out the chosen place
- 💣 Joker role with the ability to place a bomb
- 🏆 Points system based on the proximity of guesses

## How to Play

1. Join a room with 3 other players
2. Choose the difficulty level: Normal or High
3. Read the 4 statements about a place or city
4. Use the map to point out your guess
5. The player with the closest guess earns the most points
6. Beware of the Joker who can place a bomb and penalize nearby guesses
7. Have fun and enjoy the thrill of RiddleRumble!

## Getting Started

To run RiddleRumble locally, follow these steps:

1- Install the dependencies:
```sh
pnpm install 
```
or
```sh
bun install
```

2- Start the development server:
```sh
pnpm dev
```
or
```sh
bun dev
```

3- Login into edgedb cloud:
```sh
edgedb cloud login
```

4- Run this command:
```sh
pnpm migrate:all
```

NOTE: Replace "codeipsum/enigmap" with your current instance name.

5- Open your browser and visit `http://localhost:3000` to play RiddleRumble!

## Technologies Used

- Next.js
- EdgeDB Cloud
- TypeScript
- Socket.io
- Mapbox (for the interactive map)

## Tutorial

Check out our tutorial video to learn more about how to play RiddleRumble:

https://youtu.be/sEfqTadihzg

## Contributing

We welcome contributions to RiddleRumble! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Let's make RiddleRumble even more amazing together! 🙌

## License

RiddleRumble is open-source software licensed under the [MIT License](LICENSE).

---
