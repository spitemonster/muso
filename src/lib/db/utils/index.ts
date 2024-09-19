import { sql } from 'drizzle-orm'
import { db } from '$lib/db'

export {
    getUserFromDbById,
    getUserFromDbByEmail,
    userToSafeUser,
    createUser,
} from './user.utils'

export {
    getSongFromDbById,
    getSongsFromDbByArtistId,
    getSongsFromDbByAlbumId,
} from './song.utils'

export {
    getAlbumFromDbById,
    getAlbumsFromDbByArtistId,
    getRandomAlbums,
} from './album.utils'

export {
    getArtistFromDbById,
    getArtistsFromDbByUserId,
    getArtistsFromDbByUserEmail,
    getRandomArtists,
    getArtistsByTagId,
} from './artist.utils'

export {
    getTagFromDbById,
    getTagFromDbBySlug,
    createTagDbRecord,
    createArtistTagDbRecord,
    getArtistTagFromDb,
    getRandomTags,
    getArtistTags,
} from './tag.utils'
