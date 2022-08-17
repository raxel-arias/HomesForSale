import { Property, Location, User, Category } from "../models/models.interface";
export interface PropertyCreation {
    title: string,
    category_type: number,
    description?: string,
    image?: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    parkings: number,
    latitude: number,
    longitude: number,
    full_address: string,
    vendor: number
}

export interface PropertyFinding {
    id_user: number,
    id_property: string
}

export interface SearchParams {
    title?: string,
    category_type?: number,
    minPrice?: number,
    maxPrice?: number,
    bedrooms?: number,
    bathrooms?: number,
    parkings?: number
}
export interface PropertyFound extends Property {
    user: User,
    category: Category
}

export interface PropertyImageSetting {
    id_property: string,
    imageName: string
}

export interface PropertyModification extends Property {
    location: Location
}