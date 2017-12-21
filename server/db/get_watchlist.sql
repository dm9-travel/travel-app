SELECT *
FROM watch_list
INNER JOIN trips ON watch_list.trip_id=trips.trip_id
WHERE user_id = $1