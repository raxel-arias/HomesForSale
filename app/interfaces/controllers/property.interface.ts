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

export interface PropertyImageSetting {
    id_property: string,
    imageName: string
}