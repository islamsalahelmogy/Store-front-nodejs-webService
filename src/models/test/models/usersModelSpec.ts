import { UserStore } from '../../users';

const user_store = new UserStore();

describe('Users Model', () => {
  it('getAll method must defined', () => {
    expect(user_store.getAll).toBeDefined();
  });
  it('Show method must defined', () => {
    expect(user_store.show).toBeDefined();
  });
  it('Create method must defined', () => {
    expect(user_store.create).toBeDefined();
  });
  it('Delete method must defined', () => {
    expect(user_store.delete).toBeDefined();
  });

  it('Create method should add user', () => {
    setTimeout(async () => {
      const create_user = await user_store.create({
        first_name: 'Islam',
        last_name: 'Elmogy',
        password: '226699',
      });
      expect(create_user).toEqual({
        id: 1,
        first_name: 'Islam',
        last_name: 'Elmogy',
        password: '226699',
      });
    }, 100);
  });

  it('getAll method should retrieve all users', () => {
    setTimeout(async () => {
      const finded_users = await user_store.getAll();
      expect(finded_users).toEqual([
        {
          id: 1,
          first_name: 'Islam',
          last_name: 'Elmogy',
          password: '226699',
        },
      ]);
    }, 90);
  });

  it('Show method should retrieve user', () => {
    setTimeout(async () => {
      const finded_users = await user_store.show(1);
      expect(finded_users).toEqual({
        id: 1,
        first_name: 'Islam',
        last_name: 'Elmogy',
        password: '226699',
      });
    }, 90);
  });

  it('Delete method should delete user', () => {
    setTimeout(async () => {
      await user_store.delete(1);
      const finded_users = await user_store.getAll();
      expect(finded_users).toEqual([]);
    }, 150);
  });
});
