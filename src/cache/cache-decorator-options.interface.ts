interface StringMap { [s: string]: string; }

export interface CacheDecoratorOptions {
    paths?: string[],
    placeholders?: StringMap
}
