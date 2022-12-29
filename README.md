# Vue Use

Collection of [Vue Composables](https://vuejs.org/guide/reusability/composables.html).

In addition to [VueUse.org](https://vueuse.org/).

## Tech Stack

- Git Repository: GitHub
- Frontend
  - Package Manager: NPM
  - Code Validator: ESLint
  - Development Server: Vite
  - JavaScript Framework: Vue
  - UX Framework: Framework7 Vue
- Backend
  - PHP + MySQL Server: Docker
  - MySQL CRUD API: PHP

## Setup

- Clone this respository
- Install dependencies with `npm installl`
- Create a OAuth Client ID in the Google Cloud Console
  - JavaScript source / forwarding URL: http://127.0.0.1:517
  - Create file /source/frontend/credentials.json

    ```
    {
      "clientId": "<your-google-client-id>",
      "clientSecret": "<your-google-client-secret>"
    }
    ```

## CLI Commands

- `npm run dev` to start the Demo App
- `npm run build` to build the Demo App
- `npm run deploy` to deploy to GitHub and NPM
