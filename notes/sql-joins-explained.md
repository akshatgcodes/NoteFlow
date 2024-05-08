---
title: SQL Joins Explained
slug: sql-joins-explained
created: 2026-09-15T20:16:28
tags: Database
---

# SQL Joins Explained

A quick note on SQL join types when working with a relational database.

```sql
SELECT users.name, orders.total
FROM users
JOIN orders ON orders.user_id = users.id;
```

An `INNER JOIN` returns rows with matches in both tables. Postgres also
supports `LEFT JOIN`, `RIGHT JOIN`, and `FULL OUTER JOIN`. Adding the
right index on join columns matters a lot for query performance.
