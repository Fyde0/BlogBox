export class FetchError extends Error {
    constructor(public response: Response, message?: string) {
        super(message)
    }
}

export const fetchHeaders = {
    "Content-Type": "application/json"
}

// TODO fetch wrapper, handle 401 (logout in store)