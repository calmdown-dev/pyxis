import { Fragment, jsx, jsxs, S_DEV_INFO } from "@calmdown/pyxis/dev";

function jsxDEV(componentOrTagName, props, key, isStaticChildren, source) {
	props[S_DEV_INFO] = source;
	return (isStaticChildren ? jsxs : jsx)(componentOrTagName, props, key);
}

export { Fragment, jsxDEV };
