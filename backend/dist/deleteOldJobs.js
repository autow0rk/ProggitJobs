"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
// run this script at the beginning of each month, and delete the jobs from the 3rd month prior (eg. if it just became June, then ideally we want to show jobs for June, May, April. However, at this point we still have jobs for the 3rd month prior, March, which we need to delete.)
function deleteOldJobs(prismaClient) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let threeMonthsBeforeNumber = currentMonth - 3;
        let threeMonthsBeforeName = new Date();
        threeMonthsBeforeName.setMonth(threeMonthsBeforeNumber);
        let monthYearThreeMonthsBefore = (0, date_fns_1.format)(threeMonthsBeforeName, 'MMMM') + ', ' + (0, date_fns_1.getYear)(currentDate);
        yield prismaClient.job.deleteMany({
            where: {
                monthYearPosted: {
                    equals: monthYearThreeMonthsBefore
                }
            }
        });
    });
}
exports.default = deleteOldJobs;
