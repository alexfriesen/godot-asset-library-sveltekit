<script lang="ts">
	interface LanguageAlternate {
		hrefLang: string;
		href: string;
	}

	interface AdditionalRobotsProps {
		nosnippet?: boolean;
		maxSnippet?: number;
		maxImagePreview?: 'none' | 'standard' | 'large';
		maxVideoPreview?: number;
		noarchive?: boolean;
		unavailableAfter?: string;
		noimageindex?: boolean;
		notranslate?: boolean;
	}
	interface Twitter {
		cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
		site?: string;
		handle?: string;
		title?: string;
		description?: string;
		image?: string;
		imageAlt?: string;
	}

	interface Facebook {
		appId?: string;
	}

	interface OpenGraph {
		url?: string;
		type?: string;
		title?: string;
		description?: string;
		images?: OpenGraphImage[];
		videos?: OpenGraphVideo[];
		locale?: string;
		site_name?: string;
		profile?: OpenGraphProfile;
		book?: OpenGraphBook;
		article?: OpenGraphArticle;
		video?: OpenGraphVideo;
	}
	interface OpenGraphImage {
		url: string;
		alt?: string;
		width?: number;
		height?: number;
		secure?: boolean;
	}
	interface OpenGraphVideo {
		url: string;
		alt?: string;
		width?: number;
		height?: number;
		secureUrl?: string;
		type?: string;
	}
	interface OpenGraphProfile {
		firstName?: string;
		lastName?: string;
		username?: string;
		gender?: string;
	}

	interface OpenGraphBook {
		authors?: string[];
		isbn?: string;
		releaseDate?: string;
		tags?: string[];
	}
	interface OpenGraphArticle {
		publishedTime?: string;
		modifiedTime?: string;
		expirationTime?: string;
		authors?: string[];
		section?: string;
		tags?: string[];
	}

	interface OpenGraphVideo {
		actors?: OpenGraphVideoActors[];
		directors?: string[];
		writers?: string[];
		duration?: number;
		releaseDate?: string;
		tags?: string[];
		series?: string;
	}

	interface OpenGraphVideoActors {
		profile: string;
		role?: string;
	}

	interface BaseMetaTag {
		content: string;
	}

	interface HTML5MetaTag extends BaseMetaTag {
		name: string;
		property?: undefined;
		httpEquiv?: undefined;
	}

	interface RDFaMetaTag extends BaseMetaTag {
		property: string;
		name?: undefined;
		httpEquiv?: undefined;
	}

	interface HTTPEquivMetaTag extends BaseMetaTag {
		httpEquiv:
			| 'content-security-policy'
			| 'content-type'
			| 'default-style'
			| 'x-ua-compatible'
			| 'refresh';
		name?: undefined;
		property?: undefined;
	}

	type MetaTag = HTML5MetaTag | RDFaMetaTag | HTTPEquivMetaTag;

	interface LinkTag {
		rel: string;
		href: string;
		sizes?: string;
		type?: string;
		color?: string;
	}

	export let title: string = '';
	export let titleTemplate: string = '';
	export let description: string | undefined = undefined;
	export let image: OpenGraphImage | undefined = undefined;
	export let canonical: string | undefined = undefined;
	export let noindex: boolean = false;
	export let nofollow: boolean = false;
	export let robotsProps: AdditionalRobotsProps | undefined = undefined;
	export let languageAlternates: LanguageAlternate[] | undefined = undefined;
	export let twitter: Twitter | undefined = undefined;
	export let facebook: Facebook | undefined = undefined;
	export let openGraph: OpenGraph | undefined = undefined;
	export let additionalMetaTags: MetaTag[] | undefined = undefined;
	export let additionalLinkTags: LinkTag[] | undefined = undefined;

	$: updatedTitle = titleTemplate ? titleTemplate.replace(/%t%/g, title) : title;

	let robotsParams: string = '';
	if (robotsProps) {
		const {
			nosnippet,
			maxSnippet,
			maxImagePreview,
			maxVideoPreview,
			noarchive,
			noimageindex,
			notranslate,
			unavailableAfter
		}: AdditionalRobotsProps = robotsProps;

		robotsParams = `${nosnippet ? ',nosnippet' : ''}${
			maxSnippet ? `,max-snippet:${maxSnippet}` : ''
		}${maxImagePreview ? `,max-image-preview:${maxImagePreview}` : ''}${
			noarchive ? ',noarchive' : ''
		}${unavailableAfter ? `,unavailable_after:${unavailableAfter}` : ''}${
			noimageindex ? ',noimageindex' : ''
		}${maxVideoPreview ? `,max-video-preview:${maxVideoPreview}` : ''}${
			notranslate ? ',notranslate' : ''
		}`;
	}

	if (image) {
		if (typeof openGraph !== 'object') openGraph = {};
		if (!Array.isArray(openGraph.images)) openGraph.images = [];
		openGraph.images.push(image);

		if (twitter && !twitter.image) {
			twitter.image = image.url;
			twitter.imageAlt = image.alt;
		}
	}
