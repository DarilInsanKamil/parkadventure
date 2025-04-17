export async function GET(req: Request) {
    try {
        const res = [{
            "id": 1,
            "alt": "test-image",
            "title": "whiteasdsa",
            "price": 200000,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "image": "/background.png",
            "list": [{
                "id": 1,
                "title": "Paket Adventure",
            }, {
                "id": 2,
                "title": "Paket Adventure2",
            }]
        }];

        return new Response(JSON.stringify(res), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (err) {
        console.error('Error executing query', err);
        let errorMessage = 'An error occurred while fetching data';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}