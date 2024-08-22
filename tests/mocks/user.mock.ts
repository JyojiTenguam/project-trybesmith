export const mockUsers = [
  { dataValues: { username: 'Hagar', productIds: [{ id: 1 }, { id: 2 }] } },
  { dataValues: { username: 'Eddie', productIds: [{ id: 3 }, { id: 4 }] } },
  { dataValues: { username: 'Helga', productIds: [{ id: 5 }] } },
];

export const formattedMockUsers = [
  { username: 'Hagar', productIds: [1, 2] },
  { username: 'Eddie', productIds: [3, 4] },
  { username: 'Helga', productIds: [5] },
];