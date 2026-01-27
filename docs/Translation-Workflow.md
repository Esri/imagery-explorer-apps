# Translation Workflow for Imagery Explorer Apps

## Prerequisites (from the Imagery Explorer Apps Team)

1. Create a folder under `/public/locales/` using the language code as the folder name.  
   Example: `fr` for French, `de` for German.

2. Create a translation branch for the target language.  
   Example: `translation/fr` or `translation/de`.

---

## Steps for the Distributor

### Step 1 — Fork the repository

Fork the repository at:  
https://github.com/Esri/imagery-explorer-apps

### Step 2 — Clone your fork

Clone your forked repository to your local machine.

### Step 3 — Switch to the translation branch

Navigate into the project directory and check out the branch:  
`translation/{{lang}}`  
Example: https://github.com/Esri/imagery-explorer-apps/tree/translation/es

### Step 4 — Locate files to translate

1. Go to `/public/locales/en` to view the source English files.
2. **Do not modify anything in `/public/locales/en`.**
3. Copy the files you need into the target language folder `/public/locales/{{lang}}`.
4. Translate the following:
    - `common.json` — shared strings used across all Imagery Explorer apps.
    - The app-specific JSON file for the app being localized.  
      Example: for Sentinel-2 Explorer, translate `sentinel2explorer.json`.

### Step 5 — Place translated files

Save the translated JSON files under:  
`/public/locales/{{lang}}`

### Step 6 — Submit a pull request

After completing the translations, open a pull request targeting the upstream branch:  
`translation/{{lang}}`

---

## Important Notes

- Some strings include placeholders like `{{example}}`.  
  These are **i18next interpolation tokens** used to insert dynamic values.  
  Docs: https://www.i18next.com/translation-function/interpolation
- **Do not translate or alter the text inside `{{ }}`.**  
  Keep the placeholder exactly as it appears in the English source.
