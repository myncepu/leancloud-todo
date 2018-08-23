export const CHANGE_CONNECTION_STATUS = 'CHANGE_CONNECTION_STATUS'

export const changeConectionStatus = connectionInfo => ({
  type: CHANGE_CONNECTION_STATUS,
  connectionInfo,
})
