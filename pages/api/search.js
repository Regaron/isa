import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function (req, res) {
  const { query } = req;
  const searchString = query.term ? `%${query.term}%` : "%";
  const client = await pool.connect();
  try {
    const data = await client.query(
      `SELECT *
         FROM "Product"
         WHERE title ILIKE '${searchString}' AND released=true`
    );
    res.status(200).json(data.rows ?? data[0].rows);
  } catch (e) {
    res.status(400).json(e);
  }
  client.release();
}
