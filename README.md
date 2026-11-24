# OffAir website (`web_public/`)

Static pages about the app, written to look and feel like it: the same night and day palettes, fonts, cartridges and bottom dock. No build step, no tracking, no outside requests (fonts are bundled).

OffAir is made by **SoftMobiXBD** (https://softmobixbd.github.io/). The pages use the studio's details from that site: the name as written there, softmobixbd@gmail.com, +880 1644-426285, its Google Play developer page, and the Bangladesh governing law its other apps' terms use.

| File | What |
|---|---|
| `index.html` | About OffAir, with the shelf of games (filter chips work like the app's) |
| `privacy.html` | Privacy Policy: use its URL in Google Play and the App Store |
| `terms.html` | Terms & Conditions |
| `app-ads.txt` | AdMob seller line (pub-9885361335927746); the live one is at the studio site's root |
| `css/style.css`, `js/app.js` | Shared look; the small script handles the theme switch, filter chips and app bar (pages read fine without it) |
| `img/games/` | Each game's cartridge label, exported from the app |

## Before publishing

1. Have the privacy policy and terms read by someone qualified. They describe what the app really does (Firebase Analytics and Crashlytics, AdMob, consent, local storage), but they are not legal advice.
2. When the iPhone version ships, swap the "iPhone: coming soon" button in `index.html` for the App Store link.

## Hosting (on the studio site)

Like the studio's other apps (`/quickmath_about/`, `/NumIQ/`…), put these files in a folder of the `softmobixbd.github.io` repository, e.g. `offair/` (leave out `README.md`). The links are relative, so nothing needs changing. Then:

- Privacy policy URL for Google Play and the App Store: `https://softmobixbd.github.io/offair/privacy.html`
- Developer website in the store listings: `https://softmobixbd.github.io/`. Its root already serves the right `app-ads.txt`.
- Add OffAir to the apps on the studio's home page.

Firebase Hosting also works (`firebase deploy --only hosting`, set up in `firebase.json`) if you want `https://<project-id>.web.app`.

## Linked from the app

Settings › About opens these live pages: `https://softmobixbd.github.io/offair/` (About OffAir), `…/privacy.html` (from the privacy summary's "Full policy online") and `…/terms.html`. The URLs are in `lib/core/links.dart`; if the site ever moves, change them there and ship an app update.

## After adding a game

```sh
flutter test test_screens/web_assets_test.dart   # refreshes img/games/*.png and games.json
```

Then add the game's cartridge to the shelf in `index.html`, copying a neighbour's markup with the id, title, type, colour and blurb from `img/games/games.json`, and update the counts on the chips and in the hero.
