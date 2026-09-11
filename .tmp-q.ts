import { Pool } from 'pg';
async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const sql = process.argv.slice(2).join(' ');
  const { rows } = await pool.query(sql);
  console.log(JSON.stringify(rows, null, 1));
  await pool.end();
}
void main().catch((e) => { console.error(e); process.exit(1); });
