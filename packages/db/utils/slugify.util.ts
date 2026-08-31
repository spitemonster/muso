export const slugify = (source: string) => {
	return source.toLocaleLowerCase().replaceAll(' ', '-');
};