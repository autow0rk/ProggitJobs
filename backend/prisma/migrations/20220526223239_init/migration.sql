-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "fromSubreddit" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobPostingDetails" TEXT NOT NULL,
    "datePosted" TIMESTAMP(3) NOT NULL,
    "monthYearPosted" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_url_key" ON "Job"("url");
