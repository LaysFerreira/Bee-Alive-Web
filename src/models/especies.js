import Database from '../database/database.js';

async function create(especie) {
  const db = await Database.connect();

  const {id_especie , tamanho, comportamento, nome_cientifico, cor } = especie;

  const sql = `
    INSERT INTO
      Especies (id_especie , tamanho, comportamento, nome_cientifico, cor)
    VALUES
      (?, ?, ?, ?, ?)
  `;

  const {lastID} = await db.run(sql, [id_especie, tamanho, comportamento, nome_cientifico, cor]);

  return read(lastID);
}

async function readAll() {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      Especies
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
      Especies
    WHERE
      id_especie = ?
  `;

  const especie = await db.get(sql, [id]);

  return especie;
}

async function update( especie, id_especie) {
  const db = await Database.connect();

  const {tamanho, comportamento, nome_cientifico, cor } = especie;

  const sql = `
    UPDATE 
      Especies
    SET
      tamanho = ?, comportamento = ?, nome_cientifico = ?, cor =?
    WHERE
      id_especie = ?
  `;

  const { changes } = await db.run(sql, [id_especie, tamanho, comportamento, nome_cientifico, cor]);

  if (changes === 1) {
    return read(id_especie);
  } else {
    return false;
  }
}

export default {create, readAll, read, update};