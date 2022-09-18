import { PrismaClient } from '@prisma/client';
import { driverSeeder } from './drivers.seeder';
import { grandPrixSeeder } from './grandprix.seeder';
import { seasonDriverSeeder } from './season-drivers.seeder';
import { seasonGrandPrixSeeder } from './season-grandprix.seeder';
import { seasonSeeder } from './season.seeder';
import { teamSeeder } from './teams.seeder';

const prisma = new PrismaClient();

const seeders = [
  { name: 'Season', exec: seasonSeeder },
  { name: 'Teams', exec: teamSeeder },
  { name: 'Drivers', exec: driverSeeder },
  { name: 'Season Drivers', exec: seasonDriverSeeder },
  { name: 'Grand Prix', exec: grandPrixSeeder },
  { name: 'Season Grand Prix', exec: seasonGrandPrixSeeder },
];

async function seed(seeder: { name: string; exec: (prisma: PrismaClient, year?: number) => Promise<any> }) {
  const year = new Date().getFullYear();
  console.log(`Seeding ${seeder.name}...`);

  await prisma.$connect();

  await seeder
    .exec(prisma, year)
    .then(() => console.log(`✔️ ${seeder.name} seeded`))
    .catch((err) => {
      console.log(`❌ Failed to seed ${seeder.name}`);
      console.warn(err);
      throw err;
    });

  await prisma.$disconnect();
}

async function run() {
  const seederName = process.argv[2] || '';
  const filteredSeeders = seeders.filter((seeder) => seeder.name.toLowerCase().includes(seederName?.toLowerCase()));

  for (const seeder of filteredSeeders) {
    await seed(seeder);
  }
}

run();
