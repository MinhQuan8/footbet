const routesObject = import.meta.glob("./**/route.js", { eager: true });
const routes = Object.values(routesObject).map((route) => route.default);

export default routes;
