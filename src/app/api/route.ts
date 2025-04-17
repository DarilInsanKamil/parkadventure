export async function GET(req: Request) {
    try {
        const res = [{
            "id": 1,
            "name": "John Doe",
            "email": "jhondoe@mail.com"
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