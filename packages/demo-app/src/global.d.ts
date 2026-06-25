declare module "*.module.css" {
	declare const cssClassMap: Record<string, string>;
	export default cssClassMap;
}
