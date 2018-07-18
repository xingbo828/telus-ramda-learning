const group = (state = {}, { type, payload }) => {
  switch (type) {
    case 'ADD_GROUP': {
      if (!state.hasOwnProperty(payload.id)) {
        return Object.assign(
          { [payload.id]: { name: payload.name, contacts: [] } },
          state
        );
      }
      return state;
    }
    case 'REMOVE_GROUP': {
      return Object.keys(state).reduce((result, key) => {
        if (key !== payload.id) {
          result[key] = state[key];
        }
        return result;
      }, {});
    }
    case 'ADD_CONTACT_TO_GROUP': {
      return Object.keys(state).reduce((result, key) => {
        if (key === payload.groupId) {
          result[key] = Object.assign({}, state[key], {
            contacts: state[key].contacts.concat([
              {
                name: payload.name,
                gender: payload.gender,
                id: payload.id
              }
            ])
          });
        }
        return result;
      }, {});
    }
    case 'REMOVE_CONTACT_FROM_GROUP': {
      return Object.keys(state).reduce((result, key) => {
        if (key === payload.groupId) {
          result[key] = Object.assign({}, state[key], {
            contacts: state[key].contacts.filter((c) => c.id !== payload.id)
          });
        }
        return result;
      }, {});
    }
    default: {
      return state;
    }
  }
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
