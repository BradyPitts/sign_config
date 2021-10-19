DELETE FROM sign_user_data
WHERE user_id = $1
INSERT INTO sign_user_data (user_id, user_data)
VALUES ($1, $2);