import {
  dissoc,
  cond,
  curry,
  reject,
  propEq,
  equals,
  assoc,
  append,
  always,
  evolve,
  T,
} from 'ramda';

const addGroup = curry((state, { id, name }, type)=> assoc(id, { name, contacts: [] }, state));

const removeGroup = curry((state, { id }, type ) => dissoc(id, state));

const addContactToGroup = curry((state, { groupId, id, name, gender }, type) => evolve({
    [groupId]: {
      contacts: append({
        name,
        gender,
        id
      })
    }
  }, state)
)

const removeContactToGroup = curry((state, { groupId, id }, type) => evolve({
  [groupId]: {
    contacts: reject(propEq(id))
  }
}, state)
)


const group = (state={}, { type, payload }) => 
  cond([
    [equals('ADD_GROUP'), addGroup(state, payload)],
    [equals('REMOVE_GROUP'), removeGroup(state, payload)],
    [equals('ADD_CONTACT_TO_GROUP'), addContactToGroup(state, payload)],
    [equals('REMOVE_CONTACT_FROM_GROUP'), removeContactToGroup(state, payload)],
    [T, always(state)]
  ])(type)

describe('session 3 challenge', () => {
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
