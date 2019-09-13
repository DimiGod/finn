-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS portfolio_db;
-- Create a database called programming_db --
CREATE DATABASE portfolio_db;

USE portfolio_db;

CREATE TABLE stock_portfolio(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  ticker VARCHAR(20),
  Purchase Price INTEGER(11),
  Quantity Owned INTEGER(11),
 Own BOOLEAN DEFAULT true,
  PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO programming_languages (ticker, Purchase Price, Quantity Owned)
VALUES ("MSFT", 137.41, 5);

INSERT INTO programming_languages (ticker, Purchase Price, Quantity Owned)
VALUES ("AAPL", 217.81, 5);

INSERT INTO programming_languages (ticker, Purchase Price, Quantity Owned)
VALUES ("JPM", 120.01, 5);

INSERT INTO programming_languages (ticker, Purchase Price, Quantity Owned)
VALUES ("AMZN", 1838.57, 5);

INSERT INTO programming_languages (ticker, Purchase Price, Quantity Owned)
VALUES ("KO", 54.36, 5);