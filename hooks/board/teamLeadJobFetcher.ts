import { ApiFetchRaw } from "@app/core/clients/apiFetch"
import { LeadJob, LeadJobOptions } from "./useBoard";

export async function getTeamLeadJobFetcher(
    { url, token }:
        {
            url: string,
            token: string,
        }
) {
    if (!token) return;
    const res = await ApiFetchRaw<LeadJob[]>(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (res.body.statusCode !== 200) return [];

    const data = res.body.data;

    const teamLeadJobOptions: LeadJobOptions[] = [];

    data.map((job) => {
        teamLeadJobOptions.push({ id: job.id, name: job.name, point: job.point })
    })

    return teamLeadJobOptions;
}