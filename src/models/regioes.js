import Database from '../database/database.js';

async function create(regiao) {
  const db = await Database.connect();

  const {id_regiao, UF} = regiao;

  const sql = `
    INSERT INTO
      Regioes (id_regiao, UF)
    VALUES
      (?, ?)
  `;

  const {lastID} = await db.run(sql, [id_regiao, UF]);

  return read(lastID);
}

async function readAll() {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      Regioes
  `;

  const regioes = await db.all(sql);

  return regioes;
}

async function read(id_regiao) {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      Regioes
    WHERE
      id_regiao = ?
  `;

  const regiao = await db.get(sql, [id_regiao]);

  return regiao;
}

export default {create, readAll, read};