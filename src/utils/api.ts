const API_BASE_URL = import.meta.env.VITE_YWC20_BASE_URL;

/**
 * General API request function
 * @param endpoint - API route
 * @param method - HTTP method (default: "GET")
 * @param body - Request body for POST/PUT
 * @param options - Additional fetch options
 */
export async function apiRequest(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
    body?: object,
    options: RequestInit = {}
) {
    try {

        const headers: HeadersInit = {
            "Content-Type": "application/json",
            "x-reference-id": "PG49",
            ...options.headers,
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            ...options,
        });
        const responseData = await response.json();

        if (responseData.statusCode && responseData.message && responseData.data) {
            return { 
                data: responseData.data, 
                statusCode: responseData.statusCode, 
                message: responseData.message || "Request failed" 
            };
        } else if (response.ok) {
            return { 
                data: responseData, 
                statusCode: response.status, 
                message: null 
            };
        }
        return { 
            data: null, 
            statusCode: response.status, 
            message: responseData.message || "Request failed" 
        };
        
    } catch (err) {
        return { 
            data: null, 
            statusCode: 500, 
            message: (err as Error).message 
        };
    }
}