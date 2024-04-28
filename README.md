# muso

an open source music distribution platform and streaming player

# history

i am an (easily bored/distracted) overachiever and 🖕 epic games. i am also maybe more behind on modern js development so would like a project to dig into to get me up to speed.

my primary motivator here is that i wish someone _would_ create an independent competitor to (the now corporate-and-partially-chinese-owned) bandcamp and services like spotify (which i still use, like we all do). i don't know what the business of that looks like (though almost certainly infeasible, buy music from independent retailers please) but i can imagine what the product itself looks like and how it functions. truth be told i have not thought far enough into this to have an exhaustive roadmap, but:

# roadmap

like all this, this will change and has changed.

-   [ ] artist account management
    -   [ ] song upload, server side audio conversion
    -   [ ] discography management
    -   [ ] sales/download reporting
-   [ ] streaming music player
    -   [ ] search, tagging and recommendations for organic discovery

# setup

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

# license

whatever the MIT license is; do what you want. if you actually do something with this (unlikely) just let me know, would be interested to see.