</script>

<svelte:head>
	<title>{updatedTitle}</title>

	<meta
		name="robots"
		content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}${robotsParams}`}
	/>
	<meta
		name="googlebot"
		content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}${robotsParams}`}
	/>

	{#if description}
		<meta name="description" content={description} />
	{/if}

	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}

	{#if languageAlternates && languageAlternates.length > 0}
		{#each languageAlternates as languageAlternate}
			<link rel="alternate" hrefLang={languageAlternate.hrefLang} href={languageAlternate.href} />
		{/each}
	{/if}

	{#if twitter}
		{#if twitter.cardType}
			<meta name="twitter:card" content={twitter.cardType} />
		{/if}
		{#if twitter.site}
			<meta name="twitter:site" content={twitter.site} />
		{/if}
		{#if twitter.handle}
			<meta name="twitter:creator" content={twitter.handle} />
		{/if}
		{#if twitter.title}
			<meta name="twitter:title" content={twitter.title} />
		{/if}
		{#if twitter.description}
			<meta name="twitter:description" content={twitter.description} />
		{/if}
		{#if twitter.image}
			<meta name="twitter:image" content={twitter.image} />
		{/if}
		{#if twitter.imageAlt}
			<meta name="twitter:image:alt" content={twitter.imageAlt} />
		{/if}
	{/if}

	{#if facebook}
		<meta property="fb:app_id" content={facebook.appId} />
	{/if}

	{#if openGraph}
		{#if openGraph.url || canonical}
			<meta property="og:url" content={openGraph.url || canonical} />
		{/if}

		{#if openGraph.type}
			<meta property="og:type" content={openGraph.type.toLowerCase()} />
			{#if openGraph.type.toLowerCase() === 'profile' && openGraph.profile}
				{#if openGraph.profile.firstName}
					<meta property="profile:first_name" content={openGraph.profile.firstName} />
				{/if}

				{#if openGraph.profile.lastName}
					<meta property="profile:last_name" content={openGraph.profile.lastName} />
				{/if}

				{#if openGraph.profile.username}
					<meta property="profile:username" content={openGraph.profile.username} />
				{/if}

				{#if openGraph.profile.gender}
					<meta property="profile:gender" content={openGraph.profile.gender} />
				{/if}
			{:else if openGraph.type.toLowerCase() === 'book' && openGraph.book}
				{#if openGraph.book.authors && openGraph.book.authors.length}
					{#each openGraph.book.authors as author}
						<meta property="book:author" content={author} />
					{/each}
				{/if}

				{#if openGraph.book.isbn}
					<meta property="book:isbn" content={openGraph.book.isbn} />
				{/if}

				{#if openGraph.book.releaseDate}
					<meta property="book:release_date" content={openGraph.book.releaseDate} />
				{/if}

				{#if openGraph.book.tags && openGraph.book.tags.length}
					{#each openGraph.book.tags as tag}
						<meta property="book:tag" content={tag} />
					{/each}
				{/if}
			{:else if openGraph.type.toLowerCase() === 'article' && openGraph.article}
				{#if openGraph.article.publishedTime}
					<meta property="article:published_time" content={openGraph.article.publishedTime} />
				{/if}

				{#if openGraph.article.modifiedTime}
					<meta property="article:modified_time" content={openGraph.article.modifiedTime} />
				{/if}

				{#if openGraph.article.expirationTime}
					<meta property="article:expiration_time" content={openGraph.article.expirationTime} />
				{/if}

				{#if openGraph.article.authors && openGraph.article.authors.length}
					{#each openGraph.article.authors as author}
						<meta property="article:author" content={author} />
					{/each}
				{/if}

				{#if openGraph.article.section}
					<meta property="article:section" content={openGraph.article.section} />
				{/if}

				{#if openGraph.article.tags && openGraph.article.tags.length}
					{#each openGraph.article.tags as tag}
						<meta property="article:tag" content={tag} />
					{/each}
				{/if}
			{:else if openGraph.type.toLowerCase() === 'video.movie' || openGraph.type.toLowerCase() === 'video.episode' || openGraph.type.toLowerCase() === 'video.tv_show' || (openGraph.type.toLowerCase() === 'video.other' && openGraph.video)}
				{#if openGraph.video?.actors && openGraph.video.actors.length}
					{#each openGraph.video.actors as actor}
						{#if actor.profile}
							<meta property="video:actor" content={actor.profile} />
						{/if}
						{#if actor.role}
							<meta property="video:actor:role" content={actor.role} />
						{/if}
					{/each}
				{/if}

				{#if openGraph.video?.directors && openGraph.video?.directors.length}
					{#each openGraph.video.directors as director}
						<meta property="video:director" content={director} />
					{/each}
				{/if}

				{#if openGraph.video?.writers && openGraph.video.writers.length}
					{#each openGraph.video.writers as writer}
						<meta property="video:writer" content={writer} />
					{/each}
				{/if}

				{#if openGraph.video?.duration}
					<meta property="video:duration" content={openGraph.video.duration.toString()} />
				{/if}

				{#if openGraph.video?.releaseDate}
					<meta property="video:release_date" content={openGraph.video.releaseDate} />
				{/if}

				{#if openGraph.video?.tags && openGraph.video.tags.length}
					{#each openGraph.video.tags as tag}
						<meta property="video:tag" content={tag} />
					{/each}
				{/if}

				{#if openGraph.video?.series}
					<meta property="video:series" content={openGraph.video.series} />
				{/if}
			{/if}
		{/if}

		{#if openGraph.title || updatedTitle}
			<meta property="og:title" content={openGraph.title || updatedTitle} />
		{/if}

		{#if openGraph.description || description}
			<meta property="og:description" content={openGraph.description || description} />
		{/if}

		{#if openGraph.images && openGraph.images.length}
			{#each openGraph.images as image}
				<meta property="og:image" content={image.url} />
				{#if image.alt}
					<meta property="og:image:alt" content={image.alt} />
				{/if}
				{#if image.width}
					<meta property="og:image:width" content={image.width.toString()} />
				{/if}
				{#if image.height}
					<meta property="og:image:height" content={image.height.toString()} />
				{/if}
				{#if image.secure}
					<meta property="og:image:secure_url" content={image.url} />
				{/if}
			{/each}
		{/if}

		{#if openGraph.videos && openGraph.videos.length}
			{#each openGraph.videos as video}
				<meta property="og:video" content={video.url} />
				{#if video.alt}
					<meta property="og:video:alt" content={video.alt} />
				{/if}
				{#if video.width}
					<meta property="og:video:width" content={video.width.toString()} />
				{/if}
				{#if video.height}
					<meta property="og:video:height" content={video.height.toString()} />
				{/if}
				{#if video.secureUrl}
					<meta property="og:video:secure_url" content={video.secureUrl.toString()} />
				{/if}
				{#if video.type}
					<meta property="og:video:type" content={video.type.toString()} />
				{/if}
			{/each}
		{/if}

		{#if openGraph.locale}
			<meta property="og:locale" content={openGraph.locale} />
		{/if}

		{#if openGraph.site_name}
			<meta property="og:site_name" content={openGraph.site_name} />
		{/if}
	{/if}

	{#if additionalMetaTags && additionalMetaTags.length > 0}
		{#each additionalMetaTags as tag}
			<meta {...tag} />
		{/each}
	{/if}

	{#if additionalLinkTags?.length}
		{#each additionalLinkTags as tag}
			<link {...tag} />
		{/each}
	{/if}
</svelte:head>
