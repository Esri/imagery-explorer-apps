# React-Redux Boilerplate

The Boilerplate to start React+Redux project with TypeScript in an easier and faster way. 

## Features

- React
- Redux
- TypeScript
- Webpack
- Jest
- Tailwind
- EsLint
- Prettier

## Getting Started

1. Make sure you have a fresh version of [Node.js](https://nodejs.org/en/) and NPM installed. The current Long Term Support (LTS) release is an ideal starting point

2. Clone this repository to your computer: 
    ```sh
    git clone https://github.com/vannizhang/react-redux-boilerplate.git
    ```


3. From the project's root directory, install the required packages (dependencies):

    ```sh
    npm install
    ```

4. To run and test the app on your local machine (http://localhost:8080):

    ```sh
    # it will start a server instance and begin listening for connections from localhost on port 8080
    npm run start
    ```

5. To build/deploye the app, you can run:

    ```sh
    # it will place all files needed for deployment into the /dist directory 
    npm run build
    ```

## Project Structure

```sh
├── public  
    ├── favicon.ico
    ├── index.html              # html template for the app
    ├── thumbnail.jpg           # an image will be used in og:image meta tag
├── src                         # Source code.
    ├── components              # reusable UI components
        ├── ArcGIS              # building blocks for the Map Interface with ArcGIS API for JavaScript (e.g. MapView, Search Widget and tec)
    ├── constants               # app-wide constants (text, URLs, themes and etc)
    ├── contexts                # React contexts
    ├── hooks                   # reusable custome hooks
    ├── pages                   # Page components
    ├── services                # API calls
    ├── static                  # static assets
    ├── store                   # Redux store
        ├── reducers            # reducers to manage app's state
        ├── configureStore.ts
        ├── getPreloadedState.ts 
    ├── styles                  # app-wide styles
    ├── types                   # type definitions
    ├── utils                   # utility functions
    └── index.tsx               # entry point for the app
├── .babelrc                    # Babel configuration
├── .eslintrc.js                # ESLint configuration
├── .prettierrc.js              # Prettier configuration
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Webpack configurations
├── tailwind.config.js          # Tailwind CSS configurations
├── postcss.config.js           # PostCSS configurations
```

## Issues
Find a bug or want to request a new feature? Please let me know by submitting an issue.

## Licensing
Copyright 2022 Jinnan Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.