INSERT INTO trips(trip_id,country,currency,locale,origin,destination,outbound_date,inbound_date,budget)
VALUES (default,$1,$2,$3,$4,$5,$6,$7,$8)
RETURNING trip_id,country,currency,locale,origin,destination,outbound_date,inbound_date,budget;