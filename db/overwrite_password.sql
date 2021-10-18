--overwrite_password
UPDATE sign_users 
SET hash = $2
WHERE email = $1
RETURNING *;