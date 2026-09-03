import { pgEnum } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['draft', 'published', 'private', 'trashed']);
export const collectionTypeEnum = pgEnum('collection_type', ['album', 'ep', 'single', 'compilation']);
