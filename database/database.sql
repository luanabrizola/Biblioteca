DROP TABLE IF EXISTS divida;
DROP TABLE IF EXISTS emprestimo;
DROP TABLE IF EXISTS autores_do_livro;
DROP TABLE IF EXISTS autores;
DROP TABLE IF EXISTS categoria_do_livro;
DROP TABLE IF EXISTS subcategoria;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS livro;
DROP TABLE IF EXISTS cursos_dos_usuarios;
DROP TABLE IF EXISTS curso;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS subcategoria_da_categoria;
DROP TABLE IF EXISTS editora;
DROP TABLE IF EXISTS editora_do_livro;

CREATE TABLE usuario (
	id_usuario SERIAL,
	nome VARCHAR(100) NOT NULL,
	registro_academico VARCHAR(30) UNIQUE,
	data_nascimento DATE,
	email VARCHAR(255),
	telefone VARCHAR(30),
	tipo varchar(50) NOT NULL,
	PRIMARY KEY(id_usuario)
);

CREATE TABLE curso (
	id_curso SERIAL,
	nome VARCHAR(50) NOT NULL,
	codigo VARCHAR(30) UNIQUE,
	PRIMARY KEY(id_curso)
);
 
CREATE TABLE cursos_dos_usuarios (
    id_usuario INTEGER REFERENCES usuario(id_usuario),
	id_curso INTEGER REFERENCES curso(id_curso),
	PRIMARY KEY (id_usuario, id_curso)
);

CREATE TABLE livro (
	id_livro SERIAL,
	titulo VARCHAR(100) NOT NULL,
	qtde_disponivel INT,
	isbn VARCHAR(30) UNIQUE,
	edicao INT,
	editora VARCHAR(50),
	caminho_foto_capa VARCHAR(250),
	PRIMARY KEY (id_livro)
);

CREATE TABLE categoria (
	id_categoria SERIAL,
	nome_categoria VARCHAR(50),	
	PRIMARY KEY (id_categoria)
);

CREATE TABLE subcategoria (
	id_subcategoria SERIAL,
	nome_subcategoria VARCHAR(50),
	id_categoria INTEGER REFERENCES categoria(id_categoria),
	PRIMARY KEY (id_subcategoria)
);

CREATE TABLE categoria_do_livro (
	id_livro INTEGER REFERENCES livro(id_livro),
	id_categoria INTEGER REFERENCES categoria(id_categoria)
);

CREATE TABLE subcategoria_da_categoria(
	id_categoria INTEGER REFERENCES categoria(id_categoria),
	id_subcategoria INTEGER REFERENCES subcategoria(id_subcategoria)
);

CREATE TABLE autores(
	id_autor SERIAL,
	nome_autor VARCHAR(100),
	PRIMARY KEY (id_autor)
);

CREATE TABLE autores_do_livro (
	id_livro INTEGER REFERENCES livro(id_livro),
	id_autor INTEGER REFERENCES autores(id_autor)
);

CREATE TABLE emprestimo (
	id_emprestimo SERIAL,
    id_usuario INTEGER REFERENCES usuario(id_usuario),
    id_livro INTEGER REFERENCES livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    PRIMARY KEY(id_emprestimo)
);

CREATE TABLE divida (
    id_divida SERIAL,
    id_emprestimo INTEGER REFERENCES emprestimo(id_emprestimo),
    valor_multa DECIMAL(10, 2),
    dia_atual INT NOT NULL,
    PRIMARY KEY(id_divida)
);

CREATE TABLE editora(
	id_editora SERIAL,
	nome varchar(100),
	PRIMARY KEY(id_editora)
);

CREATE TABLE editora_do_livro(
	id_livro INTEGER REFERENCES livro(id_livro),
	id_editora INTEGER REFERENCES editora(id_editora)
)
