export interface Event extends globalThis.Event {
    name: string;
    once?: boolean;
    rest?: boolean;
    execute: (...args: any[]) => any;
}