/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status BOOLEAN,
    user_id bigint REFERENCES users(id)
);