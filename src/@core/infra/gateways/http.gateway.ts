export type ResultHttp<T> = {
    result: boolean;
    msg?: string;
    data?: T
}