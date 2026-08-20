import { faker } from '@faker-js/faker'

export async function generateTagData(tagCount: number) {
    const generatedTagData = []
    const assignedTagNames = new Set<string>()

    for (let i = 0; i < tagCount; i++) {
        let name: string

        do {
            name = faker.word.words(Math.max(Math.round(Math.random() * 2), 1))
        } while (assignedTagNames.has(name))

        assignedTagNames.add(name)

        const id = crypto.randomUUID()
        const slug = name.replaceAll(' ', '-')

        generatedTagData.push({
            id,
            name,
            slug,
        })
    }

    return generatedTagData
}
