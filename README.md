# muso

an open source music distribution service, internet radio, streaming app and social music discovery platform.

## philosophy

i am an (easily bored/distracted) overachiever and 🖕 epic games/tencent.

the music industry has never not been a nightmare and only existed as a leech seeking to suck anything worthwhile out of art at the cost of everything beautiful about it. independent voices and organizations are eaten whole by corporate interests that do not give a single fuck about art and only love the mighty dollar. things become that against which they once stood in opposition. over and over.

this app is not a solution to that, but here you go anyway.

### for artists

create and manage your own storefront, hosted and managed wherever you want. employ a rich set of tools for distributing your music including direct physical and digital sales, internet radio and streaming, both featuring organic discovery. all features are opt in and offer granular and immediate control over who has access to your music, where and for how long. for example:

-   opt-in to streaming service but only for users who have purchased your music
-   restrict the number of times your music can be streamed per duration per user
-   opt-in to all services freely and openly distribute your music without restriction

tools for organic discovery include artist and community tagging, non-algorithmic social sharing.

### for listeners

## stack

sveltekit stack, postgres database. i don't really believe in tailwind or css libraries in general anymore so custom css. what do you usually put here?

## setup

clone, `npm install`, `npm run dev --start` to open up a vite development server at the default vite port.

you'll need a postgres server up and running and set up in your .env as shown in .env.example, as well as a few other values.

## seeding

to seed the db uncomment these lines in `hooks.server.ts` and run the project once.

```
// seed db
// await db.insert(users).values(userData)
// await db.insert(artists).values(artistData)
// await db.insert(albums).values(albumData)
// await db.insert(songs).values(songData)
```

this will generate a bunch of dummy data though at this stage it won't help you much without something to view it and make direct modifications to the table.

## license

do what you want. if you actually do something with this (unlikely) just let me know, would be interested to see.
