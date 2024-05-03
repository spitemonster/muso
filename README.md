# muso

an open source music distribution platform and streaming player

## history

i am an (easily bored/distracted) overachiever and 🖕 epic games/tencent.

my primary motivator here is that i wish someone _would_ create an independent competitor to (the now corporate-and-partially-chinese-owned) bandcamp and services like spotify (which i still use, like we all do): i have problems with the ethics of the current music industry and the tools that are ostensibly built for independent artists to support themselves. that said, i am not the person to solve those ethical problems: i am a code monkey. as such this is not intended nor expected to be taken to full production; it is an exercise for me.

## stack

sveltekit stack, postgres database. i don't really believe in tailwind or css libraries in general anymore so custom css.

## roadmap

like all this, this will change and has changed.

-   [x] jwt authentication
-   [x] postgres database
-   [x] rest api for artist management\*
    -   \*no auth in place for api at this point, just putting pieces in place
-   [ ] user account management
    -   [ ] library of artists/songs/albums
    -   [ ] likes, follows, tags
    -   [ ] easily set up artist accounts
-   [ ] artist account management
    -   [ ] song upload, server side audio conversion
    -   [x] discography management
    -   [ ] sales/download reporting
-   [ ] streaming music player
    -   [ ] search, tagging and recommendations for organic discovery

## setup

clone, `npm install`, `npm run dev --start` to open up a vite development server at the default vite port.

you'll need a postgres server up and running and set up in your .env as shown in .env.example, as well as a few other values.

## seeding

to seed the db uncomment these lines in `hooks.server.ts`.

```
// seed db
// await db.insert(users).values(userData)
// await db.insert(artists).values(artistData)
// await db.insert(albums).values(albumData)
// await db.insert(songs).values(songData)
```

this will generate a bunch of dummy data though at this stage it won't help you much without something to view it and make direct modifications to the table.

## license

whatever the MIT license is; do what you want. if you actually do something with this (unlikely) just let me know, would be interested to see.
