import { pgEnum } from 'drizzle-orm/pg-core';

export const releaseStatusEnum = pgEnum('status', ['draft', 'published', 'private', 'trashed']);
export const collectionTypeEnum = pgEnum('collection_type', ['album', 'ep', 'single', 'compilation']);
export const userTypeEnum = pgEnum('user_type', ['user', 'admin']);