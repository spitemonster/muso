import { graphql } from '$lib/gql';

export const AdminDashboardQuery = graphql(`
	query AdminDashboard($id: String!) {
		users(where: { id: { eq: $id } }) {
			id
			name
		}
	}
`);