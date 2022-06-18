import Migration from './migration.js';
import Seed from './seed.js';

async function load() {
  await Migration.up();
  await Seed.up();
}

load();