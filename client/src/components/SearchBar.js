const SearchBar = ({ searchTerm, handleSearchChange }) => (
	<div>
		<label
			htmlFor='Search Model'
			className='text-yellow-300'
		>
			Search Model
		</label>
		<input
			type='text'
			id='searchModel'
			placeholder='car model to search'
			value={searchTerm}
			className='m-2 px-3 py-1.5 border h-8 bg-yellow-400 text-red-500 rounded-full border-yellow-400'
			onChange={handleSearchChange}
		/>
	</div>
);

export default SearchBar;
