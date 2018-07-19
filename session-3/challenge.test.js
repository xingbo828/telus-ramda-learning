const group = (state = {}, { type, payload }) => {
  // FILL THE GAP!
};

describe('session 3 original challenge code', () => {
  it('can add group', () => {
    const addGroupAction = {
      type: 'ADD_GROUP',
      payload: {
        name: 'group one',
        id: 'group_one'
      }
    };
    const state = group(undefined, addGroupAction);
    expect(state).toEqual({ group_one: { name: 'group one', contacts: [] } });
  });

  it('can remove group', () => {
    const removeGroupAction = {
      type: 'REMOVE_GROUP',
      payload: {
        id: 'group_one'
      }
    };
    const originalState = { group_one: { name: 'group one', contacts: [] } };
    const state = group(originalState, removeGroupAction);
    expect(state).toEqual({});
  });

  it('can add contact to group', () => {
    const addContactAction = {
      type: 'ADD_CONTACT_TO_GROUP',
      payload: {
        groupId: 'group_one',
        id: 'boxing',
        name: 'Bo Xing',
        gender: 'male'
      }
    };
    const originalState = { group_one: { name: 'group one', contacts: [] } };
    const state = group(originalState, addContactAction);
    expect(state).toEqual({
      group_one: {
        contacts: [{ gender: 'male', id: 'boxing', name: 'Bo Xing' }],
        name: 'group one'
      }
    });
  });

  it('can remove contact from group', () => {
    const removeContactAction = {
      type: 'REMOVE_CONTACT_FROM_GROUP',
      payload: {
        groupId: 'group_one',
        id: 'boxing'
      }
    };
    const originalState = {
      group_one: {
        name: 'group one',
        contacts: [{ gender: 'male', id: 'boxing', name: 'Bo Xing' }]
      }
    };
    const state = group(originalState, removeContactAction);
    expect(state).toEqual({
      group_one: {
        contacts: [],
        name: 'group one'
      }
    });
  });
});
