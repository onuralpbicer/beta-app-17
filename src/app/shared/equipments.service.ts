import { Injectable, inject } from '@angular/core'
import { SyncService } from './sync.service'
import {
    IEquipmentTypeListFields,
    IContentfulContent,
    IEquipmentTypeFields,
} from './contentful'
import { merge, pick } from 'rambda'

@Injectable({
    providedIn: 'root',
})
export class EquipmentsService {
    private syncService = inject(SyncService)

    async getEquipmentList() {
        const listEntry =
            await this.syncService.getEntry<IEquipmentTypeListFields>(
                IContentfulContent.EquipmentTypeList,
            )

        const itemEntries = await Promise.all(
            listEntry.fields.items.map((item) =>
                this.syncService.getEntry<IEquipmentTypeFields>(item.sys.id),
            ),
        )

        const items = itemEntries.map((item) =>
            merge(pick(['name'], item.fields), {
                id: item.sys.id,
            }),
        )

        return {
            name: listEntry.fields.ekipmanlar,
            items,
        }
    }
}
