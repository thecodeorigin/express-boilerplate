/**
 * Define new role and permission for that role here
 */
const roles = [
  {
    name: 'Superadmin',
    permissions: ['ALL'],
  },
  {
    name: 'Admin',
    permissions: [
      'CREATE_USER',
      'READ_ALL_USER',
      'READ_ONE_USER',
      'UPDATE_USER',
      'SOFT_DELETE_USER',
      'RESTORE_USER',
      'READ_ALL_ROLE',
      'READ_ONE_ROLE',
      'READ_ALL_PERMISSION',
      'READ_ONE_PERMISSION'
    ],
  },
  {
    name: 'Moderator',
    permissions: [
      'READ_ALL_USER',
      'READ_ONE_USER',
      'SOFT_DELETE_USER',
      'RESTORE_USER',
    ],
  },
  {
    name: 'User',
    permissions: [],
  },
]

module.exports = roles;