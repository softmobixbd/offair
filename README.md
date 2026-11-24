# OffAir website (`web_public/`)

Static pages about the app, written to look and feel like it: the same night and day palettes, fonts, cartridges and bottom dock. No build step, no tracking, no outside requests (fonts are bundled).

| File | What |
|---|---|
| `index.html` | About OffAir, with the shelf of games (filter chips work like the app's) |
| `privacy.html` | Privacy Policy: use its URL in Google Play and the App Store |
| `terms.html` | Terms & Conditions |
| `app-ads.txt` | AdMob seller verification (placeholder; see below) |
| `css/style.css`, `js/app.js` | Shared look; the small script handles the theme switch, filter chips and app bar (pages read fine without it) |
| `img/games/` | Each game's cartridge label, exported from the app |

## Before publishing

1. **Contact email.** Replace `support@offair.example` (in all three pages) with the real support address. Play requires a working contact in the privacy policy.
2. **Governing law.** `terms.html` § "Governing law" says Bangladesh. Change it if the developer is established elsewhere.
3. **app-ads.txt.** Uncomment and fill in the line from AdMob (docs/04_ADS.md).
4. Have the privacy policy and terms read by someone qualified. They describe what the app really does (Firebase Analytics and Crashlytics, AdMob, consent, local storage), but they are not legal advice.
5. When the iPhone version ships, swap the "iPhone: coming soon" button in `index.html` for the App Store link.

## Hosting

- **Firebase Hosting** (already set up in `firebase.json`): `firebase deploy --only hosting` publishes this folder at `https://<project-id>.web.app`. Add a custom domain in the Firebase console if you like.
- **Anywhere else** (GitHub Pages, Netlify…): serve this folder as the site root.

`app-ads.txt` must be reachable at the root of the domain you list as the developer website in the stores, e.g. `https://<your-domain>/app-ads.txt`.

## After adding a game

```sh
flutter test test_screens/web_assets_test.dart   # refreshes img/games/*.png and games.json
```

Then add the game's cartridge to the shelf in `index.html`, copying a neighbour's markup with the id, title, type, colour and blurb from `img/games/games.json`, and update the counts on the chips and in the hero.
