import bcrypt from 'bcryptjs';
import Database from '../database/database.js';

const salt = 10;

async function create(meliponicultor) {
  const db = await Database.connect();

  const {nome, email, senha, cidade, cpf, telefone} = meliponicultor;
  
  const hash = bcrypt.hashSync(senha, salt);

  const sql = `
    INSERT INTO
      Meliponicultores (nome, email, senha, cidade, cpf, telefone )
    VALUES
      (?, ?, ?, ?, ?, ?)
  `;

  const {lastID} = await db.run(sql, [nome, email, hash, cidade, cpf, telefone]);

  return read(lastID);
}

async function read(id_meliponicultor) {
  const db = await Database.connect();

  const sql = `
    SELECT 
      *
    FROM 
      Meliponicultores
    WHERE
      id_meliponicultor = ?
  `;

  const meliponicultor = await db.get(sql, [id_meliponicultor]);

  return meliponicultor;
}

export default { create, read };