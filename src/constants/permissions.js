/**
 * Defined new action and module here
 */
const actions = ['CREATE', 'READ_ONE', 'READ_ALL', 'UPDATE', 'SOFT_DELETE', 'HARD_DELETE', 'RESTORE'];
const modules = [
  { name: 'USER', ignore: [] },
  { name: 'ROLE', ignore: ['SOFT_DELETE', 'RESTORE'] },
  { name: 'PERMISSION', ignore: ['CREATE', 'UPDATE', 'SOFT_DELETE', 'HARD_DELETE', 'RESTORE'] }
];


/**
 * Map action and module into permission
 */
const permissions = ['ALL'];
for (let i = 0; i < modules.length; i++) {
  for (let j = 0; j < actions.length; j++) {
    if(!modules[i].ignore.includes(actions[j]))
      permissions.push(`${actions[j]}_${modules[i].name}`);
  }
}

module.exports = permissions;