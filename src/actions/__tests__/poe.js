// @flow
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import { apiMiddleware } from 'redux-api-middleware';
import * as actions from '../poe';

const middlewares = [apiMiddleware];
const mockStore = configureMockStore(middlewares);

const mock_root = 'http://example.com';

/**
 * this is not really testing anything
 * it's only purpose was to understand redux-api-middleware and fetchMock
 */
describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it('should fetch item types that conform to schema', async () => {
    const store = mockStore({ poe: { api_root: mock_root } });

    fetchMock.mock('http://example.com/data/baseitemtypes.json', {
      body: [],
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await store.dispatch(actions.getItems());

    const dispatched = store.getActions();

    expect(dispatched).toContainEqual({
      meta: undefined,
      payload: undefined,
      type: 'REQUEST'
    });

    const success = dispatched[1];
    expect(success).toEqual({
      meta: undefined,
      type: 'SUCCESS',
      payload: []
    });
  });
});
