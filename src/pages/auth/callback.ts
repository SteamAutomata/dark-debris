export const prerender = false

export async function POST({ request }: { request: Request }) {
	return Response.json(
		{
			request,
		},
		{ status: 200 }
	)
}

interface GETParams {
	request: Request
	params: any
}

export async function GET({ request, params }: GETParams) {
	return Response.json(
		{
			request,
			params,
		},
		{ status: 200 }
	)
}
