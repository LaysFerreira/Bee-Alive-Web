import { resolve } from 'path';
import { readFileSync} from 'fs';
import Meliponarios from '../models/meliponarios.js';
import Regioes from '../models/regioes.js';
import Especies from '../models/especies.js';


async function up() {
  const file = resolve(process.cwd(), "src", "database", "seeders.json");

  const content = JSON.parse(readFileSync(file));

for (const especie of content.especies) {
    await Especies.create(especie);
}

for (const regiao of content.regioes) {
    await Regioes.create(regiao);
}
  
  for (const meliponario of content.meliponarios) {
    await Meliponarios.create(meliponario);
  }
}

export default { up };