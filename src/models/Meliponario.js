import Database from '../database/database.js';

async function readAll() {
  const db = await Database.connect();

  const sql = `
     SELECT 
      m.codmeliponario, m.name, m.caixas, m.bairro, m.rua, m.CEP, m.descricao, r.UF as regiao
    FROM 
      meliponario as m INNER JOIN regioes as r
    ON
      m.regioes_id = r.id
   ` ;

  const meliponarios = await db.all(sql);
  console.log(meliponarios);
  return meliponarios;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT 
      m.codmeliponario, m.name, m.caixas, m.bairro, m.rua, m.CEP, m.descricao, r.UF as regiao
    FROM 
      meliponario as m INNER JOIN regioes as r
    ON
      m.regioes_id = r.id
    WHERE
      m.codmeliponario = ?
  `;

  const meliponario = await db.get(sql, [id]);

  return meliponario;
}

async function create(meliponario) {
  const db = await Database.connect();

  const { name, caixas, bairro, rua, CEP, descricao, regioes_id } = meliponario;

  const sql = `
    INSERT INTO
      meliponario (name, caixas, bairro, rua, CEP, descricao, regioes_id)
    VALUES
      (?, ?, ?, ?, ?, ?, ?)
  `;

  const {lastID} = await db.run(sql, [name, caixas, bairro, rua, CEP, descricao, regioes_id]);

  // const newMeliponario = await read(lastID);
    // console.log('New', lastID, newMeliponario)
  const newMeliponario = {codmeliponario: lastID, ...meliponario};

  return newMeliponario;
}

async function update(meliponario, id) {
  const db = await Database.connect();

  const { name, caixas, bairro, rua, CEP, descricao, regiao_id } = meliponario;

  const sql = `
    UPDATE 
      meliponario
    SET
      name = ?, caixas = ?, bairro = ?, rua =?, CEP = ?, descricao = ?, regioes_id = ?
    WHERE
      codmeliponario = ?
  `;

  const { changes } = await db.run(sql, [name, caixas, bairro, rua, CEP, descricao, regiao_id, codmeliponario]);

  if (changes === 1) {
    return read(codmeliponario);
  } else {
    return false;
  }
}

async function destroy(id) {
  const db = await Database.connect();

  const sql = `
    DELETE FROM
      meliponario
    WHERE
      codmeliponario = ?
  `;

  const { changes } = await db.run(sql, [id]);

  return changes === 1;
}

async function ReadByregioes() {
  const db = await Database.connect();

  const sql = `
    SELECT 
      regioes
    FROM
      meliponarios
    WHERE
      regioes = ?
`;
  
}

export default { readAll, read, create, update, destroy, ReadByregioes };