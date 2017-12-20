INSERT INTO users(auth_id, user_name, email) VALUES ($1, $2, $3);
SELECT * from users where auth_id = $1;
