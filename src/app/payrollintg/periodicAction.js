import * as types from '../../base/constants/ActionTypes'
import periodicApi from './periodicAPI';

export function loadPeriodicData(periodicdata) {
    return {type:types.LOAD_PERIODIC_DATA,periodicdata};
}
export function loadCompanytotalDataSuccess(periodicdata) {
    return {type:types.PERIODIC_COMPANY_TOTAL_SUCCESS, periodicdata};
}
export function loadPeriodicCompanyTotal(periodicdata) {
    return function(dispatch,getState) {
        const state = getState();
        return periodicApi.getPeriodicCompanyTotalData(state.appconf.SVCS_CONTEXT_URL).then(companytotal => {
            periodicdata.companytotaldata = companytotal;
            dispatch(loadCompanytotalDataSuccess(periodicdata));
        }).catch(error => {
        throw(error);
        });
    };
}
export function loadAuthTaxTypeTotalDataSuccess(periodicdata) {
    return {type:types.PERIODIC_AUTHTAXTYPE_TOTAL_SUCCESS, periodicdata};
}
export function loadPeriodicAuthTaxTypeTotal(periodicdata) {
    return function(dispatch,getState) {
        const state = getState();
        return periodicApi.getPeriodicAuthTaxTypeTotalData(state.appconf.SVCS_CONTEXT_URL).then(authtaxtypetotaldata => {
            periodicdata.authtaxtypetotaldata = authtaxtypetotaldata;
            dispatch(loadAuthTaxTypeTotalDataSuccess(periodicdata));
        }).catch(error => {
        throw(error);
        });
    };
}
export function addPayrollRecord(values) {
    return function (dispatch,getState) {
      const state = getState();
      return periodicApi.addPayrollRecord(values,state.appconf.SVCS_CONTEXT_URL).then(values => {
        dispatch(createPayrollRecordSuccess(values));
        return values;
      }).catch(error => {
        throw(error);
      });
    };
  }
  export function createPayrollRecordSuccess(values) {
    console.log('createPayrollRecordSuccess');
    console.log(values);
    return {type: types.PAYROLL_RECORD_CREATE_SUCCESS, values};
  }
export function testaction(periodicdata) {
    return {type:'TESTACTION', periodicdata};
}