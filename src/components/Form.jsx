export function Form ({ searchInputRef, handleSubmit, handleInputChange }) {
  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        ref={searchInputRef}
        onChange={handleInputChange}
        type='text'
        placeholder='The godfather, The great beauty, The hand of god...'
      />
      <button>Search</button>
    </form>
  )
}
