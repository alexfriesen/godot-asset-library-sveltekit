// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User } from "@prisma/client";

// and what to do when importing types
declare namespace App {
	interface Locals {
		user?: User;
	}

	// interface PageData {}

	// interface Platform {}
}
