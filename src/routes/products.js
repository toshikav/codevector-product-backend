const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;

    const { cursorCreatedAt, cursorId, category } = req.query;

    let query = `
      SELECT *
      FROM products
    `;

    const values = [];
    const conditions = [];

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (cursorCreatedAt && cursorId) {
      values.push(cursorCreatedAt);
      values.push(cursorId);

      conditions.push(`
        (created_at, id) < ($${values.length - 1}, $${values.length})
      `);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    values.push(limit);

    query += `
      ORDER BY created_at DESC, id DESC
      LIMIT $${values.length}
    `;

    const result = await pool.query(query, values);

    let nextCursor = null;

    if (result.rows.length > 0) {
      const last = result.rows[result.rows.length - 1];

      nextCursor = {
        createdAt: last.created_at,
        id: last.id,
      };
    }

    res.json({
      products: result.rows,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = router;