import mutable, { mutableFn } from '@mutablejs/core';
import mutableElement from '@mutablejs/dom';

//	App root
const root = document.getElementById('root');

//	Mutable variables
const todos = mutable<string[]>([]);
const input = mutable<string>('');

//	Render function
const children = mutableFn(({ todos: items }: { todos: string[] }) =>
	items.map((item, i) =>
		mutableElement('li', {
			children: item,
			style: 'cursor: no-drop; user-select: none;',
			onclick: () => {
				todos.value.splice(i, 1);
			},
		}),
	),
);

mutableElement('input', { type: 'email', value: '' });

//	Add elements to app
root?.append(
	mutableElement(
		'form',
		{
			onsubmit(event) {
				event.preventDefault();

				todos.value.push(input.value);

				input.value = '';
			},
		},
		[
			mutableElement(
				'div',
				{
					style: {
						height: '10px',
						border: '1px solid #ccc',
					},
					class: input,
				},
				mutableElement('div', {
					style: {
						width: mutableFn(
							({ todos }: { todos: string[] }) =>
								todos.length + '%',
						)({ todos }),
						height: '100%',
						backgroundColor: '#ccc',
					},
				}),
			),
			mutableElement(
				'div',
				{},
				mutableFn(
					({ todos }: { todos: string[] }) =>
						`Todos: ${todos.length}`,
				)({ todos }),
			),
			mutableElement('input', {
				type: 'text',
				value: input,
				onkeyup: (event) => {
					if (event.target instanceof HTMLInputElement) {
						input.value = event.target.value;
					}
				},
			}),
			mutableElement('button', {
				children: 'Add todo',
			}),
			mutableElement('ul', {}, children({ todos })),
		],
	),
);
