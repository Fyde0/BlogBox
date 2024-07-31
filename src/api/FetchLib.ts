export class FetchError extends Error {
    constructor(public response: Response, message?: string) {
        super(message)
    }
}

export const fetchHeaders = {
    "Content-Type": "application/json"
}