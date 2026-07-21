import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed script...");
  
  // Clear database in correct order of dependency
  await db.userProgress.deleteMany();
  await db.subscription.deleteMany();
  await db.lesson.deleteMany();
  await db.chapter.deleteMany();
  await db.course.deleteMany();
  await db.user.deleteMany();

  console.log("Database cleared.");

  // Create users
  const adminPassword = await bcrypt.hash("admin123", 10);
  const studentPassword = await bcrypt.hash("student123", 10);
  const premiumPassword = await bcrypt.hash("premium123", 10);

  const admin = await db.user.create({
    data: {
      name: "Admin Mandarin",
      email: "admin@mandarin.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const student = await db.user.create({
    data: {
      name: "Jean Student",
      email: "student@mandarin.com",
      password: studentPassword,
      role: "USER",
    },
  });

  const premium = await db.user.create({
    data: {
      name: "Marie Premium",
      email: "premium@mandarin.com",
      password: premiumPassword,
      role: "USER",
    },
  });

  console.log("Users created.");

  // Create subscription for premium user
  await db.subscription.create({
    data: {
      userId: premium.id,
      status: "ACTIVE",
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    },
  });

  // Create subscription for admin (so they have access to watch)
  await db.subscription.create({
    data: {
      userId: admin.id,
      status: "ACTIVE",
      startDate: new Date(),
    },
  });

  console.log("Subscriptions created.");

  // Create courses
  const course1 = await db.course.create({
    data: {
      title: "Chinois Débutant : Maîtriser les bases",
      description: "Apprenez les bases du mandarin moderne : prononciation, tons, pinyin et les caractères fondamentaux.",
      imageUrl: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=800&auto=format&fit=crop&q=60",
      category: "Débutant",
      isPublished: true,
    },
  });

  const course2 = await db.course.create({
    data: {
      title: "Grammaire Mandarin Intermédiaire",
      description: "Améliorez votre structure de phrase et apprenez des formes de grammaire plus complexes pour tenir une vraie conversation.",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60",
      category: "Intermédiaire",
      isPublished: true,
    },
  });

  console.log("Courses created.");

  // Course 1 Chapters & Lessons
  const c1_ch1 = await db.chapter.create({
    data: {
      title: "Introduction et les 4 Tons",
      description: "Comprendre la prononciation du mandarin et la clé essentielle : les tons.",
      position: 1,
      isPublished: true,
      courseId: course1.id,
    },
  });

  await db.lesson.create({
    data: {
      title: "Introduction au Pinyin",
      description: "Dans cette leçon, nous allons comprendre ce qu'est le pinyin et comment il transcrit les sons chinois.",
      videoUrl: "https://drive.google.com/file/d/1_5T73-7xHwFpBvKSwtZ1hS9xMec3gq9q/view", // Example drive link structure
      position: 1,
      isPublished: true,
      duration: "05:20",
      chapterId: c1_ch1.id,
    },
  });

  await db.lesson.create({
    data: {
      title: "Maîtriser les 4 Tons du Mandarin",
      description: "Exercices pratiques pour bien différencier et prononcer les 4 tons fondamentaux.",
      videoUrl: "https://drive.google.com/file/d/1Xy_x2g6z9S-5vKSwtZ1hS9xMec3gq9q/view",
      position: 2,
      isPublished: true,
      duration: "08:45",
      chapterId: c1_ch1.id,
    },
  });

  const c1_ch2 = await db.chapter.create({
    data: {
      title: "Les Salutations de base",
      description: "Apprendre à saluer, se présenter et dire au revoir en chinois.",
      position: 2,
      isPublished: true,
      courseId: course1.id,
    },
  });

  await db.lesson.create({
    data: {
      title: "Dire bonjour : Nǐ hǎo !",
      description: "Apprenez à saluer poliment et à répondre à un salut.",
      videoUrl: "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J/view",
      position: 1,
      isPublished: true,
      duration: "06:12",
      chapterId: c1_ch2.id,
    },
  });

  await db.lesson.create({
    data: {
      title: "Se présenter et demander le prénom",
      description: "Comment dire son nom et demander poliment à votre interlocuteur comment il s'appelle.",
      videoUrl: "https://drive.google.com/file/d/1K2L3M4N5O6P7Q8R9S0T/view",
      position: 2,
      isPublished: true,
      duration: "10:05",
      chapterId: c1_ch2.id,
    },
  });

  // Course 2 Chapters & Lessons
  const c2_ch1 = await db.chapter.create({
    data: {
      title: "La structure Sujet-Verbe-Objet et variations",
      description: "Comparaison des structures de phrases de base et introduction des modificateurs.",
      position: 1,
      isPublished: true,
      courseId: course2.id,
    },
  });

  await db.lesson.create({
    data: {
      title: "L'ordre des mots en mandarin",
      description: "Découvrez pourquoi la place du temps et du lieu est cruciale dans la phrase chinoise.",
      videoUrl: "https://drive.google.com/file/d/1Z2Y3X4W5V6U7T8S9R0Q/view",
      position: 1,
      isPublished: true,
      duration: "12:30",
      chapterId: c2_ch1.id,
    },
  });

  console.log("Seeding complete successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    pool.end();
  });
