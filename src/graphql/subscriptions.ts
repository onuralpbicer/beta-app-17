/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../app/API.service'
type GeneratedSubscription<InputType, OutputType> = string & {
    __generatedSubscriptionInput: InputType
    __generatedSubscriptionOutput: OutputType
}

export const onCreateMaintenance =
    /* GraphQL */ `subscription OnCreateMaintenance(
  $filter: ModelSubscriptionMaintenanceFilterInput
) {
  onCreateMaintenance(filter: $filter) {
    maintenanceId
    equipmentId
    timestamp
    tasks
    createdBy
    maintenanceType
    comments
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
        APITypes.OnCreateMaintenanceSubscriptionVariables,
        APITypes.OnCreateMaintenanceSubscription
    >
export const onUpdateMaintenance =
    /* GraphQL */ `subscription OnUpdateMaintenance(
  $filter: ModelSubscriptionMaintenanceFilterInput
) {
  onUpdateMaintenance(filter: $filter) {
    maintenanceId
    equipmentId
    timestamp
    tasks
    createdBy
    maintenanceType
    comments
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
        APITypes.OnUpdateMaintenanceSubscriptionVariables,
        APITypes.OnUpdateMaintenanceSubscription
    >
export const onDeleteMaintenance =
    /* GraphQL */ `subscription OnDeleteMaintenance(
  $filter: ModelSubscriptionMaintenanceFilterInput
) {
  onDeleteMaintenance(filter: $filter) {
    maintenanceId
    equipmentId
    timestamp
    tasks
    createdBy
    maintenanceType
    comments
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
        APITypes.OnDeleteMaintenanceSubscriptionVariables,
        APITypes.OnDeleteMaintenanceSubscription
    >
