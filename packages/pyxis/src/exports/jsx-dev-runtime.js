import { Fragment, jsx, jsxs } from "@calmdown/pyxis/core";

const S_DEV_INFO = Symbol.for("pyxis:devInfo");

function jsxDEV(componentOrTagName, props, key, isStaticChildren, source) {
	props[S_DEV_INFO] = source;
	return (isStaticChildren ? jsxs : jsx)(componentOrTagName, props, key);
}

export { Fragment, jsxDEV, S_DEV_INFO };
