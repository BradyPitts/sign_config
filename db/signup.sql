INSERT INTO users (email, hash)
VALUES ($1, $2)
RETURNING *;