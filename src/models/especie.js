import Database from '../database/database.js';

async function create(especie) {
  const db = await Database.connect();

  const {id, tamanho, comportamento, nome_cientifico, cor } = especie;

  const sql = `
    INSERT INTO
      especies (id, tamanho, comportamento, nome_cientifico, cor)
    VALUES
      (?, ?, ?, ?, ?)
  `;

  const {lastID} = await db.run(sql, [id, tamanho, comportamento, nome_cientifico, cor]);

  return read(lastID);
}

async function readAll() {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      especies
  `;

  const especies = await db.all(sql);

  return especies;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      especies
    WHERE
      id = ?
  `;

  const especie = await db.get(sql, [id]);

  return especie;
}

async function update( especie, id) {
  const db = await Database.connect();

  const {tamanho, comportamento, nome_cientifico, cor } = especie;

  const sql = `
    UPDATE 
      especies
    SET
      tamanho = ?, comportamento = ?, nome_cientifico = ?, cor =?
    WHERE
      id = ?
  `;

  const { changes } = await db.run(sql, [id, tamanho, comportamento, nome_cientifico, cor]);

  if (changes === 1) {
    return read(id);
  } else {
    return false;
  }
}

export default {create, readAll, read};