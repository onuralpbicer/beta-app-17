/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../app/API.service'
type GeneratedQuery<InputType, OutputType> = string & {
    __generatedQueryInput: InputType
    __generatedQueryOutput: OutputType
}

export const getMaintenance =
    /* GraphQL */ `query GetMaintenance($equipmentId: ID!, $timestamp: AWSDateTime!) {
  getMaintenance(equipmentId: $equipmentId, timestamp: $timestamp) {
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
` as GeneratedQuery<
        APITypes.GetMaintenanceQueryVariables,
        APITypes.GetMaintenanceQuery
    >
export const listMaintenances = /* GraphQL */ `query ListMaintenances(
  $equipmentId: ID
  $timestamp: ModelStringKeyConditionInput
  $filter: ModelMaintenanceFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listMaintenances(
    equipmentId: $equipmentId
    timestamp: $timestamp
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListMaintenancesQueryVariables,
    APITypes.ListMaintenancesQuery
>
export const syncMaintenances = /* GraphQL */ `query SyncMaintenances(
  $filter: ModelMaintenanceFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMaintenances(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.SyncMaintenancesQueryVariables,
    APITypes.SyncMaintenancesQuery
>
