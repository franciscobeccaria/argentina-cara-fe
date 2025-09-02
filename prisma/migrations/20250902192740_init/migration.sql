-- CreateEnum
CREATE TYPE "public"."ContributionStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."VoteType" AS ENUM ('USEFUL', 'NOT_USEFUL');

-- CreateTable
CREATE TABLE "public"."productos_ultimos_precios" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "brand" TEXT,
    "image_url" TEXT,
    "category_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "productos_ultimos_precios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "icon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_contributions" (
    "id" TEXT NOT NULL,
    "product_id" TEXT,
    "category_id" TEXT,
    "product_name" TEXT NOT NULL,
    "brand" TEXT,
    "prices" JSONB NOT NULL,
    "source_url" TEXT,
    "source_proof" TEXT,
    "status" "public"."ContributionStatus" NOT NULL DEFAULT 'PENDING',
    "fingerprint" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "verified_at" TIMESTAMP(3),
    "verified_by" TEXT,
    "rejected_at" TIMESTAMP(3),
    "rejection_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_contributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."votes" (
    "id" TEXT NOT NULL,
    "product_id" TEXT,
    "contribution_id" TEXT,
    "vote_type" "public"."VoteType" NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."price_history" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "prices" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "source_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "price_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productos_ultimos_precios_product_id_key" ON "public"."productos_ultimos_precios"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "public"."categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "votes_fingerprint_product_id_key" ON "public"."votes"("fingerprint", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "votes_fingerprint_contribution_id_key" ON "public"."votes"("fingerprint", "contribution_id");

-- AddForeignKey
ALTER TABLE "public"."productos_ultimos_precios" ADD CONSTRAINT "productos_ultimos_precios_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_contributions" ADD CONSTRAINT "user_contributions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."productos_ultimos_precios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_contributions" ADD CONSTRAINT "user_contributions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."votes" ADD CONSTRAINT "votes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."productos_ultimos_precios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."votes" ADD CONSTRAINT "votes_contribution_id_fkey" FOREIGN KEY ("contribution_id") REFERENCES "public"."user_contributions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
