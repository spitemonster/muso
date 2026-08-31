import { API_URL } from '$env/static/private';

interface GraphQLResponse<T> {
	data?: T;
	errors?: Array<{ message: string; }>;
}

export async function gqlRequest<TData, TVariables = Record<string, any>>(query: string, variables?: TVariables,) {
	const response = await fetch(`${API_URL}/graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query,
			variables
		})
	});

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	const result = await response.json();

	if (result.errors && result.errors.length > 0) {
		throw new Error(`GraphQL Error: ${result.errors[0].message}`);
	}

	if (!result.data) {
		throw new Error('GraphQL Error: No data returned from the server.');
	}

	return result.data;
}