import mutable, { mutableFn } from '@mutablejs/core';
import mutableElement from '@mutablejs/dom';

// Constants
const maxTodos = 50;

// Store
const input = mutable<string>('mutable string');
const todos = mutable<string[]>([]);

// Computed Values
const isDisabled = mutableFn(
	({ input }: { input: unknown[] }) => input.length >= maxTodos,
)({ input: todos });

// Renderer
const renderList = mutableFn(({ todos: items }: { todos: string[] }) => {
	return items.map((item, i) => (
		<li
			onclick={() => {
				todos.value.splice(i, 1);
			}}
		>
			{item}
		</li>
	));
});

//	App root
const root = document.getElementById('root');

root?.replaceChildren(
	<form
		style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
		onsubmit={(event) => {
			event.preventDefault();

			todos.value.push(input.value);
			input.value = '';
		}}
	>
		<div
			style={{
				maxWidth: '500px',
				height: '10px',
				padding: '1px',
				border: '1px solid #ccc',
			}}
		>
			<div
				style={{
					width: mutableFn(
						({ input }: { input: unknown[] }) =>
							`${(input.length * 100) / maxTodos}%`,
					)({ input: todos }),
					height: '100%',
					backgroundColor: '#ccc',
				}}
			/>
		</div>
		<fieldset
			style={{
				display: 'flex',
				gap: '10px',
				width: '175px',
				border: 'none',
			}}
			disabled={isDisabled}
		>
			<legend>Add To-Do</legend>
			<input
				type="text"
				value={input}
				onkeyup={(event) => {
					if (event.target instanceof HTMLInputElement) {
						input.value = event.target.value;
					}
				}}
			/>
			<button>Add</button>
		</fieldset>
		<ul>{renderList({ todos })}</ul>
	</form>,
);
