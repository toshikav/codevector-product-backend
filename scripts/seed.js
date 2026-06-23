const { faker } = require("@faker-js/faker");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Food",
];

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

async function insertBatch(batchSize) {
  const values = [];
  const placeholders = [];

  for (let i = 0; i < batchSize; i++) {
    const name = faker.commerce.productName();

    const category =
      categories[Math.floor(Math.random() * categories.length)];

    const price = Number(faker.commerce.price());

    const createdAt = faker.date.past();
    const updatedAt = new Date();

    const index = i * 5;

    placeholders.push(
      `($${index + 1}, $${index + 2}, $${index + 3}, $${index + 4}, $${index + 5})`
    );

    values.push(
      name,
      category,
      price,
      createdAt,
      updatedAt
    );
  }

  const query = `
    INSERT INTO products
    (name, category, price, created_at, updated_at)
    VALUES
    ${placeholders.join(",")}
  `;

  await pool.query(query, values);
}

async function seedProducts() {
  try {
    console.time("Seeding Time");

    for (
      let inserted = 0;
      inserted < TOTAL_PRODUCTS;
      inserted += BATCH_SIZE
    ) {
      await insertBatch(BATCH_SIZE);

      console.log(
        `Inserted ${inserted + BATCH_SIZE} / ${TOTAL_PRODUCTS}`
      );
    }

    console.timeEnd("Seeding Time");

    console.log("200000 products inserted successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}

seedProducts();