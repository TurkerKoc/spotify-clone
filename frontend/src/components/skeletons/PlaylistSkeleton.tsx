const PlaylistSkeleton = () => {
  // Create an array of 7 elements to represent the playlists in loading state
  // Each element is a skeleton of a playlist
  // The skeletons are animated to create a loading effect
  // The skeletons are styled to match the playlist card design
  // The skeletons are placed in a grid layout to create a list of playlists
  // The skeletons are placed in a scroll area to create a scrollable list of playlists
  
	return Array.from({ length: 7 }).map((_, i) => (
		<div key={i} className='p-2 rounded-md flex items-center gap-3'>
			<div className='w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0 animate-pulse' />
			<div className='flex-1 min-w-0 hidden md:block space-y-2'>
				<div className='h-4 bg-zinc-800 rounded animate-pulse w-3/4' />
				<div className='h-3 bg-zinc-800 rounded animate-pulse w-1/2' />
			</div>
		</div>
	));
};
export default PlaylistSkeleton;