/*
  Warnings:

  - You are about to drop the `_EmployeeToServiceOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateOfService` to the `ServiceOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `ServiceOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EmployeeToServiceOrder" DROP CONSTRAINT "_EmployeeToServiceOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_EmployeeToServiceOrder" DROP CONSTRAINT "_EmployeeToServiceOrder_B_fkey";

-- DropIndex
DROP INDEX "ServiceOrder_serviceId_key";

-- AlterTable
ALTER TABLE "ServiceOrder" ADD COLUMN     "dateOfService" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "employeeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_EmployeeToServiceOrder";

-- AddForeignKey
ALTER TABLE "ServiceOrder" ADD CONSTRAINT "ServiceOrder_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
