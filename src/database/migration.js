import Database from './database.js'

async function up() {
  const db = await Database.connect();

  const especiesSql = `
    CREATE TABLE especies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tamanho INTEGER NOT NULL,
      comportamento VARCHAR(100) NOT NULL,
      nome_cientifico VARCHAR(30),
      cor VARCHAR(18) NOT NULL
    )
  `;
  
  await db.run(especiesSql);

  const regioesSql = `
    CREATE TABLE regioes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      UF VARCHAR(18) NOT NULL
    )
  `;
  
  await db.run(regioesSql);
  
  const sql = `
    CREATE TABLE meliponario (
        codmeliponario INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(20) NOT NULL,
        caixas INTEGER NOT NULL,
        bairro VARCHAR(20) NOT NULL,
        rua VARCHAR(20) NOT NULL,
        CEP INTEGER NOT NULL,
        descricao VARCHAR(20),
        regioes_id INTEGER NOT NULL,
        FOREIGN KEY (regioes_id) REFERENCES regioes (id)
    )
    `;

  await db.run(sql);


 const usersSql = `
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(20) NOT NULL
    )
  `;

  db.run(usersSql);
}

export default { up };
