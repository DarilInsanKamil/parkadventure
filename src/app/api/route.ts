export async function GET(req: Request) {
    try {
        const res = [
            {
                "id": 1,
                "name": "John Doe",
                "email": "jhondoe@mail.com"
            },
            {
                "id": 2,
                "name": "John Doe1",
                "email": "jhondoe@mail.com"
            },
            {
                "id": 3,
                "name": "John Doe2",
                "email": "jhondoe@mail.com"
            },
            {
                "id": 4,
                "name": "John Doe3",
                "email": "jhondoe@mail.com"
            },
            {
                "id": 5,
                "name": "John Doe4",
                "email": "jhondoe@mail.com"
            },
        ];

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