# igem-safety-case

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Generate a safety case diagram.

## Development

### Quick Start

- Install [Node.js](https://nodejs.org/en/) for your machine (LTS or Current is fine)
- Create a file named `.env`
  - Contains values that should **_never_** be committed to the repository
  - Refer to `example.env` as an example. Replace all variables as needed.
- In the terminal
  - `npm install` to download project dependencies
  - `npm start` in one terminal for the server-side portion
  - `npm run dev` in the another to serve the frontend portion

### Scripts

- `npm run build` - Compiles the frontend code
- `npm run dev` - Runs the frontend code in development mode. Autoreloads the browser upon file changes.
- `npm run lint` - Lints the files for consistent code styles
- `npm run lint:fix` - Fixes most lint errors
- `npm run lint:type` - Type checks the code using `typescript`
- `npm start` - Runs the server-side portion. Uses port `3000` by default.
- `npm test` - Runs the linter, typechecker, then the test suite

### Workflow Description

- Description: [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- Essentially, create a new branch for every feature/change being implemented.
- Each change should have an opened pull request.
- Each pull request should be reviewed (if available).

## Deployment

¯\\\_(ツ)\_/¯

(Most likely `Netlify` for frontend code and `Heroku` for the server code)
