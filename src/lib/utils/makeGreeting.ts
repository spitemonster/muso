export default function makeGreeting(name: string | null = null) {
    const greetings = ['Hello', 'Hey', 'Greetings', 'Allo', 'Bonjour', 'Ciao']

    const g = greetings[Math.floor(Math.random() * greetings.length)]

    if (!name) {
        return g
    }

    return `${g} ${name}!`
}
