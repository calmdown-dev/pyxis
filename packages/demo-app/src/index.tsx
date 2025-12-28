import { atom, createRenderer, derivation, Iterator, list, read, write, type Atom } from "@calmdown/pyxis";
import { BemBlockExtension, BemElementExtension, BemModifierExtension, ClassListExtension, DomAdapter, EventExtension, Text, type ExtendedIntrinsicElements } from "@calmdown/pyxis-dom";

import { Button } from "~/components/Button";
import { CheckBox } from "~/components/CheckBox";
import { TextInput } from "~/components/TextInput";

const extensions = {
	on: EventExtension,
	cl: ClassListExtension,
	blk: BemBlockExtension,
	elm: BemElementExtension,
	mod: BemModifierExtension,
};

const renderer = createRenderer({
	extensions,
	adapter: DomAdapter,
	tick: queueMicrotask,
});

declare global {
	namespace JSX {
		type Node = globalThis.Node;
		type IntrinsicElements = ExtendedIntrinsicElements<typeof extensions>;
	}
}

interface TodoItem {
	done: Atom<boolean>;
	text: string;
}

const TestApp = () => {
	const todos = list<TodoItem>();
	const todoText = atom("");
	const addTodoItem = () => {
		todos.insertFirst({
			done: atom(false),
			text: read(todoText),
		});

		write(todoText, "");
	};

	return (
		<>
			<label>
				<Text>What needs to be done?</Text>
				<TextInput value={todoText} />
			</label>
			<Button
				disabled={derivation(() => !read(todoText))}
				onclick={addTodoItem}
			>
				<Text>Add</Text>
			</Button>
			<ul>
				<Iterator source={todos}>
					{todo => (
						<li>
							<CheckBox checked={todo.done}>
								{todo.text}
							</CheckBox>
							<Button onclick={() => todos.remove(todo)}>
								<Text>Remove</Text>
							</Button>
						</li>
					)}
				</Iterator>
			</ul>
		</>
	);
};

renderer.mount(document.body, TestApp);
