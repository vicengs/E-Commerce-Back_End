/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : schema.sql          */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/28/2022          */
/* ------------------------------ */
-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;
-- CREATE DATABASE
CREATE DATABASE ecommerce_db;
/*-- Select new database to next steps
USE ecommerce_db;
-- Eliminate tables if exists
DROP TABLE IF EXISTS product_tag;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS tags;
-- Create categories table
CREATE TABLE categories (
    id   INTEGER     AUTO_INCREMENT PRIMARY KEY
   ,name VARCHAR(30)                NOT NULL
);
-- Create products table
CREATE TABLE products (
    id          INTEGER       AUTO_INCREMENT PRIMARY KEY
   ,name        VARCHAR(30)                  NOT NULL
   ,price       DECIMAL(10,2)                NOT NULL
   ,stock       INTEGER                      NOT NULL
   ,category_id INTEGER
   ,CONSTRAINT fk_categories FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
-- Create tags table
CREATE TABLE tags (
    id          INTEGER       AUTO_INCREMENT PRIMARY KEY
   ,name        VARCHAR(30)                  NOT NULL
);
-- Create product_tag table
CREATE TABLE product_tag (
    id         INTEGER       AUTO_INCREMENT PRIMARY KEY
   ,product_id INTEGER
   ,tag_id     INTEGER
   ,CONSTRAINT fk_products FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
   ,CONSTRAINT fk_tags     FOREIGN KEY (tag_id)     REFERENCES tags(id)     ON DELETE SET NULL
);*/