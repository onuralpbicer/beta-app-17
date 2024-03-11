import { Injectable, inject } from '@angular/core'
import { SyncService } from './sync.service'
import {
    IEquipmentTypeListFields,
    IContentfulContent,
    IEquipmentTypeFields,
    IEquipmentFields,
} from './contentful'
import { merge, pick } from 'rambda'
import { ListPage } from './model'

@Injectable({
    providedIn: 'root',
})
export class EquipmentsService {
    private syncService = inject(SyncService)

    async getEquipmentList(
        id: string = IContentfulContent.EquipmentTypeList,
    ): Promise<ListPage> {
        const listEntry = await this.syncService.getEntry<
            IEquipmentTypeListFields | IEquipmentTypeFields
        >(id)

        const itemEntries = await Promise.all(
            listEntry.fields.items.map((item) =>
                this.syncService.getEntry<
                    IEquipmentTypeFields | IEquipmentFields
                >(item.sys.id),
            ),
        )

        const items = itemEntries.map((item) =>
            merge(pick(['id'], item.fields), {
                link: item.sys.id,
            }),
        )

        return {
            name: listEntry.fields.id,
            items,
        }
    }

    async getEquipment(id: string) {
        return this.syncService.getEntry<IEquipmentFields>(id)
    }
}
