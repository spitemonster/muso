<script lang="ts">
	import type { Artist, Album } from '$lib/types'
	export let artists: Artist[]
	import songLength from '$lib/utils/songLength'

</script>
<section id="artist-dashboard" class="dashboard">
	<h2>Artist Dashboard</h2>

	{#each artists as artist}
		
		<details>
			<summary>{artist.name}</summary>
			<div>

				{#each artist.albums as album}

					<div>
						<h3>{album.title}</h3>
						<div>
							<ol>

								{#each album.songs as song}
								
									<li>{song.title} - {songLength(song.duration)}</li>
								
								{/each}

							</ol>
						</div>
					</div>

				{/each}

			</div>
		</details>

	{/each}

</section>