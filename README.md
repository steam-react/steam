# Steam Store react/redux prototype

## Prerequisites

This project requires:
- Node.js (v9.11.x)
- yarn (1.7.0+)
- typescript (2.9.x)
- git

### Mac OS X

Node.js:

```bash
# install NVM - Node Version Manager
brew install nvm

# install node.js v9.11.1
nvm install v9.11.1

# use it
nvm use v9.11.1

# -- or --

# set it as default
nvm alias default v9.11.1
nvm use default
```

Yarn:

```bash
npm i -g yarn
```

TypeScript:

```bash
npm i -g typescript@2.9
```

## Cloning repo

```bash
# Clone repo
git clone https://github.com/steam-react/steam.git

# Enter directory with source code
cd steam

# Install node_modules
yarn
```

## Running

Documentation system:

```bash
yarn styleguidist server
```

Tests:

```bash
# Unit and integration tests
yarn test

# Test coverage info
yarn test-coverage

# Screenshot tests (assumes Styleguidist is running, 'yarn styleguidist server')
yarn test-screenshots
```

Local development server:

```bash
yarn start
```

Production build:

```bash
yarn run build
```

Docker image with static files:

```bash
# build
docker build -t steam/static:latest -f Dockerfile.static .

# run
docker run -p 80:80 steam/static:latest

# open http://localhost/ in browser
```

Docker image with documentation:

```bash
# build
docker build -t steam/docs:latest -f Dockerfile.docs .

# run
docker run -p 80:80 steam/docs:latest

# open http://localhost/ in browser
```

