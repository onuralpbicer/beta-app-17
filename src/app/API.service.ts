/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMaintenanceInput = {
    maintenanceId: string
    equipmentId: string
    timestamp: string
    tasks: string
    createdBy: string
    maintenanceType: string
    comments?: string | null
    _version?: number | null
}

export type ModelMaintenanceConditionInput = {
    maintenanceId?: ModelStringInput | null
    tasks?: ModelStringInput | null
    createdBy?: ModelStringInput | null
    maintenanceType?: ModelStringInput | null
    comments?: ModelStringInput | null
    and?: Array<ModelMaintenanceConditionInput | null> | null
    or?: Array<ModelMaintenanceConditionInput | null> | null
    not?: ModelMaintenanceConditionInput | null
    _deleted?: ModelBooleanInput | null
}

export type ModelStringInput = {
    ne?: string | null
    eq?: string | null
    le?: string | null
    lt?: string | null
    ge?: string | null
    gt?: string | null
    contains?: string | null
    notContains?: string | null
    between?: Array<string | null> | null
    beginsWith?: string | null
    attributeExists?: boolean | null
    attributeType?: ModelAttributeTypes | null
    size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
    binary = 'binary',
    binarySet = 'binarySet',
    bool = 'bool',
    list = 'list',
    map = 'map',
    number = 'number',
    numberSet = 'numberSet',
    string = 'string',
    stringSet = 'stringSet',
    _null = '_null',
}

export type ModelSizeInput = {
    ne?: number | null
    eq?: number | null
    le?: number | null
    lt?: number | null
    ge?: number | null
    gt?: number | null
    between?: Array<number | null> | null
}

export type ModelBooleanInput = {
    ne?: boolean | null
    eq?: boolean | null
    attributeExists?: boolean | null
    attributeType?: ModelAttributeTypes | null
}

export type Maintenance = {
    __typename: 'Maintenance'
    maintenanceId: string
    equipmentId: string
    timestamp: string
    tasks: string
    createdBy: string
    maintenanceType: string
    comments?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
    owner?: string | null
}

export type UpdateMaintenanceInput = {
    maintenanceId?: string | null
    equipmentId: string
    timestamp: string
    tasks?: string | null
    createdBy?: string | null
    maintenanceType?: string | null
    comments?: string | null
    _version?: number | null
}

export type DeleteMaintenanceInput = {
    equipmentId: string
    timestamp: string
    _version?: number | null
}

export type ModelStringKeyConditionInput = {
    eq?: string | null
    le?: string | null
    lt?: string | null
    ge?: string | null
    gt?: string | null
    between?: Array<string | null> | null
    beginsWith?: string | null
}

export type ModelMaintenanceFilterInput = {
    maintenanceId?: ModelStringInput | null
    equipmentId?: ModelIDInput | null
    timestamp?: ModelStringInput | null
    tasks?: ModelStringInput | null
    createdBy?: ModelStringInput | null
    maintenanceType?: ModelStringInput | null
    comments?: ModelStringInput | null
    and?: Array<ModelMaintenanceFilterInput | null> | null
    or?: Array<ModelMaintenanceFilterInput | null> | null
    not?: ModelMaintenanceFilterInput | null
    _deleted?: ModelBooleanInput | null
}

export type ModelIDInput = {
    ne?: string | null
    eq?: string | null
    le?: string | null
    lt?: string | null
    ge?: string | null
    gt?: string | null
    contains?: string | null
    notContains?: string | null
    between?: Array<string | null> | null
    beginsWith?: string | null
    attributeExists?: boolean | null
    attributeType?: ModelAttributeTypes | null
    size?: ModelSizeInput | null
}

export enum ModelSortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export type ModelMaintenanceConnection = {
    __typename: 'ModelMaintenanceConnection'
    items: Array<Maintenance | null>
    nextToken?: string | null
    startedAt?: number | null
}

export type ModelSubscriptionMaintenanceFilterInput = {
    maintenanceId?: ModelSubscriptionStringInput | null
    equipmentId?: ModelSubscriptionIDInput | null
    timestamp?: ModelSubscriptionStringInput | null
    tasks?: ModelSubscriptionStringInput | null
    createdBy?: ModelSubscriptionStringInput | null
    maintenanceType?: ModelSubscriptionStringInput | null
    comments?: ModelSubscriptionStringInput | null
    and?: Array<ModelSubscriptionMaintenanceFilterInput | null> | null
    or?: Array<ModelSubscriptionMaintenanceFilterInput | null> | null
    _deleted?: ModelBooleanInput | null
}

export type ModelSubscriptionStringInput = {
    ne?: string | null
    eq?: string | null
    le?: string | null
    lt?: string | null
    ge?: string | null
    gt?: string | null
    contains?: string | null
    notContains?: string | null
    between?: Array<string | null> | null
    beginsWith?: string | null
    in?: Array<string | null> | null
    notIn?: Array<string | null> | null
}

export type ModelSubscriptionIDInput = {
    ne?: string | null
    eq?: string | null
    le?: string | null
    lt?: string | null
    ge?: string | null
    gt?: string | null
    contains?: string | null
    notContains?: string | null
    between?: Array<string | null> | null
    beginsWith?: string | null
    in?: Array<string | null> | null
    notIn?: Array<string | null> | null
}

export type CreateMaintenanceMutationVariables = {
    input: CreateMaintenanceInput
    condition?: ModelMaintenanceConditionInput | null
}

