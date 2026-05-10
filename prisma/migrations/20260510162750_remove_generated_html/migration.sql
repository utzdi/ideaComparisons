/*
  Warnings:

  - You are about to drop the column `generatedHtml` on the `Idea` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Idea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "resources" TEXT NOT NULL,
    "risks" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Idea" ("audience", "createdAt", "id", "notes", "problem", "resources", "revenue", "risks", "solution", "title") SELECT "audience", "createdAt", "id", "notes", "problem", "resources", "revenue", "risks", "solution", "title" FROM "Idea";
DROP TABLE "Idea";
ALTER TABLE "new_Idea" RENAME TO "Idea";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
