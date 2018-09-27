// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import * as types from './actionTypes'
import fetch from 'isomorphic-fetch'

function receiveData (apps) {
  return {
    type: types.APPS_FETCHED,
    apps: apps
  }
}

export function fetchData () {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(receiveData([]))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    // return fetch(`/am/api/apps`)
    //   .then(
    //     response => {
    //       if (response.status >= 400) {
    //         throw new Error('Bad response from server')
    //       }
    //       return response.json()
    //     })
    //   .then(json =>
    //     // We can dispatch many times!
    //     // Here, we update the app state with the results of the API call.
    //     dispatch(receiveData(json.data))
    //   )
  }
}
