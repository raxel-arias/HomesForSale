export interface User {
    id_user?: number,
    name: string,
    email: string,
    password: string,
    active: number,
    activationToken?: string | null,
    recoveryToken?: string | null,
    tokenExp?: string | null
}

export interface Property {
    id_property?: string,
    title: string,
    description?: string,
    image?: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    parkings: number,
    published?: number,
    vendor?: number,
    category_type?: number
}

export interface Category {
    id_category?: number,
    name: string
}

export interface Location {
    property?: string,
    address: string,
    latitude: string,
    longitude: string
}

export interface Message {
    id_property: string,
    id_user: number,
    message: string
}