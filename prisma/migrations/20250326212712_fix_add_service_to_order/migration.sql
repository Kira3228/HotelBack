/*
  Warnings:

  - You are about to drop the `_EmployeeToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EmployeeToService" DROP CONSTRAINT "_EmployeeToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_EmployeeToService" DROP CONSTRAINT "_EmployeeToService_B_fkey";

-- DropTable
DROP TABLE "_EmployeeToService";

-- CreateTable
CREATE TABLE "_EmployeeToServiceOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EmployeeToServiceOrder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EmployeeToServiceOrder_B_index" ON "_EmployeeToServiceOrder"("B");

-- AddForeignKey
ALTER TABLE "_EmployeeToServiceOrder" ADD CONSTRAINT "_EmployeeToServiceOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToServiceOrder" ADD CONSTRAINT "_EmployeeToServiceOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
