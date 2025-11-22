CREATE DATABASE zhennova_db;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Crea las tablas en orden de dependencia (de menor a mayor dependencia)

-- Tabla: roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL CHECK (name IN ('user', 'admin'))
);

-- Tabla: categorías (no depende de nadie)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Tabla: usuarios (depende de roles)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Usa TEXT en lugar de VARCHAR(150)
    role_id INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET DEFAULT
);

-- Tabla: productos (depende de categories)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    category_id INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Tabla: carrito (depende de users y products)
CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0 AND quantity <= 100),
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabla: órdenes (usa UUID y depende de users)
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id INT NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Tabla: detalles de órdenes (depende de orders y products)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id UUID NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_per_unit DECIMAL(10, 2) NOT NULL CHECK (price_per_unit > 0),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);


INSERT INTO roles (name) VALUES ('user'), ('admin');


INSERT INTO categories (name, description) VALUES
('Periféricos', 'Teclados, mouses, monitores'),
('Componentes', 'Placas madre, RAM, fuentes');

INSERT INTO products (name, description, price, stock, category_id) VALUES
('Teclado Mecánico RGB', 'Teclado mecánico con retroiluminación RGB y switches azules', 85000.00, 25, 1),
('Mouse Gaming Inalámbrico', 'Mouse de 16000 DPI con batería de larga duración', 36200.00, 40, 1),
('Placa Madre B550', 'Placa madre compatible con Ryzen 5000, 4 slots RAM DDR4', 180000.00, 12, 2),
('Memoria RAM 16GB DDR4', 'Módulo de 16GB a 3200MHz, ideal para gaming y productividad', 45000.00, 30, 2),
('Monitor 27" Full HD', 'Monitor IPS de 27 pulgadas con 144Hz y 1ms de respuesta', 220000.00, 8, 1);