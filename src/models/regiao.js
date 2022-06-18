import Database from '../database/database.js';

async function create(regiao) {
  const db = await Database.connect();

  const {id, UF} = regiao;

  const sql = `
    INSERT INTO
      regioes (id, UF)
    VALUES
      (?, ?)
  `;

  const {lastID} = await db.run(sql, [id, UF]);

  return read(lastID);
}

async function readAll() {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      regioes
  `;

  const regioes = await db.all(sql);

  return regioes;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      regioes
    WHERE
      id = ?
  `;

  const regiao = await db.get(sql, [id]);

  return regiao;
}

export default {create, readAll, read};