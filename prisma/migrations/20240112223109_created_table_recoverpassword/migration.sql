-- CreateTable
CREATE TABLE "recover_password" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "used" INTEGER NOT NULL,

    CONSTRAINT "recover_password_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recover_password_id_key" ON "recover_password"("id");

-- CreateIndex
CREATE UNIQUE INDEX "recover_password_token_key" ON "recover_password"("token");
