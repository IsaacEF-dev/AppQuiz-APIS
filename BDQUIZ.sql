create database quiz;
use  quiz;

create table usuario(
	id int not null auto_increment primary key,
    nombre varchar(50) not null,
    apellidos varchar(50),
    correo varchar(60) not null unique,
    pass varchar(150) not null
);

create table categoria(
	id int not null primary key,
	nombre varchar(50)
);

create table cuestionario(
	id int not null auto_increment primary key,
	nombre varchar(50) not null,
	id_categoria int not null,
	foreign key (id_categoria) references categoria(id)
);

create table pregunta(
	id int not null auto_increment primary key,
	nombre varchar(120) not null
);

create table respuesta(
	id int not null auto_increment primary key,
	nombre varchar(50) not null,
    correcta boolean,
    id_pregunta int,
    foreign key (id_pregunta) references pregunta(id)
);

create table pregunta_cuestionario(
	id_pregunta int,
	id_cuestionario int,
	foreign key (id_pregunta) references pregunta(id),
	foreign key (id_cuestionario) references cuestionario(id)
);

create table usuario_cuestionario(
	id int not null auto_increment primary key,
    fecha datetime not null,
    calificacion double not null,
    id_cuestionario int,
    id_usuario int ,
    foreign key (id_usuario) references usuario(id),
	foreign key (id_cuestionario) references cuestionario(id)
);

create table usuario_cuestionario_respuesta(
	id_usuario_cuestionario int,
    id_pregunta int,
	id_cuestionario int,
    id_respuesta int,
	foreign key (id_pregunta) references pregunta_cuestionario(id_pregunta),
    foreign key (id_respuesta) references respuesta(id),
	foreign key (id_cuestionario) references pregunta_cuestionario(id_cuestionario),
    foreign key (id_usuario_cuestionario) references usuario_cuestionario(id)
);

