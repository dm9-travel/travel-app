INSERT INTO users(auth_id, user_name, user_email, user_picture) VALUES ($1, $2, $3, $4);
SELECT * from users where auth_id = $1;
