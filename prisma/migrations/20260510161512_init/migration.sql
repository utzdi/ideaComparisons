-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "resources" TEXT NOT NULL,
    "risks" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "generatedHtml" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
