export interface LocationCreation {
    property: string,
    address: string,
    latitude: string,
    longitude: string
}

export interface LocationModification extends LocationCreation {};