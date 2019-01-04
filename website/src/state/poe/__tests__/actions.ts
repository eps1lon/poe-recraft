import fetchMock from 'fetch-mock';
import { apiMiddleware } from 'redux-api-middleware';
import configureMockStore from 'redux-mock-store';
import * as actions from '../actions';

const middlewares = [apiMiddleware];
const mockStore = configureMockStore(middlewares);

/**
 * this is not really testing anything
 * it's only purpose was to understand redux-api-middleware and fetchMock
 */
describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it('should fetch item types that conform to schema', async () => {
    const store = mockStore({});

    fetchMock.mock('./data/baseitemtypes.json', {
      body: [],
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await store.dispatch(actions.getItems() as any);

    const dispatched = store.getActions();

    expect(dispatched).toContainEqual({
      meta: undefined,
      payload: undefined,
      type: 'POE/ITEMS_REQUEST',
    });

    const success = dispatched[1];
    expect(success).toEqual({
      meta: undefined,
      payload: [],
      type: 'POE/ITEMS_SUCCESS',
    });
  });
});
