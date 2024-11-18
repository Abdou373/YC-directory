-- CreateTable
CREATE TABLE "Startup" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 1,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "pitch" TEXT NOT NULL,
    "cratedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorid" TEXT NOT NULL,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "usename" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Startup_id_key" ON "Startup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Author_id_key" ON "Author"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
