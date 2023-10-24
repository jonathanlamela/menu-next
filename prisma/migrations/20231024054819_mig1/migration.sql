-- CreateTable
CREATE TABLE "category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "image_url" TEXT
);

-- CreateTable
CREATE TABLE "food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ingredients" TEXT,
    "price" DECIMAL NOT NULL,
    "category_id" INTEGER,
    CONSTRAINT "food_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "activation_token" TEXT,
    "reset_token" TEXT,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'customer'
);

-- CreateTable
CREATE TABLE "setting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "site_title" TEXT NOT NULL,
    "site_subtitle" TEXT NOT NULL,
    "shipping_costs" DECIMAL NOT NULL,
    "order_state_paid_id" INTEGER,
    "order_state_created_id" INTEGER,
    CONSTRAINT "setting_order_state_paid_id_fkey" FOREIGN KEY ("order_state_paid_id") REFERENCES "order_state" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "setting_order_state_created_id_fkey" FOREIGN KEY ("order_state_created_id") REFERENCES "order_state" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_state" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "css_badge_class" TEXT
);

-- CreateTable
CREATE TABLE "order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_state_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "shipping_required" BOOLEAN NOT NULL DEFAULT false,
    "shipping_costs" DECIMAL NOT NULL DEFAULT 0.00,
    "shipping_address" TEXT,
    "shipping_delivery_time" TEXT,
    "notes" TEXT,
    "total" DECIMAL NOT NULL DEFAULT 0.00,
    CONSTRAINT "order_order_state_id_fkey" FOREIGN KEY ("order_state_id") REFERENCES "order_state" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_detail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" INTEGER NOT NULL,
    "food_id" INTEGER,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "order_detail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "order_detail_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "setting_order_state_paid_id_key" ON "setting"("order_state_paid_id");

-- CreateIndex
CREATE UNIQUE INDEX "setting_order_state_created_id_key" ON "setting"("order_state_created_id");
