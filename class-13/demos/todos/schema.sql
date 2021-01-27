-- the schema is the shape / skeleton of the database
-- it describes how the table should look (this file is not connected to postgresql), we have to run it when we make changes

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  task VARCHAR(255),
  dueDate VARCHAR(255)
)

