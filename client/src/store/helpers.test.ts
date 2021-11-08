import * as helpers from './helpers';

describe('', () => {
  it('Return status object when request to server is sent', () => {
    const expectedStatus = {
      loading: true,
      success: null,
      error: null
    };
    expect(helpers.getRequestState()).toEqual(expectedStatus);
  });

  it('Return status object when response from server is success', () => {
    const successMessage = 'Successful action';
    const exprectedStatus = {
      loading: false,
      success: successMessage,
      error: null
    };
    expect(helpers.getSuccessState(successMessage)).toEqual(exprectedStatus);
  });

  it('Return status object when response from server is failure', () => {
    const failureMessage = 'Action is failure';
    const exprectedStatus = {
      loading: false,
      success: null,
      error: failureMessage
    };
    expect(helpers.getErrorState(failureMessage)).toEqual(exprectedStatus);
  });

  it('Return status object when status switch to default', () => {
    const exprectedStatus = {
      loading: false,
      success: null,
      error: null
    };
    expect(helpers.getDefaultState()).toEqual(exprectedStatus);
  });
});
