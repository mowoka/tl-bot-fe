import { UserReport } from "@app/hooks/home/getUserTeknisiReportFetcher";

export function countMeanKpi(users: UserReport[]): number {
    const total = users.reduce((acc, user) => {
        return acc + user.kpi;
    }, 0);

    return total / users.length;
}