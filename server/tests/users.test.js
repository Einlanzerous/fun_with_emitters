const {Users} = require('../utils/users');

describe('Test Users model', () => {
  let users = {};

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 77,
      name: 'James',
      room: 'Node Course'
    }, {
      id: 150,
      name: 'Milenda',
      room: 'Loner Room'
    }, {
      id: 325,
      name: 'Travis',
      room: 'Node Course'
    }];
  });

  test('Verify addUser', () => {
    const users = new Users();
    const user = {
      id: 553,
      name: 'Janna',
      room: 'League Fans'
    };
    const respUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
    expect(users.users.length).toBe(1);
  });

  test('Verify removeUser', () => {
    const validRemove = 77;
    const invalidRemove = 650;

    expect(users.removeUser(validRemove)).toBeDefined;
    expect(users.users.length).toBe(2);
    expect(users.removeUser(invalidRemove)).toBeUndefined;
    expect(users.users.length).toBe(2);
  });

  test('Verify getUser', () => {
    const validId = 77;
    const invalidId = 43;

    expect(users.getUser(validId)).toBeDefined;
    expect(users.getUser(invalidId)).toBeUndefined;
  });

  test('Verify getUserList returns proper names', () => {
    const nodeUserList = users.getUserList('Node Course');
    const lonerUserList = users.getUserList('Loner Room');

    expect(nodeUserList).toEqual(['James', 'Travis']);
    expect(lonerUserList).toEqual(['Milenda']);

  })
})