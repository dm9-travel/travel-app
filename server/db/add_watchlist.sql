INSERT INTO watch_list(list_id,user_id,trip_id)
VALUES (default,$1,$2);
SELECT watch_list.user_id,trips.country,trips.currency,trips.locale,trips.origin,trips.destination,trips.outbound_date,trips.inbound_date,trips.budget
FROM watch_list 
INNER JOIN trips ON watch_list.trip_id = trips.trip_id
WHERE watch_list.trip_id = $2;