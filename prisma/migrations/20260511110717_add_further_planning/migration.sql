/*
  Warnings:

  - Added the required column `furtherPlanning` to the `Idea` table without a default value. This is not possible if the table is not empty.

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
    "furtherPlanning" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Idea" ("audience", "createdAt", "id", "notes", "problem", "resources", "revenue", "risks", "solution", "title") SELECT "audience", "createdAt", "id", "notes", "problem", "resources", "revenue", "risks", "solution", "title" FROM "Idea";
DROP TABLE "Idea";
ALTER TABLE "new_Idea" RENAME TO "Idea";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
