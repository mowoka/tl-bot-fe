interface ApiResponseBody<T> {
    statusCode: string;
    message: string;
    success: boolean;
    data: T
}

export interface ApiResponse<T> {
    headers: Headers;
    status: number;
    body: ApiResponseBody<T>;
}

export async function ApiFetchRaw<T>(fulUrl: string, init?: RequestInit) {
    const initReqHeaders = init?.headers || {};
    const reqHeaders = {
        ...initReqHeaders,
    }
    const res = await fetch(fulUrl, {
        ...init,
        headers: reqHeaders,
        method: init?.method ?? 'GET',
    });
    const json = (await res.json()) as ApiResponseBody<T>;
    return {
        headers: res.headers,
        status: res.status,
        body: json,
    }
}

// this function to call request to API
export async function reqFetchAPI<T>(path: string, init?: RequestInit) {
    return ApiFetchRaw<T>(process.env.BASE_URL_API + path, init);
}