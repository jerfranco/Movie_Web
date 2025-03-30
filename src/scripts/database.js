import { Client } from 'pg';

const client = new Client({
    connectionString: import.meta.env.POSTGRE_CONNECTION,
    ssl: { rejectUnauthorized: false } // Required for Supabase
});

await client.connect();

export default client;