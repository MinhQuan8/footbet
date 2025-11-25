const componentsObject = import.meta.glob("./**/index.jsx", { eager: true });
const components = {};

Object.keys(componentsObject).forEach((componentPath) => {
    const componentName = componentPath.split("/")[componentPath.split("/").length - 2];
    components[componentName] = componentsObject[componentPath].default;
});

export default components;
