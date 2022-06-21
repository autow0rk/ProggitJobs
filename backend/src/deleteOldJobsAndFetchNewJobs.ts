import { Prisma, PrismaClient } from "@prisma/client";
import deleteOldJobs from "./deleteOldJobs";
import fetchJobs from "./fetchJobs";

async function deleteAndGetJobs(): Promise<void>/*Promise<void>*/{
    const prismaClient = new PrismaClient();
    await deleteOldJobs(prismaClient);
    await fetchJobs();
}


deleteAndGetJobs();



