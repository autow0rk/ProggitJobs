import { Prisma, PrismaClient } from "@prisma/client";
import deleteOldJobs from "./deleteOldJobs";

async function Init(prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>): Promise<void>{
    await deleteOldJobs(prismaClient);
    await getSubredditFilters(prismaClient);
}

async function getSubredditFilters(prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>){

    // async function getSubredditFilterOptions(){
    // const subredditFilterOptions = await prismaClient.$queryRaw`SELECT DISTINCT fromSubreddit FROM Job`;
    const fromSubredditFiltersFromDB = await prismaClient.job.findMany({
        distinct: ['fromSubreddit'],
        select: {
            fromSubreddit: true
        }
    });
    const filtersAsArray = fromSubredditFiltersFromDB.map((subredditFilter) => {
        return subredditFilter.fromSubreddit;
    })
    return filtersAsArray;
// }

}

export default getSubredditFilters;