/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../app/API.service'
type GeneratedMutation<InputType, OutputType> = string & {
    __generatedMutationInput: InputType
    __generatedMutationOutput: OutputType
}

export const createMaintenance = /* GraphQL */ `mutation CreateMaintenance(
  $input: CreateMaintenanceInput!
  $condition: ModelMaintenanceConditionInput
) {
  createMaintenance(input: $input, condition: $condition) {
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
` as GeneratedMutation<
    APITypes.CreateMaintenanceMutationVariables,
    APITypes.CreateMaintenanceMutation
>
export const updateMaintenance = /* GraphQL */ `mutation UpdateMaintenance(
  $input: UpdateMaintenanceInput!
  $condition: ModelMaintenanceConditionInput
) {
  updateMaintenance(input: $input, condition: $condition) {
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
` as GeneratedMutation<
    APITypes.UpdateMaintenanceMutationVariables,
    APITypes.UpdateMaintenanceMutation
>
export const deleteMaintenance = /* GraphQL */ `mutation DeleteMaintenance(
  $input: DeleteMaintenanceInput!
  $condition: ModelMaintenanceConditionInput
) {
  deleteMaintenance(input: $input, condition: $condition) {
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
` as GeneratedMutation<
    APITypes.DeleteMaintenanceMutationVariables,
    APITypes.DeleteMaintenanceMutation
>
