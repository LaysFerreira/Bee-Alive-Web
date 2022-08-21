import Database from './database.js'

async function up() {
  const db = await Database.connect();

  const especiesSql = `
    CREATE TABLE Especies (
      id_especie INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_cientifico VARCHAR(50),
      tamanho INTEGER NOT NULL,
      comportamento VARCHAR(200) NOT NULL,
      cor VARCHAR(20) NOT NULL
    )
  `;
  
  await db.run(especiesSql);

  const regioesSql = `
    CREATE TABLE Regioes (
      id_regiao INTEGER PRIMARY KEY AUTOINCREMENT,
      UF VARCHAR(20) NOT NULL
    )
  `;
  
  await db.run(regioesSql);
  
  const sql = `
    CREATE TABLE Meliponarios (
        id_meliponario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(30) NOT NULL,
        descricao VARCHAR(500) NOT NULL,
        qtd_caixas INTEGER NOT NULL,
        telefone VARCHAR(12) NOT NULL, 
        bairro VARCHAR(20) NOT NULL,
        rua VARCHAR(30) NOT NULL,
        numero INTEGER NOT NULL,
        regioes_id INTEGER NOT NULL,
        FOREIGN KEY (regioes_id) REFERENCES regioes (id_regiao)
    )
    `;

  await db.run(sql);


 const meliponicultoresSql = `
    CREATE TABLE Meliponicultores (
      id_meliponicultor INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(50) NOT NULL UNIQUE,
      senha VARCHAR(30) NOT NULL,
      nome VARCHAR(30) NOT NULL,
      cidade VARCHAR(30) NOT NULL,
      cpf INTEGER NOT NULL,
      telefone VARCHAR(12)   
    )
  `;

  db.run(meliponicultoresSql);
}

export default { up };
