interface Response {
    msg: string
}

export interface ResolveResponse extends Response {
    data?: any
}

export interface RejectResponse extends Response {
    error: boolean,
    status?: number,
    errorDetails?: any
}