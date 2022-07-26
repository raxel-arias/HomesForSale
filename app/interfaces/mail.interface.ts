export interface MailInfo {
    type: string,
    from?: string,
    to: string,
    subject: string,
    text?: string,
    html?: any,
    options?: any
}