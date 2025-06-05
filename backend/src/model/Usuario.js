import { sql } from "../../db.js";

export async function criar() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS usuario (
            id_usuario SERIAL PRIMARY KEY,
            registro_academico VARCHAR(30) UNIQUE,
            nome VARCHAR(100) NOT NULL,
            data_nascimento DATE,
            email VARCHAR(255),
            telefone VARCHAR(30),
            tipo VARCHAR(50)
        );
        `;
        console.log("Tabela criada ou já existente");
    } catch (error) {
        console.error('Erro na função criar():', error);
    }
}

export async function mostrar() {
    try {
        const resultado = await sql`SELECT * FROM usuario`;
        return resultado; 
    } catch (error) {
        console.error('Erro na função mostrar():', error);
        throw error;
    }
}

export default { criar, mostrar };
