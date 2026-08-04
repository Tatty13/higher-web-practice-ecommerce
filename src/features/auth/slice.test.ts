import { actionsAuth, reducerAuth } from './slice';

describe('auth slice', () => {
  it('setUserId сохраняет userId и ставит isInitialized=true', () => {
    const state = reducerAuth(
      { userId: null, isInitialized: false },
      actionsAuth.setUserId('user-1'),
    );

    expect(state).toEqual({
      userId: 'user-1',
      isInitialized: true,
    });
  });

  it('logout очищает userId', () => {
    const state = reducerAuth(
      { userId: 'user-1', isInitialized: true },
      actionsAuth.logout(),
    );

    expect(state).toEqual({
      userId: null,
      isInitialized: true,
    });
  });
});
