import { PrismaClient } from '@prisma/client';
import { driverSeeder } from './drivers.seeder';
import { grandPrixSeeder } from './grandprix.seeder';
import { seasonDriverSeeder } from './season-drivers.seeder';
import { seasonSeeder } from './season.seeder';
import { teamSeeder } from './teams.seeder';

const prisma = new PrismaClient();

const seeders = [
  { name: 'Season', exec: seasonSeeder },
  { name: 'Teams', exec: teamSeeder },
  { name: 'Drivers', exec: driverSeeder },
  { name: 'Season Drivers', exec: seasonDriverSeeder },
  { name: 'Grand Prix', exec: grandPrixSeeder },
];

async function run() {
  try {
    for (const seeder of seeders) {
      console.log(`⏳ Seeding ${seeder.name}...`);
      await seeder
        .exec(prisma)
        .then(() => console.log(`✔️ ${seeder.name} seeded`))
        .catch((err) => {
          console.log(`❌ Failed to seed ${seeder.name}`);
          throw err;
        });
    }
    console.log('✨ Done seeding');
  } catch (err) {
    console.log('❌ Failed to seed', err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
