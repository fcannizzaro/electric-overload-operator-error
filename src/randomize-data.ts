import { db, locks } from "./server/db";

const fn = async () => {
  const randomData = Array.from({ length: 100 }).map(() => {
    const challenges = ["qualification", "institute"] as const;
    const categories = [
      "P3",
      "P4",
      "P5",
      "S1",
      "S2",
      "S3",
      "S4",
      "S5",
      "S6",
    ] as const;
    return {
      challenge: challenges[Math.floor(Math.random() * challenges.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      school: Math.floor(Math.random() * 100) + 1,
    };
  });

  const uniqueItems = new Map<string, (typeof randomData)[number]>();

  for (const item of randomData) {
    const key = `${item.challenge}-${item.category}-${item.school}`;
    if (!uniqueItems.has(key)) {
      uniqueItems.set(key, item);
    }
  }

  const deduplicatedData = Array.from(uniqueItems.values());
  await db.insert(locks).values(deduplicatedData);
};

fn();
