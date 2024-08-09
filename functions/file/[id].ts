export async function onRequest(context) {  // Contents of context object
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    const url = new URL(request.url);

    return fetch(
        'https://telegra.ph/' + url.pathname + url.search,
        {
            method: request.method,
            headers: request.headers,
            body: request.body,
        }
    );
}

// Respond to OPTIONS method
export const onRequestOptions: PagesFunction = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Max-Age': '86400',
        },
    });
};



