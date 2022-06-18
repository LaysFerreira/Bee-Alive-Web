import { resolve } from 'path';
import { readFileSync} from 'fs';
import Meliponario from '../models/Meliponario.js';
import Regiao from '../models/regiao.js';
import Especie from '../models/especie.js';


async function up() {
  const file = resolve(process.cwd(), "src", "database", "seeders.json");

  const content = JSON.parse(readFileSync(file));

for (const especie of content.especies) {
    await Especie.create(especie);
}

for (const regiao of content.regioes) {
    await Regiao.create(regiao);
}
  
  for (const meliponario of content.meliponarios) {
    await Meliponario.create(meliponario);
  }
}

export default { up };