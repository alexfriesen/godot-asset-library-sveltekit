<script lang="ts">
	import type { Asset } from '@prisma/client';
	import Icon from '$lib/components/Icon.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import FormGroup from '$lib/components/FormGroup.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormSelect from '$lib/components/FormSelect.svelte';

	import PreviewForm from '$lib/asset/preview-form.svelte';
	import AssetVersionForm from '$lib/asset/version/version-form.svelte';
	import { categoryMap } from '$lib/asset/category';
	import { godotVersionMap } from '$lib/asset/version/version';
	import { licenseMap } from '$lib/asset/license';

	import { t } from '$lib/translations';

	export let asset: Asset | undefined = undefined;
	let editing = asset?.asset_id ? true : false;
</script>

<FormGroup
	path={`/asset/${asset?.asset_id || 'create'}`}
	action={asset?.asset_id ? 'update' : 'create'}
>
	{#if asset?.asset_id}
		<input hidden name="asset_id" value={asset?.asset_id} />
	{/if}

	<!-- {-- Prevent horizontal scrolling due to the negative margins used for column gaps --} -->
	<div class="overflow-hidden">
		<!-- {-- Use a two-column display on wide screens to reduce the need for scrolling --} -->
		<section class="flex flex-wrap mt-8 -mx-6">
			<section class="w-full lg:w-1/2 px-6">
				<div class="lg:flex">
					<div class="lg:mr-2 lg:w-1/2">
						<FormInput
							name="title"
							value={asset?.title || null}
							label={$t('Asset name')}
							placeholder={$t('My Own Asset')}
							required={true}
							autofocus={true}
							maxlength={50}
							autocomplete={false}
						/>
					</div>

					<div class="lg:ml-2 lg:w-1/2">
						<FormInput
							name="blurb"
							value={asset?.blurb || null}
							label={$t('Blurb')}
							placeholder={$t('One-line description of the asset')}
							maxlength={60}
							autocomplete={false}
						/>
					</div>
				</div>

				<FormInput
					class="h-64"
					type="textarea"
					name="description"
					value={asset?.description || null}
					label={$t('Description')}
					placeholder={$t('Full description that spans multiple lines…')}
					required={true}
					autocomplete={false}
				>
					<div slot="hint">
						{$t('Supports')}
						<a
							class="link"
							href="https://guides.github.com/features/mastering-markdown/"
							target="_blank"
							rel="nofollow noopener noreferrer"
						>
							GitHub Flavored Markdown
						</a>.
					</div>
				</FormInput>

				<FormInput
					name="tags"
					value={asset?.tags || null}
					label={$t('Tags')}
					placeholder={$t('platformer, 2d, pixel-art, gdnative')}
					autocomplete={false}
					pattern="^[A-Za-z0-9,\s-]+$"
					title={$t(
						'Tags can only contain lowercase characters, numbers and dashes, and must be separated with commas (,).'
					)}
				>
					<div slot="hint">
						{$t(
							'A comma-separated list of tags (up to :maxTags). Only lowercase characters, numbers and dashes are allowed in tag names.',
							{ maxTags: 15 }
						)}
					</div>
				</FormInput>

				<div class="sm:flex sm:justify-between">
					<FormSelect
						name="category_id"
						label={$t('Category')}
						placeholder={$t('Select a category')}
						required={true}
						autocomplete={false}
						value={asset?.category_id}
					>
						{#each categoryMap as category}
							<option value={category.key} selected={asset?.category_id === category.key}>
								{category.name}
							</option>
						{/each}
					</FormSelect>

					<FormSelect
						name="cost"
						label={$t('License')}
						placeholder={$t('Select a license')}
						required={true}
						autocomplete={false}
						value={asset?.cost}
					>
						{#each licenseMap as license}
							<option value={license.key} selected={asset?.cost === license.key}>
								{license.name}
							</option>
						{/each}
						<div slot="hint">
							{$t('See')}
							<a
								class="link"
								href="https://choosealicense.com/"
								target="_blank"
								rel="nofollow noopener noreferrer">Choose a License</a
							>
							{$t('for guidance.')}
						</div>
					</FormSelect>
				</div>

				{#if !editing}
					<div class="sm:flex sm:justify-between">
						<FormInput
							name="versions[0][version_string]"
							value={asset?.versions?.[0]?.version_string || null}
							label={$t('Asset version')}
							placeholder="1.0.0"
							required={true}
							autocomplete={false}
							pattern="[0-2]\.[0-9]\.[0-2]"
						/>

						<FormSelect
							name="versions[0][godot_version]"
							label={$t('Godot version')}
							placeholder={$t('Select a Godot version')}
							required={true}
							autocomplete={false}
							value={asset?.versions?.[0]?.godot_version || '*'}
						>
							{#each godotVersionMap as godotVersion}
								<option value={godotVersion.key}>
									{godotVersion.name}
								</option>
							{/each}
						</FormSelect>
					</div>

					<div class="-mt-4 mb-8 text-sm text-gray-600">
						{$t(
							'The "Any" version should only be used for assets that do not contain code (such as engine-agnostic art assets). If in doubt, choose the minor Godot version used to develop the asset?.'
						)}
					</div>
				{/if}

				<FormInput
					type="url"
					name="browse_url"
					value={asset?.browse_url || null}
					label={$t('Git repository URL')}
					placeholder="https://github.com/user/asset"
					required={true}
					maxlength={2000}
					autocomplete={false}
					pattern="https?://+(github\.com|gitlab\.com|bitbucket\.org).+\/.+"
				>
					<div slot="hint">
						{$t('This must be a URL to a public GitHub, GitLab.com or Bitbucket repository.')}
					</div>
				</FormInput>

				<FormInput
					type="url"
					name="changelog_url"
					value={asset?.changelog_url || null}
					label={$t('Changelog URL')}
					placeholder="https://github.com/user/asset/blob/master/CHANGELOG.md"
					maxlength={2000}
					autocomplete={false}
				>
					<div slot="hint">
						{$t(
							'Optional. This URL should point to a changelog documenting user-facing changes (i.e. not an automatically generated commit log).'
						)}
					</div>
				</FormInput>

				<FormInput
					type="url"
					name="donate_url"
					value={asset?.donate_url || null}
					label={$t('Donate URL')}
					placeholder="https://patreon.com/user"
					maxlength={2000}
					autocomplete={false}
				>
					<div slot="hint">
						{$t(
							'Optional. This URL should point to a page to be used for donations (such as Patreon or GitHub Sponsors).'
						)}
					</div>
				</FormInput>

				{#if !editing}
					<FormInput
						type="url"
						name="download_url"
						value={asset?.versions?.[0]?.download_url || null}
						label={$t('Custom download URL')}
						placeholder="https://github.com/user/asset/archive/v1.0.0.zip"
						maxlength={2000}
						autocomplete={false}
					>
						<div slot="hint">
							{$t(
								'If you leave this field empty, the download URL will be inferred from the repository URL and the asset version.'
							)}<br />
							{$t(
								'For example, if the asset version is "1.0.0", the ZIP archive corresponding to the Git tag "v1.0.0" will be used (note the leading "v").'
							)}
						</div>
					</FormInput>
				{/if}

				<FormInput
					type="url"
					name="icon_url"
					value={asset?.icon_url || null}
					label={$t('Custom icon URL')}
					placeholder="https://raw.githubusercontent.com/user/asset/master/icon.png"
					maxlength={2000}
					autocomplete={false}
				>
					<div slot="hint">
						{$t(
							'If you leave this field empty, the icon must be committed to the repository as "icon.png" in the repository\'s root directory.'
						)}
						{$t('Only PNG or JPEG images are allowed.')}
						{$t('The recommended size is 256×256, but lower sizes are allowed.')}<br />
					</div>
				</FormInput>

				<FormInput
					type="url"
					name="issues_url"
					value={asset?.issues_url || null}
					label={$t('Custom issue reporting URL')}
					placeholder="https://github.com/user/asset/issues"
					maxlength={2000}
					autocomplete={false}
				>
					<div slot="hint">
						{$t(
							'If you leave this field empty, the issue reporting URL will be inferred from the repository URL.'
						)}
					</div>
				</FormInput>
			</section>

			<section class="w-full lg:w-1/2 px-6">
				{#if editing}
					<h2 class="text-center text-xl font-medium my-8">
						{$t('Manage versions')}
					</h2>
					<div class="mt-2 text-sm text-gray-600 my-8">
						{$t(
							'For each version, if you leave the download URL field empty, it will be inferred from the repository URL and the asset version.'
						)}<br />
						{$t(
							'For example, if the asset version is "1.0.0", the ZIP archive corresponding to the Git tag "v1.0.0" will be used (note the leading "v").'
						)}
					</div>

					<!-- @error('versions')
							<Alert>
								{ $message }
							</Alert>
						@enderror -->

					<!-- {-- Contains the HTML that will be copied when creating a new version --} -->
					<!-- <template id="asset-version-prototype" data-index={asset?.versions.length}>
							<AssetVersionForm index={asset?.versions.length} />
						</template> -->

					<div id="asset-version-list">
						{#each asset?.versions as version, index}
							<AssetVersionForm {index} {version} />
						{/each}
					</div>

					<button type="button" id="asset-add-version" class="px-2 link">
						<Icon type="plus" class="mr-1" />
						{$t('Add a new version')}
					</button>
				{/if}

				<h2 class="text-center text-xl font-medium my-8">
					{$t('Manage previews')}
				</h2>
				<div class="mt-2 text-sm text-gray-600 my-8">
					{$t('Previews are optional, but help people become more interested in your asset?.')}
				</div>

				<!-- @error('previews')
						<Alert>
							{ message }
						</Alert>
					@enderror -->

				<!-- {-- Contains the HTML that will be copied when creating a new preview --} -->
				<template id="asset-preview-prototype" data-index={asset?.previews.length}>
					<PreviewForm index={asset?.previews.length} />
				</template>

				<div id="asset-preview-list">
					{#if editing}
						{#each asset?.previews as preview, index}
							<PreviewForm {index} {preview} />
						{/each}
					{/if}
				</div>

				<button type="button" id="asset-add-preview" class="px-2 link">
					<Icon type="plus" class="mr-1" />
					{$t('Add a new preview')}
				</button>
			</section>
		</section>
		<div class="flex justify-center">
			<Button color="primary" class="px-8 mt-6" type="submit" data-loading>
				{#if editing}
					{$t('Save changes')}
				{:else}
					{$t('Submit asset')}
				{/if}
			</Button>
		</div>
	</div>
</FormGroup>
