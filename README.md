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

### Services

- [mLab](https://mlab.com/) - MongoDB hosting service
- [Heroku](https://www.heroku.com/) - Server hosting service
- [Netlify](https://www.netlify.com/) - Static-site hosting service

### Instructions

For the instructions below, I'm assuming that you have made an account on these sites.

- mLab
  - Create New MongoDB Deployment
  - Follow the instructions. Choose whatever provider/price is appropriate. (Free tier available)
  - View the created database
  - In the Collections tab, create 3 `Collections`
    - `users`
    - `diagrams`
    - `diagramNodes`
  - In the Users tab, create a database user
    - This gives read/write access to the database
    - Remember the username and password, it's used in the **standard MongoDB URI**
      - It is the `DB_HOST` environment variable
- Heroku
  - Note: Install the Heroku CLI (https://devcenter.heroku.com/articles/heroku-cli)
  - On the dashboard, create a new app
  - In the settings tab of the app
    - Click: Reveal Config Vars
    - Set the `DB_HOST` and `TOKEN_SECRET` variables
  - In the deploy tab of the app
    - Follow the instructions for using the CLI
    - Push the application using `git push heroku master`
    - It should then run automatically
- Netlify
  - In the `wepback.prod.js` file, change the server URL to the new Heroku app's URL
  - Build the application bundle: `npm run build`
  - Under the sites page, drag-and-drop the `dist` directory that was built onto the site
  - The site should then be live
  - Updates can be uploaded to the same site under the Deploys tab
