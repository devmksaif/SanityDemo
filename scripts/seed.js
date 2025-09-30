/* eslint-disable no-console */
const { createClient } = require("next-sanity");
const { v4: uuidv4 } = require("uuid");

// --- Configuration ---
// These should match your project's configuration in src/lib/sanity.ts
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dfvr7i1k";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// You need a write token for this script to work.
// 1. Go to https://www.sanity.io/manage
// 2. Select your project.
// 3. Go to the "API" tab.
// 4. Under "Tokens", click "Add API Token".
// 5. Give it a name (e.g., "Seeder Script") and choose "Editor" permissions.
// 6. Copy the token and create a `.env.local` file in your project root if you don't have one.
// 7. Add this line to `.env.local`: SANITY_API_WRITE_TOKEN="YOUR_TOKEN_HERE"
const token = process.env.NEXT_PUBLIC_SANITY_API_KEY || "skkstxJ2rBznKIbVRDqCXeXxg5M6mG418KD1C6LaVIONHIu3fEigMz7aMSOJ4fU6q1mz2VNBZHA7YeGyegBQicJvLbF84ZhwXj7tHYKUuoQJjlcTGSbDTW6vxFnF8SBB0DzPVmq5RfjxIyHUBKUgBWr9TpdqmxYMrkkhXJlTDzC49tB09hMf";

if (!token) {
  console.error(
    "🚨 SANITY_API_WRITE_TOKEN is not set. Please see instructions in scripts/seed.js"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, // Use the write token
});

// --- Seed Data ---
// NOTE: Image assets need to be uploaded to Sanity first.
// This script does not upload images. After running the seed,
// you can go into the Sanity Studio to manually attach the images.

const authors = [
  {
    _id: "author-jane-doe",
    _type: "author",
    name: "Jane Doe",
    role: "Creative Director",
  },
  {
    _id: "author-john-smith",
    _type: "author",
    name: "John Smith",
    role: "Lead Producer",
  },
];

const divisions = [
  {
    _id: "division-shubz-records",
    _type: "division",
    title: "Shubz Records",
    slug: { _type: "slug", current: "shubz-records" },
    description:
      "The heart of our musical endeavors, producing and promoting groundbreaking artists.",
    author: { _type: "reference", _ref: "author-jane-doe" },
  },
  {
    _id: "division-studio-shubz",
    _type: "division",
    title: "Studio Shubz",
    slug: { _type: "slug", current: "studio-shubz" },
    description:
      "Our visual powerhouse, creating stunning films, music videos, and digital content.",
    author: { _type: "reference", _ref: "author-john-smith" },
  },
];

const newsArticles = [
  {
    _id: `news-${uuidv4()}`,
    _type: "newsArticle",
    title: "Shubz Entertainment Announces Annual Showcase Event",
    slug: { _type: "slug", current: "annual-showcase-2024" },
    publishedAt: new Date().toISOString(),
    excerpt:
      "Join us for a night of creativity, music, and talent as we showcase the best of Shubz Entertainment.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "We are thrilled to announce our annual showcase event, bringing together all our divisions for an unforgettable experience. Mark your calendars!",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-jane-doe" },
  },
];

const portfolioProjects = [
  {
    _id: `project-${uuidv4()}`,
    _type: "portfolioProject",
    title: "Closure - A Short Film",
    slug: { _type: "slug", current: "closure-short-film" },
    category: "Film",
    division: { _type: "reference", _ref: "division-studio-shubz" },
    releaseDate: "2024-05-20",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "An award-winning short film exploring themes of loss and reconciliation. Produced by Studio Shubz.",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-john-smith" },
  },
  {
    _id: `project-${uuidv4()}`,
    _type: "portfolioProject",
    title: "ShubzVerse - Debut Album",
    slug: { _type: "slug", current: "shubzverse-debut-album" },
    category: "Music",
    division: { _type: "reference", _ref: "division-shubz-records" },
    releaseDate: "2024-03-15",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The debut album from Shubz Records, featuring a collective of our most talented artists.",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-jane-doe" },
  },
];

async function seed() {
  console.log("🌱 Starting to seed data...");

  // Combine all data to be created
  const dataToCreate = [
    ...authors,
    ...divisions,
    ...newsArticles,
    ...portfolioProjects,
  ];

  // Check for existing documents to prevent duplicates
  const existingIds = dataToCreate.map((doc) => doc._id).filter(Boolean);
  const query = `*[_id in $ids]._id`;
  const existingDocs = await client.fetch(query, { ids: existingIds });

  if (existingDocs.length > 0) {
    console.warn(
      `⚠️ Found ${existingDocs.length} existing documents with predefined IDs. Skipping them to avoid duplicates.`
    );
  }

  // Filter out documents that already exist
  const newDocuments = dataToCreate.filter(
    (doc) => !existingDocs.includes(doc._id)
  );

  if (newDocuments.length === 0) {
    console.log("✅ No new documents to create. Database may already be seeded.");
    return;
  }

  console.log(`Creating ${newDocuments.length} new documents...`);

  // Create a transaction
  const transaction = client.transaction();
  newDocuments.forEach((doc) => {
    transaction.createOrReplace(doc);
  });

  // Commit the transaction
  try {
    const result = await transaction.commit();
    console.log(`✅ Successfully created ${result.results.length} documents.`);
  } catch (error) {
    console.error("🚨 Error creating documents:", error.message);
    process.exit(1);
  }
}

seed();