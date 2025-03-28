show databases;

use node_adso2894667;

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

select * from categorias;