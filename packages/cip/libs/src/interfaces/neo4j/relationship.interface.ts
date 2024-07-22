export interface Relationship<T> {
    identity: number
    start: number
    end: string
    type: string
    properties: T
    elementId: string
    startNodeElementId: string
    endNodeElementId: string
}