/* eslint-disable no-console */
const { createClient } = require("next-sanity");
const { v4: uuidv4 } = require("uuid");

// --- Configuration ---
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dfvr7i1k";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
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
  token,
});

// --- Enhanced Seed Data ---

// Authors with more detailed information
const authors = [
  {
    _id: "author-jane-doe",
    _type: "author",
    name: "Jane Doe",
    role: "Creative Director",
    bio: "Jane is a visionary creative director with over 10 years of experience in the entertainment industry. She leads our creative initiatives across all divisions.",
  },
  {
    _id: "author-john-smith",
    _type: "author",
    name: "John Smith",
    role: "Lead Producer",
    bio: "John is an award-winning producer specializing in film and digital content production. He heads our Studio Shubz division.",
  },
  {
    _id: "author-sarah-wilson",
    _type: "author",
    name: "Sarah Wilson",
    role: "Music Director",
    bio: "Sarah brings over 8 years of experience in music production and artist development. She oversees operations at Shubz Records.",
  },
  {
    _id: "author-mike-chen",
    _type: "author",
    name: "Mike Chen",
    role: "Technical Director",
    bio: "Mike specializes in digital innovation and technology solutions for creative industries. He leads our technical initiatives.",
  },
];

// Divisions with comprehensive data
const divisions = [
  {
    _id: "division-shubz-records",
    _type: "division",
    title: "Shubz Records",
    slug: { _type: "slug", current: "shubz-records" },
    description:
      "The heart of our musical endeavors, producing and promoting groundbreaking artists across Africa and beyond. We specialize in Afrobeat, Hip-Hop, and contemporary African music.",
    author: { _type: "reference", _ref: "author-sarah-wilson" },
  },
  {
    _id: "division-studio-shubz",
    _type: "division",
    title: "Studio Shubz",
    slug: { _type: "slug", current: "studio-shubz" },
    description:
      "Our visual powerhouse, creating stunning films, music videos, and digital content. We bring stories to life through cutting-edge cinematography and post-production.",
    author: { _type: "reference", _ref: "author-john-smith" },
  },
  {
    _id: "division-africa-creative",
    _type: "division",
    title: "Africa Creative Talents",
    slug: { _type: "slug", current: "africa-creative-talents" },
    description:
      "Discovering and nurturing creative talent across the African continent. We provide platforms for emerging artists, models, and performers to showcase their skills.",
    author: { _type: "reference", _ref: "author-jane-doe" },
  },
  {
    _id: "division-digital-innovations",
    _type: "division",
    title: "Digital Innovations",
    slug: { _type: "slug", current: "digital-innovations" },
    description:
      "Pushing the boundaries of digital creativity through apps, web platforms, and interactive experiences. We merge technology with art to create innovative solutions.",
    author: { _type: "reference", _ref: "author-mike-chen" },
  },
];

// Comprehensive news articles
const newsArticles = [
  {
    _id: `news-annual-showcase-2024`,
    _type: "newsArticle",
    title: "Shubz Entertainment Announces Annual Showcase Event 2024",
    slug: { _type: "slug", current: "annual-showcase-2024" },
    publishedAt: new Date().toISOString(),
    excerpt:
      "Join us for a night of creativity, music, and talent as we showcase the best of Shubz Entertainment across all our divisions.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "We are thrilled to announce our annual showcase event, bringing together all our divisions for an unforgettable experience. This year's event will feature live performances from Shubz Records artists, film screenings from Studio Shubz, talent showcases from Africa Creative Talents, and digital innovation demos.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Event Highlights",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The showcase will feature emerging talents from across Africa, including live music performances, short film premieres, and interactive digital experiences. Attendees will have the opportunity to network with industry professionals and discover the next generation of creative talent.",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-jane-doe" },
  },
  {
    _id: `news-shubz-records-debut`,
    _type: "newsArticle",
    title: "Shubz Records Announces Debut Album from Rising Star",
    slug: { _type: "slug", current: "shubz-records-debut-album" },
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    excerpt:
      "Our music division signs exciting new talent and prepares for a groundbreaking debut release that promises to redefine African music.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Shubz Records is proud to announce the signing of an exciting new artist whose debut album promises to bring fresh sounds to the African music scene. The album, set for release next quarter, features a unique blend of traditional African rhythms with contemporary production techniques.",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-sarah-wilson" },
  },
  {
    _id: `news-studio-shubz-award`,
    _type: "newsArticle",
    title: "Studio Shubz Wins International Film Award",
    slug: { _type: "slug", current: "studio-shubz-award-win" },
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    excerpt:
      "Our film division receives international recognition for outstanding short film production and storytelling excellence.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Studio Shubz has been awarded the prestigious International Short Film Award for their latest production. The film, which explores themes of identity and belonging in modern Africa, has been praised for its innovative cinematography and powerful storytelling.",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-john-smith" },
  },
  {
    _id: `news-digital-app-launch`,
    _type: "newsArticle",
    title: "Digital Innovations Division Launches Creative Platform",
    slug: { _type: "slug", current: "digital-platform-launch" },
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
    excerpt:
      "New digital platform connects African creatives with global opportunities and resources.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Our Digital Innovations division has launched a groundbreaking platform that connects African creatives with global opportunities. The platform features portfolio showcases, collaboration tools, and resource sharing capabilities designed to empower the creative community across the continent.",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-mike-chen" },
  },
];

