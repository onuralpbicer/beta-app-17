import { Injectable, inject } from '@angular/core'
import { generateClient } from 'aws-amplify/api'
import { listMaintenances } from 'src/graphql/queries'
import { Maintenance } from '../API.service'
import { createMaintenance } from 'src/graphql/mutations'
import { v4 as uuid } from 'uuid'
import { AuthService } from './auth.service'
import { propEq } from 'rambda'

@Injectable({
    providedIn: 'root',
})
export class DatastoreService {
    private authService = inject(AuthService)

    private client = generateClient<Maintenance>()

    public async listMaintenances(equipmentId: Maintenance['equipmentId']) {
        return this.client.graphql({
            query: listMaintenances,
            variables: {
                equipmentId,
            },
        })
    }

    public async getMaintenance(
        equipmentId: Maintenance['equipmentId'],
        maintenanceId: Maintenance['maintenanceId'],
    ) {
        const maintenances = await this.client.graphql({
            query: listMaintenances,
            variables: {
                equipmentId,
            },
        })

        return maintenances.data.listMaintenances.items.find(
            propEq(maintenanceId, 'maintenanceId'),
        )
    }

    public async createMaintenance(
        equipmentId: Maintenance['maintenanceId'],
        maintenance: Omit<
            Maintenance,
            | 'maintenanceId'
            | 'equipmentId'
            | 'createdBy'
            | '__typename'
            | '_version'
            | '_deleted'
            | '_lastChangedAt'
            | 'owner'
            | 'createdAt'
            | 'updatedAt'
            | 'timestamp'
        >,
    ) {
        const userId = await this.authService.getUserId()
        return this.client.graphql({
            query: createMaintenance,
            variables: {
                input: {
                    ...maintenance,
                    timestamp: new Date().toISOString(),
                    createdBy: userId,
                    equipmentId,
                    maintenanceId: uuid(),
                },
            },
        })
    }
}
