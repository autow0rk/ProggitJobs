import { Prisma, PrismaClient } from "@prisma/client";
import { format, getYear } from "date-fns";
// run this script at the beginning of each month, and delete the jobs from the 3rd month prior (eg. if it just became June, then ideally we want to show jobs for June, May, April. However, at this point we still have jobs for the 3rd month prior, March, which we need to delete.)
export default async function deleteOldJobs(prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>){
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let threeMonthsBeforeNumber = currentMonth - 3;
    let threeMonthsBeforeName = new Date();
    threeMonthsBeforeName.setMonth(threeMonthsBeforeNumber);
    let monthYearThreeMonthsBefore = format(threeMonthsBeforeName, 'MMMM') + ', ' + getYear(currentDate);
    
    await prismaClient.job.deleteMany({
        where: {
            monthYearPosted: {
                equals: monthYearThreeMonthsBefore
            }
        }
    });
}