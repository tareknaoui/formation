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

  // ── Users ──────────────────────────────────────────────────
  const adminPassword  = await bcrypt.hash("admin123",   10);
  const studentPassword = await bcrypt.hash("student123", 10);
  const premiumPassword = await bcrypt.hash("premium123", 10);

  const admin = await db.user.create({
    data: {
      name:     "Admin",
      email:    "admin@mandarin.com",
      password: adminPassword,
      role:     "ADMIN",
    },
  });

  const student = await db.user.create({
    data: {
      name:     "Jean Student",
      email:    "student@mandarin.com",
      password: studentPassword,
      role:     "USER",
    },
  });

  const premium = await db.user.create({
    data: {
      name:     "Marie Premium",
      email:    "premium@mandarin.com",
      password: premiumPassword,
      role:     "USER",
    },
  });

  console.log("Users created.");

  // ── Subscriptions ──────────────────────────────────────────
  await db.subscription.create({
    data: {
      userId:    premium.id,
      status:    "ACTIVE",
      startDate: new Date(),
      endDate:   new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });

  await db.subscription.create({
    data: {
      userId:    admin.id,
      status:    "ACTIVE",
      startDate: new Date(),
    },
  });

  console.log("Subscriptions created.");

  // ══════════════════════════════════════════════════════════
  //  COURS 1 — Méthode Solo : Apprentissage Autonome
  //  4 500 DA · Accès à vie · Débutant
  // ══════════════════════════════════════════════════════════
  const courseSolo = await db.course.create({
    data: {
      title:       "Méthode Solo — Apprentissage Autonome 自学",
      description:
        "La méthode complète pour apprendre le chinois mandarin de façon autonome. Un manuel avec vidéos, des exercices progressifs, un carnet d'écriture PDF et un accès à vie au contenu avec mises à jour gratuites. Idéal pour progresser à votre rythme, où que vous soyez.",
      imageUrl:
        "https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=800&auto=format&fit=crop&q=60",
      category:    "Débutant",
      isPublished:  true,
    },
  });

  // — Chapitre 1 : Fondations de la langue
  const solo_ch1 = await db.chapter.create({
    data: {
      title:       "Fondations : Pinyin & Tons",
      description: "Maîtrisez le système de romanisation pinyin et les 4 tons essentiels du mandarin.",
      position:    1,
      isPublished:  true,
      courseId:    courseSolo.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Introduction au Pinyin",
      description: "Découvrez le système de romanisation qui transcrit les sons du chinois. Une clé indispensable pour tout apprenant.",
      position:    1,
      isPublished:  true,
      duration:    "07:30",
      chapterId:   solo_ch1.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Les 4 Tons du Mandarin",
      description: "Le mandarin est une langue tonale : le sens d'un mot change selon le ton utilisé. Exercices pratiques pour les maîtriser.",
      position:    2,
      isPublished:  true,
      duration:    "10:15",
      chapterId:   solo_ch1.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Le Ton Neutre & Sandhi des Tons",
      description: "Comprendre le ton neutre et les règles de changement de ton (sandhi) dans la parole naturelle.",
      position:    3,
      isPublished:  true,
      duration:    "08:45",
      chapterId:   solo_ch1.id,
    },
  });

  // — Chapitre 2 : Les 150+ Caractères Essentiels
  const solo_ch2 = await db.chapter.create({
    data: {
      title:       "Les 150+ Caractères Essentiels",
      description: "Apprenez plus de 150 caractères chinois expliqués de façon simple, avec leur prononciation et leur sens.",
      position:    2,
      isPublished:  true,
      courseId:    courseSolo.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Premiers Caractères : Les Chiffres (1-10)",
      description: "Commencez par les chiffres de 1 à 10. Simple mais fondamental pour compter, les dates et les prix.",
      position:    1,
      isPublished:  true,
      duration:    "09:00",
      chapterId:   solo_ch2.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "La Famille & les Personnes",
      description: "Mère, père, frère, sœur... Apprenez le vocabulaire familial et les pronoms personnels essentiels.",
      position:    2,
      isPublished:  true,
      duration:    "11:20",
      chapterId:   solo_ch2.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Lieux & Directions",
      description: "Comment demander son chemin et se repérer dans une ville chinoise. Caractères de lieu essentiels.",
      position:    3,
      isPublished:  true,
      duration:    "12:05",
      chapterId:   solo_ch2.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "La Nourriture & les Restaurants",
      description: "Commander un repas, exprimer vos goûts alimentaires, lire un menu simplifié.",
      position:    4,
      isPublished:  true,
      duration:    "10:50",
      chapterId:   solo_ch2.id,
    },
  });

  // — Chapitre 3 : Phrases en Contexte
  const solo_ch3 = await db.chapter.create({
    data: {
      title:       "Phrases en Contexte Réel",
      description: "Des dialogues et phrases dans des situations réelles du quotidien pour apprendre naturellement.",
      position:    3,
      isPublished:  true,
      courseId:    courseSolo.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Se Présenter & Saluer",
      description: "Nǐ hǎo ! Maîtrisez les formules de salutation, présentation et politesse du quotidien.",
      position:    1,
      isPublished:  true,
      duration:    "08:30",
      chapterId:   solo_ch3.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Au Marché & les Achats",
      description: "Négocier un prix, demander la quantité et comprendre une transaction commerciale simple.",
      position:    2,
      isPublished:  true,
      duration:    "13:10",
      chapterId:   solo_ch3.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Prendre les Transports",
      description: "Taxi, métro, bus — les expressions indispensables pour se déplacer en Chine.",
      position:    3,
      isPublished:  true,
      duration:    "11:40",
      chapterId:   solo_ch3.id,
    },
  });

  // — Chapitre 4 : Écriture des Caractères
  const solo_ch4 = await db.chapter.create({
    data: {
      title:       "L'Écriture des Caractères (Carnet PDF)",
      description: "Apprenez l'ordre des traits et l'écriture correcte des caractères avec le carnet d'écriture inclus.",
      position:    4,
      isPublished:  true,
      courseId:    courseSolo.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "L'Ordre des Traits — Les 8 Règles Fondamentales",
      description: "La calligraphie chinoise suit des règles précises. Maîtrisez les 8 règles de base pour écrire correctement.",
      position:    1,
      isPublished:  true,
      duration:    "09:55",
      chapterId:   solo_ch4.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Écrire les 50 Premiers Caractères",
      description: "Entraînement guidé à l'écriture des 50 caractères les plus fréquents, sur grille d'écriture.",
      position:    2,
      isPublished:  true,
      duration:    "18:00",
      chapterId:   solo_ch4.id,
    },
  });

  // — Chapitre 5 : Culture & Points Culturels
  const solo_ch5 = await db.chapter.create({
    data: {
      title:       "Points Culturels : La Richesse de la Chine",
      description: "Au-delà de la langue : découvrez les traditions, festivals et codes culturels chinois essentiels.",
      position:    5,
      isPublished:  true,
      courseId:    courseSolo.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Le Nouvel An Chinois & les Traditions",
      description: "春节 (Chūnjié) — Comprendre la fête la plus importante de Chine et ses codes culturels.",
      position:    1,
      isPublished:  true,
      duration:    "14:20",
      chapterId:   solo_ch5.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Les Règles de Politesse & le Face (面子)",
      description: "Le concept de 'face' (miànzi) est central dans la culture chinoise. Comprendre pour mieux interagir.",
      position:    2,
      isPublished:  true,
      duration:    "10:30",
      chapterId:   solo_ch5.id,
    },
  });

  console.log("Course 1 (Méthode Solo) created.");

  // ══════════════════════════════════════════════════════════
  //  COURS 2 — Méthode Assistée : Progression Garantie
  //  19 000 DA · 60 jours · Intermédiaire
  // ══════════════════════════════════════════════════════════
  const courseAssiste = await db.course.create({
    data: {
      title:       "Méthode Assistée — Progression Garantie 辅导",
      description:
        "Le programme coaching premium avec suivi personnalisé sur 60 jours. Tout le contenu de la Méthode Solo, plus une correction quotidienne personnalisée, des questions illimitées, un support direct et un feedback personnalisé chaque jour. La voie la plus rapide vers la fluidité.",
      imageUrl:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60",
      category:    "Intermédiaire",
      isPublished:  true,
    },
  });

  // — Chapitre 1 : Bilan & Plan de Progression Personnel
  const asst_ch1 = await db.chapter.create({
    data: {
      title:       "Bilan Initial & Plan de Progression",
      description: "Évaluation de votre niveau de départ et construction d'un plan d'apprentissage personnalisé sur 60 jours.",
      position:    1,
      isPublished:  true,
      courseId:    courseAssiste.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Évaluation de Niveau — Session Diagnostic",
      description: "Test oral et écrit pour établir votre profil linguistique précis et identifier vos points forts et axes d'amélioration.",
      position:    1,
      isPublished:  true,
      duration:    "20:00",
      chapterId:   asst_ch1.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Votre Feuille de Route Personnalisée sur 60 Jours",
      description: "Présentation de votre plan sur mesure : objectifs hebdomadaires, jalons de progression et méthode de suivi quotidien.",
      position:    2,
      isPublished:  true,
      duration:    "15:00",
      chapterId:   asst_ch1.id,
    },
  });

  // — Chapitre 2 : Semaines 1-2 : Fondations Renforcées
  const asst_ch2 = await db.chapter.create({
    data: {
      title:       "Semaines 1-2 : Fondations Renforcées",
      description: "Consolidation des bases : tons, pinyin, 200 caractères fondamentaux et premières phrases naturelles.",
      position:    2,
      isPublished:  true,
      courseId:    courseAssiste.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Maîtrise des Tons — Correction Personnalisée",
      description: "Envoyez vos enregistrements audio. Correction quotidienne de votre prononciation par Sofiane avec feedback détaillé.",
      position:    1,
      isPublished:  true,
      duration:    "12:30",
      chapterId:   asst_ch2.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "200 Caractères Actifs en 2 Semaines",
      description: "Méthode de mémorisation par répétition espacée (SRS) avec exercices quotidiens et corrections.",
      position:    2,
      isPublished:  true,
      duration:    "16:00",
      chapterId:   asst_ch2.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Premiers Dialogues Réels — Correction Écrite",
      description: "Exercices d'écriture de dialogues quotidiens. Chaque production est corrigée individuellement.",
      position:    3,
      isPublished:  true,
      duration:    "14:00",
      chapterId:   asst_ch2.id,
    },
  });

  // — Chapitre 3 : Semaines 3-4 : Conversation Orale
  const asst_ch3 = await db.chapter.create({
    data: {
      title:       "Semaines 3-4 : Conversation Orale Active",
      description: "Passer à l'oral : jeux de rôle, situations réelles et correction phonétique avancée.",
      position:    3,
      isPublished:  true,
      courseId:    courseAssiste.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Jeux de Rôle : Situations du Quotidien",
      description: "Restaurant, transport, hôtel, shopping — simulations de situations réelles avec feedback audio.",
      position:    1,
      isPublished:  true,
      duration:    "18:30",
      chapterId:   asst_ch3.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Parler de Soi : Opinions, Goûts & Projets",
      description: "Exprimer vos préférences, parler de votre quotidien et de vos projets en mandarin naturel.",
      position:    2,
      isPublished:  true,
      duration:    "15:45",
      chapterId:   asst_ch3.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Correction Phonétique Avancée",
      description: "Analyse approfondie de votre accent et des points de prononciation à perfectionner.",
      position:    3,
      isPublished:  true,
      duration:    "20:00",
      chapterId:   asst_ch3.id,
    },
  });

  // — Chapitre 4 : Semaines 5-6 : Grammaire & Structures Avancées
  const asst_ch4 = await db.chapter.create({
    data: {
      title:       "Semaines 5-6 : Grammaire & Structures Avancées",
      description: "Compléments de lieu, marqueurs d'aspect, structures comparatives et phrases complexes.",
      position:    4,
      isPublished:  true,
      courseId:    courseAssiste.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Les Marqueurs d'Aspect : 了, 过, 着",
      description: "Comprendre et utiliser correctement les marqueurs d'aspect, fondamentaux pour exprimer le temps en chinois.",
      position:    1,
      isPublished:  true,
      duration:    "22:00",
      chapterId:   asst_ch4.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Les Structures Comparatives & Superlatives",
      description: "Exprimer la comparaison (plus que, moins que, aussi que) et le superlatif en mandarin.",
      position:    2,
      isPublished:  true,
      duration:    "17:30",
      chapterId:   asst_ch4.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Phrases Complexes & Subordonnées",
      description: "Construire des phrases longues et nuancées — parler comme un locuteur natif.",
      position:    3,
      isPublished:  true,
      duration:    "19:15",
      chapterId:   asst_ch4.id,
    },
  });

  // — Chapitre 5 : Semaines 7-8 : Bilan Final & Certification
  const asst_ch5 = await db.chapter.create({
    data: {
      title:       "Semaines 7-8 : Bilan Final & Certification",
      description: "Évaluation finale, correction globale et remise du certificat de progression.",
      position:    5,
      isPublished:  true,
      courseId:    courseAssiste.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Simulation d'Examen HSK 1-2",
      description: "Préparez-vous au HSK (examen officiel de chinois) avec une simulation complète commentée.",
      position:    1,
      isPublished:  true,
      duration:    "30:00",
      chapterId:   asst_ch5.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Conversation Finale — Évaluation Globale",
      description: "Session de conversation orale libre pour mesurer votre progression réelle sur 60 jours.",
      position:    2,
      isPublished:  true,
      duration:    "25:00",
      chapterId:   asst_ch5.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Plan de Continuation — Après les 60 Jours",
      description: "Construire votre plan d'apprentissage autonome pour continuer à progresser après le programme.",
      position:    3,
      isPublished:  true,
      duration:    "12:00",
      chapterId:   asst_ch5.id,
    },
  });

  console.log("Course 2 (Méthode Assistée) created.");

  // ══════════════════════════════════════════════════════════
  //  COURS 3 — Le Petit Explorateur du Chinois 🎒
  //  Livre de référence pour enfants · Général
  // ══════════════════════════════════════════════════════════
  const courseEnfants = await db.course.create({
    data: {
      title:       "Le Petit Explorateur du Chinois 🎒",
      description:
        "Le livre de référence idéal pour initier vos enfants à la langue et à la culture chinoise de manière ludique et intuitive. Plus de 150 caractères expliqués simplement, des phrases en contexte, une introduction au Pinyin conçue pour les enfants, des points culturels, une grille d'écriture et des fichiers audio inclus.",
      imageUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60",
      category:    "Général",
      isPublished:  true,
    },
  });

  // — Chapitre 1 : Découverte de la Langue
  const enf_ch1 = await db.chapter.create({
    data: {
      title:       "Découverte : La Langue Chinoise",
      description: "Première rencontre avec le mandarin : son histoire, son écriture et pourquoi c'est une langue fascinante.",
      position:    1,
      isPublished:  true,
      courseId:    courseEnfants.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Pourquoi le Chinois ? Une Langue des Super-Héros !",
      description: "Introduction ludique à la langue chinoise — pourquoi 1,4 milliard de personnes la parlent et pourquoi toi aussi tu peux l'apprendre.",
      position:    1,
      isPublished:  true,
      duration:    "05:00",
      chapterId:   enf_ch1.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Le Pinyin — l'Alphabet Secret du Chinois",
      description: "Introduction au Pinyin adaptée aux enfants : les sons du chinois expliqués avec des exemples amusants et des illustrations.",
      position:    2,
      isPublished:  true,
      duration:    "08:00",
      chapterId:   enf_ch1.id,
    },
  });

  // — Chapitre 2 : Mes Premiers Caractères
  const enf_ch2 = await db.chapter.create({
    data: {
      title:       "Mes Premiers Caractères Chinois",
      description: "Apprendre à reconnaître et écrire les premiers caractères chinois de façon ludique.",
      position:    2,
      isPublished:  true,
      courseId:    courseEnfants.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Les Chiffres de 1 à 10 en Chinois",
      description: "一二三四五... Apprendre les chiffres de manière musicale et visuelle, avec des jeux de mémorisation.",
      position:    1,
      isPublished:  true,
      duration:    "07:30",
      chapterId:   enf_ch2.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Les Couleurs & les Animaux",
      description: "红色, 蓝色... Vocabulaire coloré et animaux en chinois, avec la grille d'écriture pour s'entraîner.",
      position:    2,
      isPublished:  true,
      duration:    "09:15",
      chapterId:   enf_ch2.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Ma Famille en Chinois",
      description: "爸爸, 妈妈, 哥哥... Présenter sa famille en chinois avec des dialogues courts et des illustrations.",
      position:    3,
      isPublished:  true,
      duration:    "08:45",
      chapterId:   enf_ch2.id,
    },
  });

  // — Chapitre 3 : Points Culturels pour Petits Explorateurs
  const enf_ch3 = await db.chapter.create({
    data: {
      title:       "Points Culturels : Explorer la Chine",
      description: "Découvrir la culture chinoise : fêtes, traditions, gastronomie et merveilles naturelles.",
      position:    3,
      isPublished:  true,
      courseId:    courseEnfants.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Le Nouvel An Chinois — La Fête des Lanternes",
      description: "Les dragons, les pétards, les dumplings... Tout sur la fête la plus magique de Chine !",
      position:    1,
      isPublished:  true,
      duration:    "10:00",
      chapterId:   enf_ch3.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "La Muraille de Chine & les Merveilles",
      description: "Voyage virtuel sur les sites les plus extraordinaires de Chine, avec le vocabulaire associé.",
      position:    2,
      isPublished:  true,
      duration:    "08:00",
      chapterId:   enf_ch3.id,
    },
  });

  // — Chapitre 4 : Grille d'Écriture & Diplôme
  const enf_ch4 = await db.chapter.create({
    data: {
      title:       "Grille d'Écriture & Diplôme Final",
      description: "S'entraîner à écrire les caractères avec précision et recevoir son diplôme de Petit Explorateur !",
      position:    4,
      isPublished:  true,
      courseId:    courseEnfants.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "La Grille d'Écriture — S'Entraîner comme un Pro",
      description: "Utiliser la grille d'écriture fournie pour tracer les caractères étape par étape, dans le bon ordre de traits.",
      position:    1,
      isPublished:  true,
      duration:    "12:00",
      chapterId:   enf_ch4.id,
    },
  });

  await db.lesson.create({
    data: {
      title:       "Test Final & Diplôme de Petit Explorateur 🎓",
      description: "Quiz final ludique sur les 50 caractères et expressions appris. Télécharge ton diplôme personnalisé !",
      position:    2,
      isPublished:  true,
      duration:    "15:00",
      chapterId:   enf_ch4.id,
    },
  });

  console.log("Course 3 (Le Petit Explorateur) created.");
  console.log("✅ Seeding complete successfully!");
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
