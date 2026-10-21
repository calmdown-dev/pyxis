export function text(value: string, node: Node | null) {
	if (!node) {
		return document.createTextNode(value);
	}

	node.nodeValue = value;
	return node;
}

export function marker(comment: string = "") {
	return document.createComment(comment);
}

export function batch() {
	return document.createDocumentFragment();
}

export function insert(node: Node, parent: Node, before: Node | null) {
	(
		(parent as Element).tagName === "TEMPLATE"
			? (parent as HTMLTemplateElement).content
			: parent
	)
		.insertBefore(node, before);
}

export function remove(node: Node) {
	node.parentNode?.removeChild(node);
}

const ATTR_NEEDS_EXPLICIT_BOOLEAN = [
	"displaystyle",
	"fence",
	"separator",
	"stretchy",
	"symmetric",
	"largeop",
	"movablelimits",
	"accent",
	"accentunder",
	"preserveAlpha",
]
	.reduce<{ [A in string]?: true }>((flags, attr) => (flags[attr] = true, flags), {});

export function setAttr(node: Node, attr: string, value: any) {
	switch (typeof value) {
		case "string":
		case "number":
			(node as HTMLElement).setAttribute(attr, value.toString());
			break;

		case "boolean":
			if (ATTR_NEEDS_EXPLICIT_BOOLEAN[attr]) {
				(node as HTMLElement).setAttribute(attr, value ? "true" : "false");
			}
			else {
				(node as HTMLElement).toggleAttribute(attr, value);
			}

			break;

		case "object":
			if (value !== null) {
				break;
			}

			// fall through

		case "undefined":
			(node as HTMLElement).removeAttribute(attr);
			break;
	}
}
