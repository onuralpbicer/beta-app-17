import { Injectable } from '@angular/core'
import { generateClient } from 'aws-amplify/api'
import { listMaintenances } from 'src/graphql/queries'
import { Maintenance } from '../API.service'

@Injectable({
    providedIn: 'root',
})
export class DatastoreService {
    private client = generateClient<Maintenance>()

    public async listMaintenances(equipmentId: string) {
        return this.client.graphql({
            query: listMaintenances,
            variables: {
                equipmentId,
            },
        })
    }
}
