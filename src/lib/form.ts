import { invalid } from '@sveltejs/kit';
import { writable } from 'svelte/store';
import type { ValidationError } from 'yup';
import { set } from 'lodash';

export const errors = writable<Record<string, string[]>>(undefined);

export const validationErrorToResponse = (error: ValidationError) => {
	if (error.inner?.length) {
		return error.inner.reduce<Record<string, string[]>>((errors, current) => {
			if (!current.path) return errors;

			errors[current.path] = [
				...errors[current.path] || [],
				...current.errors
			];
			return errors;
		}, {});
	}

	if (error.path) {
		return { [error.path]: error.message };
	}

	return {}
}

export const sendInvaldidErrors = (error: ValidationError) => {
	return invalid(400, validationErrorToResponse(error));
}


export const parseFormdata = <T extends Record<string, any>>(formData: FormData): T => {
	const result: any = {};

	for (const [key, value] of formData.entries()) {
		set(result, key, value)
	}

	return result as T;
}