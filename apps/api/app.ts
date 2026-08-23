import { Hono } from 'hono'
import type { HonoRequest } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { serve } from '@hono/node-server'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema'
import { db } from '@muso/db/db'

import { createLoaders, type Loaders } from './loaders'

type GraphQLContext = {
	req: HonoRequest
	db: typeof db
	loaders: Loaders
}

const yoga = createYoga<GraphQLContext>({
	schema,
	graphqlEndpoint: '/graphql',
})

const app = new Hono()
app.get('/', (ctx) => ctx.text('API'))

app.all('/graphql', async (c) => {
	const response = await yoga.handle(c.req.raw, { req: c.req, db, loaders: createLoaders() })
	return response
})

app.use(prettyJSON())

app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

const server = serve({ fetch: app.fetch, port: 8888 })

// graceful shutdown
process.on('SIGINT', () => {
	server.close()
	process.exit(0)
})
process.on('SIGTERM', () => {
	server.close((err) => {
		if (err) {
			console.error(err)
			process.exit(1)
		}
		process.exit(0)
	})
})
