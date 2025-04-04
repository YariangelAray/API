# Creación del usuario
create user 'yariangel_adso2894667'@'localhost' identified by '0421';

# Creación de la base de datos
create database node_adso2894667;

grant all on node_adso2894667.* to yariangel_adso2894667@localhost;

flush privileges;