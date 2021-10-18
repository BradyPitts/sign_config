INSERT INTO sign_users (email, hash)
VALUES ($1, $2)
RETURNING *;