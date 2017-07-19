/* Config Settings */
const forecast = {value:"Yes", units:"", title:"Forecast", description:"Perform contact scheduling off of most recently published contact schedule"};
const forecastMin = {value:"25", units:"hrs", title:"ForecastMin", description:"Minimum amount of time to allow from current time to forecast start"};
const cshperiod = {value:"75", units:"hrs", title:"CshPeriod",description:"Amount of time a new contact schedule should span"};
const cshlockout = {value:"100", units:"mins", title:"CshLockout", description:"Period of time from current time to lock out scheduling new contacts"};
const tpperiod = {value:"150", units:"hrs", title:"TpPeriod", description:"Amount of time from current time to generate tasks in Pleniter"};
const visperiod = {value:"75", units:"hrs", title:"VisPeriod", description:"Amount of time from current time + contact lockout period by which visibilities are retrieved"};
const statusperiod = {value:"125", units:"hrs", title:"StatusPeriod", description:"Number of hours from current time to retrieve unavailabilities"};
const maxattempts = {value:"125", units:"", title:"MaxAttempts", description:"Max number of times the Harness can re-attempt contact scheduling after rejection"};

const $HarnessConfigSettings = [forecast, forecastMin, cshperiod, cshlockout, tpperiod, visperiod, statusperiod, maxattempts];

export {
  $HarnessConfigSettings
};
