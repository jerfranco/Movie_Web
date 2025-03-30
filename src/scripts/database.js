import { Client } from 'pg';

const client = new Client({
    connectionString: 'postgresql://postgres:nY6FBsIkdvMEoZcw@db.iwfnjafqjesjmlzfgkts.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false } // Required for Supabase
});

await client.connect();

export default client;
