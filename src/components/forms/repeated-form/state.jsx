import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import produce from 'immer';
import { backendRequest } from '../../../utils/backendRequest';
import { nextId } from '../../../utils/nextId';
import { addNotice } from '../../Notifications';

let initialFormData = MODERN_SETTINGS['repeated_form'] ?? {};

export const nameChanged = createEvent();
export const resetForm = createEvent();
export const resetItem = createEvent();
export const removeItem = createEvent();
export const addItem = createEvent();
export const changeItem = createEvent();

export const $name = createStore(initialFormData.name ?? '');
export const $items = createStore(initialFormData.items ?? []);

$name.on(nameChanged, (_, v) => v).reset(resetForm);

$items
	.on(addItem, (items) => [
		...items,
		{
			id: nextId(),
		},
	])
	.on(resetItem, (s, id) =>
		produce(s, (items) => {
			const item = items.find((item) => item.id === id);

			item.title = '';
			item.description = '';
			item.priority = '';

			return items;
		})
	)
	.on(changeItem, (s, [id, key, value]) =>
		produce(s, (items) => {
			const item = items.find((item) => item.id === id);

			if (item) item[key] = value;

			return items;
		})
	)
	.on(removeItem, (s, id) => produce(s, (items) => items.filter((item) => item.id !== id)))
	.reset(resetForm);

export const saveToServer = createEffect(({ name, items }) =>
	backendRequest({
		action: 'modern-settings/repeated_form-save',
		data: { name, items },
	})
);

export const doSave = createEvent();

sample({
	clock: doSave,
	source: combine($name, $items, (name, items) => ({
		name,
		items,
	})),
	target: saveToServer,
});
sample({
	clock: saveToServer.done,
	fn: () => ({ content: 'Repeated Form Saved.' }),
	target: addNotice,
});
