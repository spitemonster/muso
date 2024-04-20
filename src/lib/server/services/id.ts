export function generateID(length: number = 8): string {
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomPosition = Math.floor(Math.random() * charset.length);
        randomString += charset.charAt(randomPosition);
    }
    return randomString;
}
