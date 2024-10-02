# muso

an in-progress open source music distribution service, internet radio, streaming app and social music discovery platform.

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

sveltekit stack with tailwind, postgres database.

## setup

clone, `npm install` to get everything installed. you'll need to seed before you get anything useful.

### seeding

`package.json` contains 3-4 main scripts for setting up/updating your database.

`drizzle:refresh` drops all tables in the database, runs the latest migration (after your confirmation) and seeds the database. it does so using the following scripts:

`drizzle:drop` runs `src/lib/db/utils/clearDb.utils.ts`
`drizzle:migrate` runs drizzle migrations
`drizzle:seed` runs contents of `src/lib/db/seed`

### running

once the db is seeded, simply run `npm run dev` to get a vite server up and running. endpoints should be immediately functional.

## license

do what you want. if you actually do something with this (unlikely) just let me know, would be interested to see.
