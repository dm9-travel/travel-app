DELETE FROM watch_list WHERE trip_id=$1;
DELETE FROM trips WHERE trip_id=$1
RETURNING *;