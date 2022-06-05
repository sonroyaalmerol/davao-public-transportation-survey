-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('FARE_VOTE', 'AREA_RATE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vertex" (
    "id" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Vertex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL,
    "vertex_a_id" TEXT NOT NULL,
    "vertex_b_id" TEXT NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "thumbs_up" BOOLEAN NOT NULL,
    "type" "VoteType" NOT NULL,
    "fare_id" TEXT,
    "area_id" TEXT,
    "route_id" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fare_id" TEXT,
    "area_id" TEXT,
    "route_id" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fare" (
    "id" TEXT NOT NULL,
    "area_id" TEXT NOT NULL,
    "route_id" TEXT,

    CONSTRAINT "Fare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EdgeToRoute" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AreaToEdge" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_fingerprint_key" ON "User"("fingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "Vertex_longitude_latitude_key" ON "Vertex"("longitude", "latitude");

-- CreateIndex
CREATE UNIQUE INDEX "Edge_vertex_a_id_vertex_b_id_key" ON "Edge"("vertex_a_id", "vertex_b_id");

-- CreateIndex
CREATE UNIQUE INDEX "_EdgeToRoute_AB_unique" ON "_EdgeToRoute"("A", "B");

-- CreateIndex
CREATE INDEX "_EdgeToRoute_B_index" ON "_EdgeToRoute"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AreaToEdge_AB_unique" ON "_AreaToEdge"("A", "B");

-- CreateIndex
CREATE INDEX "_AreaToEdge_B_index" ON "_AreaToEdge"("B");

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_vertex_a_id_fkey" FOREIGN KEY ("vertex_a_id") REFERENCES "Vertex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_vertex_b_id_fkey" FOREIGN KEY ("vertex_b_id") REFERENCES "Vertex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_fare_id_fkey" FOREIGN KEY ("fare_id") REFERENCES "Fare"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_fare_id_fkey" FOREIGN KEY ("fare_id") REFERENCES "Fare"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fare" ADD CONSTRAINT "Fare_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fare" ADD CONSTRAINT "Fare_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EdgeToRoute" ADD CONSTRAINT "_EdgeToRoute_A_fkey" FOREIGN KEY ("A") REFERENCES "Edge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EdgeToRoute" ADD CONSTRAINT "_EdgeToRoute_B_fkey" FOREIGN KEY ("B") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaToEdge" ADD CONSTRAINT "_AreaToEdge_A_fkey" FOREIGN KEY ("A") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AreaToEdge" ADD CONSTRAINT "_AreaToEdge_B_fkey" FOREIGN KEY ("B") REFERENCES "Edge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
