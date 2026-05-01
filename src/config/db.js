import pg from 'pg';

import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new pg.Pool({
  // connectionString: process.env.DIRECT_URL,
  host: 'aws-1-us-east-2.pooler.supabase.com',
  port: 5432,
  user: 'postgres.rzgatpaffijspdfaabpe',
  database: 'postgres',
  password: "One3Pizzatree",
  ssl: {rejectUnauthorized: false}
});
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error("POOL TEST FAILED:", err.message);
  else console.log("POOL TEST SUCCESS:", res.rows[0]);
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via prisma");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
};