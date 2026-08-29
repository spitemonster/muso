export * from './login.types';


interface UserProperties {
	id: string;
	email: string;
	name: string;
	password?: string;
}

export type User = UserProperties | undefined | null;
