DELETE FROM watch_list WHERE trip_id=$1;
DELETE FROM trips WHERE trip_id=$1;
SELECT watch_list.user_id, trips.trip_id, trips.country, trips.currency, trips.locale, trips.origin, trips.destination, trips.outbound_date, trips.inbound_date, trips.budget 
FROM trips INNER JOIN watch_list ON trips.trip_id = watch_list.trip_id 
WHERE watch_list.user_id = $2;