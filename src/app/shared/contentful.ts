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

export type IContentfulEntry<
    T extends FieldsType,
    ID extends string = string,
> = Entry<EntrySkeletonType<T>, 'WITHOUT_LINK_RESOLUTION', string>
export type ExtractType<T extends FieldsType> = IContentfulEntry<T>['fields']

export interface IEquipmentTypeFields {
    id: EntryFieldTypes.Text
    // items: Array<unknown>
    items: EntryFieldTypes.Array<
        EntryFieldTypes.EntryLink<EntrySkeletonType<IBaseEquipmentFields>>
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

export interface IBaseEquipmentFields {
    id: EntryFieldTypes.Text
    // body: EntryFieldTypes.Text
    // maintenanceTasks: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
}

export type IEquipmentEntry<
    T extends FieldsType,
    ID extends string = string,
> = IContentfulEntry<
    T & IBaseEquipmentFields & { type: EntryFieldTypes.Text<ID> },
    ID
>

export interface IRoofFanEquipmentFields {
    brand: EntryFieldTypes.Text
    model: EntryFieldTypes.Text
    presentLocation: EntryFieldTypes.Text
    serviceLocation: EntryFieldTypes.Text
    year: EntryFieldTypes.Text
}
export type RoofTest = IEquipmentEntry<
    IRoofFanEquipmentFields,
    'roofExhaustFan'
>

export interface IEquipment2Fields {
    test: EntryFieldTypes.Number
}
export type Equipment2Test = IEquipmentEntry<IEquipment2Fields, 'equipment2'>

export type IEquipment = RoofTest | Equipment2Test
