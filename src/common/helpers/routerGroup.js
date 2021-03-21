/**
 * @typedef {{name: string, prefix: string}} RouterGroupOption
 * @typedef {{method: string, path: string, handler: function}} Route
 * 
 * @param {RouterGroupOption} groupOptions 
 * @param {Route} routes 
 * @returns {Array<Route>}
 */
const routerGroup = (groupOptions, routes) => {
  return routes.map(route => {
    return {
      ...route,
      method: route.method.toLowerCase(),
      // Paste absolute path
      path: '/' + [groupOptions.prefix, route.path].map( path => path.replace(/(^\/|\/$)/g, '')).filter(path => path != '').join('/')
    }
  })
};
module.exports = {
  routerGroup,
}
