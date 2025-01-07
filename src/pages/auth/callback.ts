export async function POST({ request }: { request: Request }) {}

interface GETParams {
  request: Request;
  params: any;
}

export async function GET({ request, params }: GETParams) {
  return Response.json(
    {
      request,
      params,
    },
    { status: 200 }
  );
}
