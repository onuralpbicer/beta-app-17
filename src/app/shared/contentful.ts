import {
    Entry,
    EntryFieldTypes,
    EntrySkeletonType,
    FieldsType,
    SyncCollection,
} from 'contentful'

export enum IContentfulEnvs {
    staging = 'staging',
    production = 'production',
}

export enum IContentfulContent {
    EquipmentTypeList = '4j6hiYuDPwvsEmcVwxdZkY',
}

export type ISyncCollection = SyncCollection<
    EntrySkeletonType<NonNullable<unknown>>,
    'WITHOUT_LINK_RESOLUTION'
>

export type IContentfulEntry<T extends FieldsType> = Entry<
    EntrySkeletonType<T>,
    'WITHOUT_LINK_RESOLUTION',
    string
>
export type ExtractType<T extends FieldsType> = IContentfulEntry<T>['fields']

export interface IEquipmentFields {
    id: EntryFieldTypes.Text
    // body: EntryFieldTypes.Text
    // maintenanceTasks: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
}

export type IEquipmentEntry = IContentfulEntry<IEquipmentFields>

export interface IEquipmentTypeFields {
    id: EntryFieldTypes.Text
    // items: Array<unknown>
    items: EntryFieldTypes.Array<
        EntryFieldTypes.EntryLink<EntrySkeletonType<IEquipmentFields>>
    >
}

export type IEquipmentTypeEntry = IContentfulEntry<IEquipmentTypeFields>

export interface IEquipmentTypeListFields {
    id: EntryFieldTypes.Text
    items: EntryFieldTypes.Array<
        EntryFieldTypes.EntryLink<EntrySkeletonType<IEquipmentTypeFields>>
    >
}

export type IEquipmentTypeListEntry = IContentfulEntry<IEquipmentTypeListFields>
