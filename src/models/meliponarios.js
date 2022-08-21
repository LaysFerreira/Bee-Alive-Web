import Database from '../database/database.js';

async function readAll() {
  const db = await Database.connect();

  const sql = `
     SELECT 
      m.id_meliponario, m.nome, m.descricao, m.qtd_caixas, m.telefone, m.bairro, m.rua, m.numero, r.UF as regiao
    FROM 
      Meliponarios as m INNER JOIN Regioes as r
    ON
      m.regioes_id = r.id_regiao
   ` ;

  const meliponarios = await db.all(sql);
  console.log(meliponarios);
  return meliponarios;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT 
      m.id_meliponario, m.nome, m.descricao, m.qtd_caixas, m.telefone, m.bairro, m.rua, m.numero, r.UF as regiao
    FROM 
      Meliponarios as m INNER JOIN Regioes as r
    ON
      m.regioes_id = r.id_regiao
    WHERE
      m.id_meliponario = ?
  `;

  const meliponario = await db.get(sql, [id]);

  return meliponario;
}

async function create(meliponario) {
  const db = await Database.connect();

  const { nome, descricao, qtd_caixas, telefone, bairro, rua, numero, regioes_id } = meliponario;

  const sql = `
    INSERT INTO
      Meliponarios (nome, descricao, qtd_caixas, telefone, bairro, rua, numero, regioes_id)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const {lastID} = await db.run(sql, [nome, descricao, qtd_caixas, telefone, bairro, rua, numero, regioes_id]);

  // const newMeliponario = await read(lastID);
    // console.log('New', lastID, newMeliponario)
  const newMeliponario = {codmeliponario: lastID, ...meliponario};

  return newMeliponario;
}

async function update(meliponario, id_meliponario) {
  const db = await Database.connect();

  const { nome, qtd_caixas, telefone, bairro, rua, numero, descricao, regioes_id } = meliponario;

  const sql = `
    UPDATE 
      Meliponarios
    SET
      nome = ?, qtd_caixas = ?, telefone = ?,  bairro = ?, rua = ?, numero = ?, descricao = ?, regioes_id = ?
    WHERE
      id_meliponario = ?
  `;

  const { changes } = await db.run(sql, [nome, qtd_caixas, telefone, bairro, rua, numero, descricao, regioes_id, id_meliponario]);

  if (changes === 1) {
    return read(id_meliponario);
  } else {
    return false;
  }
}

async function destroy(id_meliponario) {
  const db = await Database.connect();

  const sql = `
    DELETE FROM
      Meliponarios
    WHERE
      id_meliponario = ?
  `;

  const { changes } = await db.run(sql, [id_meliponario]);

  return changes === 1;
}

async function ReadByregioes() {
  const db = await Database.connect();

  const sql = `
    SELECT 
      Regioes
    FROM
      Meliponarios
    WHERE
      Regioes = ?
`;
  
}

export default { readAll, read, create, update, destroy, ReadByregioes };