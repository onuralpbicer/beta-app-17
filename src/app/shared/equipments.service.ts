import { Injectable, inject } from '@angular/core'
import { SyncService } from './sync.service'
import {
    IEquipmentTypeListFields,
    IContentfulContent,
    IEquipmentTypeFields,
    IBaseEquipmentFields,
    IContentfulEntry,
} from './contentful'
import { isNil, merge, pick } from 'rambda'
import { ListPage } from './model'

@Injectable({
    providedIn: 'root',
})
export class EquipmentsService {
    private syncService = inject(SyncService)

    async getEquipmentList(
        id: string = IContentfulContent.EquipmentTypeList,
    ): Promise<ListPage> {
        try {
            const listEntry = await this.syncService.getEntry<
                IEquipmentTypeListFields | IEquipmentTypeFields
            >(id)

            if (isNil(listEntry))
                return {
                    name: '',
                    items: [],
                }

            const itemEntries = await Promise.all(
                listEntry.fields.items.map((item) =>
                    this.syncService.getEntry<
                        IEquipmentTypeFields | IBaseEquipmentFields
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
        } catch (error) {
            console.log(error)

            return {
                name: '',
                items: [],
            }
        }
    }

    async getEquipment(id: string) {
        const equipment = await this.syncService.getEntry<
            Record<string, never>
        >(id)

        return {
            equipment: equipment.fields,
            type: equipment.sys.contentType.sys.id,
        }
    }
}
