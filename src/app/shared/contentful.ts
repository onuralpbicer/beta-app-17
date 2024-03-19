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
> = Entry<EntrySkeletonType<T, ID>, 'WITHOUT_LINK_RESOLUTION', string>
type ExtractType<T extends FieldsType> = IContentfulEntry<T>['fields']

export interface IEquipmentTypeFields {
    id: EntryFieldTypes.Text
    // items: Array<unknown>
    items: EntryFieldTypes.Array<
        EntryFieldTypes.EntryLink<
            EntrySkeletonType<IBaseEquipmentFields<IEquipmentTypes>>
        >
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

interface IBaseEquipmentFields<ID extends IEquipmentTypes> {
    id: EntryFieldTypes.Text
    contentType: EntryFieldTypes.Text<ID>
    // body: EntryFieldTypes.Text
    // maintenanceTasks: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
}

export enum IEquipmentTypes {
    RoofFan = 'roofExhaustFan',
    Test = 'equipment2',
}

export interface IRoofFanEquipmentFields
    extends IBaseEquipmentFields<IEquipmentTypes.RoofFan> {
    brand: EntryFieldTypes.Text
    model: EntryFieldTypes.Text
    presentLocation: EntryFieldTypes.Text
    serviceLocation: EntryFieldTypes.Text
    year: EntryFieldTypes.Text
}
type IRoofFanEntry = IContentfulEntry<IRoofFanEquipmentFields>
export type IRoofFan = ExtractType<IRoofFanEquipmentFields>

export interface IEquipment2Fields
    extends IBaseEquipmentFields<IEquipmentTypes.Test> {
    test: EntryFieldTypes.Number
}
type IEquipment2Entry = IContentfulEntry<IEquipment2Fields>

export type IEquipment = IRoofFanEntry | IEquipment2Entry
