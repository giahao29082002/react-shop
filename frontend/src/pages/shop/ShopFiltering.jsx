/* eslint-disable react/prop-types */

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  return (
    <div className="space-x-5 flex-shrink-0">

      <h3>Filters</h3>
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Catelory</h4>
        <hr />
        {
          filters.categories.map((category) => (
            <label key={category} className="capitalize cursor-pointer">
              <input type="radio" name="category" id="category" value={category}
                checked={filtersState.category === category}
                onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
              />
              <span className='ml-1'>{category}</span>
            </label>
          ))
        }
      </div>

      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Size</h4>
        <hr />
        {
          filters.size.map((size) => (
            <label key={size} className="capitalize cursor-pointer">
              <input type="radio" name="size" id="category" value={size}
                checked={filtersState.size === size}
                onChange={(e) => setFiltersState({ ...filtersState, size: e.target.value })}
              />
              <span className='ml-1'>{size}</span>
            </label>
          ))
        }
      </div>

      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price</h4>
        <hr />
        {
          filters.priceRanges.map((range) => (
            <label key={range.label} className="capitalize cursor-pointer">
              <input type="radio" name="priceRange" id="priceRange"
                value={`${range.min} - ${range.max}`}
                checked={filtersState.priceRange === `${range.min} - ${range.max}`}
                onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
              />
              <span className='ml-1'>{range.label}</span>
            </label>

         
          ))
        }
      </div>
      <button onClick={clearFilters} className="bg-primary py-1 px-4 text-white rounded">Clear all</button>
    </div>
  )
}

export default ShopFiltering