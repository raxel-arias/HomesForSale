import { LocationsModel } from "../../models/Locations.model";
import { ResolveResponse, RejectResponse } from "../../interfaces/response.interface";
import { LocationCreation } from '../../interfaces/controllers/location.interface';

export class LocationController {
    constructor() {}

    public CreateLocation(location: LocationCreation): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const locationCreated = await LocationsModel.create(location);

                resolve({
                    msg: 'Location created',
                    data: {
                        locationCreated
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during location creation',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }
}