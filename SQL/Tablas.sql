show databases;

use node_adso2894667;

drop table if exists categorias;
drop table if exists productos;

create table categorias(
id int auto_increment primary key,
nombre varchar(255) not null,
descripcion text,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp
);

create table productos(
id int auto_increment primary key,
nombre varchar(255) not null,
descripcion text,
precio decimal (10,2),
categoria_id int,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp,
foreign key (categoria_id) references categorias(id) on delete set null
);

insert into categorias (nombre, descripcion) values
("Electronica", "Para productos electrónicos"),
("Ropa", "Para prendas de vestir"),
("Alimentos", "Para productos alimenticios");

insert into productos (nombre, descripcion, precio, categoria_id) values
("Laptop Lenovo", "Laptop con procesador Intel Core i5 y 8GB de RAM", 2500000, 1),
("Camiseta de algodón", "Camiseta unisex 100% algodón, color negro", 50000, 2),
("Caja de galletas", "Galletas surtidas de chocolate y vainilla", 10000, 3);

select * from categorias;
select * from productos;