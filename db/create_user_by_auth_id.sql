INSERT INTO users(auth_id, user_name) VALUES ($1, $2);
SELECT * from users where auth_id = $1;