// Comprehensive portfolio projects
const portfolioProjects = [
  {
    _id: `project-closure-short-film`,
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
            text: "An award-winning short film exploring themes of loss and reconciliation in modern African society. The film has been recognized at multiple international film festivals for its innovative storytelling and cinematography.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Production Details",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Produced entirely by Studio Shubz team, featuring local talent and showcasing the beauty of African landscapes. The production spanned 6 months and involved collaboration with international partners.",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-john-smith" },
  },
  {
    _id: `project-shubzverse-debut-album`,
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
            text: "The debut album from Shubz Records, featuring a collective of our most talented artists. The album represents a fusion of traditional African sounds with contemporary production techniques.",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-sarah-wilson" },
  },
  {
    _id: `project-africa-talent-showcase`,
    _type: "portfolioProject",
    title: "Africa Talent Showcase 2024",
    slug: { _type: "slug", current: "africa-talent-showcase-2024" },
    category: "Event",
    division: { _type: "reference", _ref: "division-africa-creative" },
    releaseDate: "2024-04-10",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "A comprehensive talent showcase event featuring emerging artists from across Africa. The event included music performances, dance showcases, and visual art exhibitions.",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-jane-doe" },
  },
  {
    _id: `project-creative-platform-app`,
    _type: "portfolioProject",
    title: "Creative Platform Mobile App",
    slug: { _type: "slug", current: "creative-platform-app" },
    category: "Technology",
    division: { _type: "reference", _ref: "division-digital-innovations" },
    releaseDate: "2024-02-28",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "A mobile application designed to connect African creatives with global opportunities. The app features portfolio management, collaboration tools, and resource sharing capabilities.",
          },
        ],
      },
    ],
    author: { _type: "reference", _ref: "author-mike-chen" },
  },
];

// Home page content
const homePageContent = {
  _id: "homePage",
  _type: "homePage",
  heroHeadline: "Welcome to Shubz Entertainment",
  heroSubheadline: "Powering Creative Excellence Across Africa",
};

// Team members
const teamMembers = [
  {
    _id: "team-jane-doe",
    _type: "teamMember",
    name: "Jane Doe",
    role: "Creative Director",
  },
  {
    _id: "team-john-smith",
    _type: "teamMember",
    name: "John Smith",
    role: "Lead Producer",
  },
  {
    _id: "team-sarah-wilson",
    _type: "teamMember",
    name: "Sarah Wilson",
    role: "Music Director",
  },
  {
    _id: "team-mike-chen",
    _type: "teamMember",
    name: "Mike Chen",
    role: "Technical Director",
  },
];

async function seed() {
  console.log("🌱 Starting comprehensive seeding process...");
  console.log("📊 Seeding data for: Authors, Divisions, News Articles, Portfolio Projects, Team Members, and Home Page");

  try {
    // Combine all data to be created
    const dataToCreate = [
      ...authors,
      ...divisions,
      ...newsArticles,
      ...portfolioProjects,
      ...teamMembers,
      homePageContent,
    ];

    // Check for existing documents to prevent duplicates
    const existingIds = dataToCreate.map((doc) => doc._id).filter(Boolean);
    const query = `*[_id in $ids]._id`;
    const existingDocs = await client.fetch(query, { ids: existingIds });

    if (existingDocs.length > 0) {
      console.warn(
        `⚠️ Found ${existingDocs.length} existing documents with predefined IDs. These will be updated instead of created.`
      );
      console.log("Existing documents:", existingDocs);
    }

    // Filter out documents that already exist
    const newDocuments = dataToCreate.filter(
      (doc) => !existingDocs.includes(doc._id)
    );

    const documentsToUpdate = dataToCreate.filter(
      (doc) => existingDocs.includes(doc._id)
    );

    if (newDocuments.length > 0) {
      console.log(`📝 Creating ${newDocuments.length} new documents...`);
      
      // Create new documents
      const createTransaction = client.transaction();
      newDocuments.forEach((doc) => {
        createTransaction.create(doc);
      });
      
      const createResult = await createTransaction.commit();
      console.log(`✅ Successfully created ${createResult.results.length} new documents.`);
    }

    if (documentsToUpdate.length > 0) {
      console.log(`🔄 Updating ${documentsToUpdate.length} existing documents...`);
      
      // Update existing documents
      const updateTransaction = client.transaction();
      documentsToUpdate.forEach((doc) => {
        updateTransaction.createOrReplace(doc);
      });
      
      const updateResult = await updateTransaction.commit();
      console.log(`✅ Successfully updated ${updateResult.results.length} documents.`);
    }

    if (newDocuments.length === 0 && documentsToUpdate.length === 0) {
      console.log("ℹ️ No changes needed. All documents are up to date.");
    }

    console.log("\n🎉 Seeding completed successfully!");
    console.log("📋 Summary:");
    console.log(`   • Authors: ${authors.length}`);
    console.log(`   • Divisions: ${divisions.length}`);
    console.log(`   • News Articles: ${newsArticles.length}`);
    console.log(`   • Portfolio Projects: ${portfolioProjects.length}`);
    console.log(`   • Team Members: ${teamMembers.length}`);
    console.log(`   • Home Page: 1`);
    
  } catch (error) {
    console.error("\n🚨 Seeding failed:", error.message);
    
    if (error.message.includes("permission")) {
      console.log("💡 Check your token permissions in Sanity dashboard.");
      console.log("   Make sure your token has 'Editor' or 'Administrator' permissions.");
    } else if (error.message.includes("references")) {
      console.log("💡 Some documents might be referenced by others. Try deleting existing data first.");
    } else {
      console.log("💡 Check your network connection and Sanity project configuration.");
    }
    
    process.exit(1);
  }
}

// Run the seeder
seed().catch((error) => {
  console.error("Unhandled error during seeding:", error);
  process.exit(1);
});