export type CreateMaintenanceMutation = {
    createMaintenance?: {
        __typename: 'Maintenance'
        maintenanceId: string
        equipmentId: string
        timestamp: string
        tasks: string
        createdBy: string
        maintenanceType: string
        comments?: string | null
        createdAt: string
        updatedAt: string
        _version: number
        _deleted?: boolean | null
        _lastChangedAt: number
        owner?: string | null
    } | null
}

export type UpdateMaintenanceMutationVariables = {
    input: UpdateMaintenanceInput
    condition?: ModelMaintenanceConditionInput | null
}

export type UpdateMaintenanceMutation = {
    updateMaintenance?: {
        __typename: 'Maintenance'
        maintenanceId: string
        equipmentId: string
        timestamp: string
        tasks: string
        createdBy: string
        maintenanceType: string
        comments?: string | null
        createdAt: string
        updatedAt: string
        _version: number
        _deleted?: boolean | null
        _lastChangedAt: number
        owner?: string | null
    } | null
}

export type DeleteMaintenanceMutationVariables = {
    input: DeleteMaintenanceInput
    condition?: ModelMaintenanceConditionInput | null
}

export type DeleteMaintenanceMutation = {
    deleteMaintenance?: {
        __typename: 'Maintenance'
        maintenanceId: string
        equipmentId: string
        timestamp: string
        tasks: string
        createdBy: string
        maintenanceType: string
        comments?: string | null
        createdAt: string
        updatedAt: string
        _version: number
        _deleted?: boolean | null
        _lastChangedAt: number
        owner?: string | null
    } | null
}

export type GetMaintenanceQueryVariables = {
    equipmentId: string
    timestamp: string
}

export type GetMaintenanceQuery = {
    getMaintenance?: {
        __typename: 'Maintenance'
        maintenanceId: string
        equipmentId: string
        timestamp: string
        tasks: string
        createdBy: string
        maintenanceType: string
        comments?: string | null
        createdAt: string
        updatedAt: string
        _version: number
        _deleted?: boolean | null
        _lastChangedAt: number
        owner?: string | null
    } | null
}

export type ListMaintenancesQueryVariables = {
    equipmentId?: string | null
    timestamp?: ModelStringKeyConditionInput | null
    filter?: ModelMaintenanceFilterInput | null
    limit?: number | null
    nextToken?: string | null
    sortDirection?: ModelSortDirection | null
}

export type ListMaintenancesQuery = {
    listMaintenances?: {
        __typename: 'ModelMaintenanceConnection'
        items: Array<{
            __typename: 'Maintenance'
            maintenanceId: string
            equipmentId: string
            timestamp: string
            tasks: string
            createdBy: string
            maintenanceType: string
            comments?: string | null
            createdAt: string
            updatedAt: string
            _version: number
            _deleted?: boolean | null
            _lastChangedAt: number
            owner?: string | null
        } | null>
        nextToken?: string | null
        startedAt?: number | null
    } | null
}

export type SyncMaintenancesQueryVariables = {
    filter?: ModelMaintenanceFilterInput | null
    limit?: number | null
    nextToken?: string | null
    lastSync?: number | null
}

export type SyncMaintenancesQuery = {
    syncMaintenances?: {
        __typename: 'ModelMaintenanceConnection'
        items: Array<{
            __typename: 'Maintenance'
            maintenanceId: string
            equipmentId: string
            timestamp: string
            tasks: string
            createdBy: string
            maintenanceType: string
            comments?: string | null
            createdAt: string
            updatedAt: string
            _version: number
            _deleted?: boolean | null
            _lastChangedAt: number
            owner?: string | null
        } | null>
        nextToken?: string | null
        startedAt?: number | null
    } | null
}

export type OnCreateMaintenanceSubscriptionVariables = {
    filter?: ModelSubscriptionMaintenanceFilterInput | null
}

export type OnCreateMaintenanceSubscription = {
    onCreateMaintenance?: {
        __typename: 'Maintenance'
        maintenanceId: string
        equipmentId: string
        timestamp: string
        tasks: string
        createdBy: string
        maintenanceType: string
        comments?: string | null
        createdAt: string
        updatedAt: string
        _version: number
        _deleted?: boolean | null
        _lastChangedAt: number
        owner?: string | null
    } | null
}

export type OnUpdateMaintenanceSubscriptionVariables = {
    filter?: ModelSubscriptionMaintenanceFilterInput | null
}

export type OnUpdateMaintenanceSubscription = {
    onUpdateMaintenance?: {
        __typename: 'Maintenance'
        maintenanceId: string
        equipmentId: string
        timestamp: string
        tasks: string
        createdBy: string
        maintenanceType: string
        comments?: string | null
        createdAt: string
        updatedAt: string
        _version: number
        _deleted?: boolean | null
        _lastChangedAt: number
        owner?: string | null
    } | null
}

export type OnDeleteMaintenanceSubscriptionVariables = {
    filter?: ModelSubscriptionMaintenanceFilterInput | null
}

export type OnDeleteMaintenanceSubscription = {
    onDeleteMaintenance?: {
        __typename: 'Maintenance'
        maintenanceId: string
        equipmentId: string
        timestamp: string
        tasks: string
        createdBy: string
        maintenanceType: string
        comments?: string | null
        createdAt: string
        updatedAt: string
        _version: number
        _deleted?: boolean | null
        _lastChangedAt: number
        owner?: string | null
    } | null
}
