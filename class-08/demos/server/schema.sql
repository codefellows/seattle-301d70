DROP TABLE location;

CREATE TABLE location(
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  formatted_query VARCHAR(255),
  latitude DECIMAL(18,15),
  longitude DECIMAL(18,15)
)

-- Decimal(18,15) says 18 total digits, 15 can be decimals