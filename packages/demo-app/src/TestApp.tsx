import { atomOf, component, derived, Iterator, listOf, read, unmounted, write, type Atom } from "@calmdown/pyxis";

import { Button } from "~/component/Button";
import { CheckBox } from "~/component/CheckBox";
import { TextInput } from "~/component/TextInput";

interface TodoItem {
	done: Atom<boolean>;
	text: string;
}

export const TestApp = component(() => {
	const todos = listOf<TodoItem>();
	const todoText = atomOf("");
	const addTodoItem = () => {
		todos.insertFirst({
			done: atomOf(false),
			text: read(todoText),
		});

		write(todoText, "");
	};

	const shuffle = () => {
		if (todos.size() < 2) {
			return;
		}

		let i = todos.size();
		while (i > 0) {
			const rng = Math.trunc(Math.random() * i);
			i -= 1;

			const a = Math.min(i, rng);
			const b = Math.max(i, rng);
			if (a === b) {
				continue;
			}

			const B = todos.removeAt(b);
			const A = todos.removeAt(a);
			todos.insertAt(a, B);
			todos.insertAt(b, A);
		}
	};

	let interval = -1;
	const endShuffle = () => {
		clearInterval(interval);
	};

	const beginShuffle = () => {
		endShuffle();
		shuffle();
		interval = setInterval(shuffle, 100);
	};

	unmounted(endShuffle);

	return (
		<>
			<label>
				What needs to be done ({derived(() => todos.size())})?
				<TextInput value={todoText} />
			</label>
			<Button
				disabled={derived(() => !read(todoText))}
				on:click={addTodoItem}
			>
				Add
			</Button>
			<Button
				disabled={derived(() => todos.size() < 2)}
				on:mousedown={beginShuffle}
				on:mouseup={endShuffle}
			>
				Shuffle
			</Button>
			<ul>
				<Iterator source={todos} proxy={[ "done", "text" ]}>
					{todo => (
						<li>
							<CheckBox checked={todo.done}>
								{todo.text}
							</CheckBox>
							<Button on:click={() => todos.remove(todo.proxied)}>
								Remove
							</Button>
						</li>
					)}
				</Iterator>
			</ul>
		</>
	);
});
