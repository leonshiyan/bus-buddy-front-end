import { useState } from 'react'

interface SearchFormProps {
  handleSearch: (query: string) => void
}

const SearchForm = (props: SearchFormProps): JSX.Element => {
  const [query, setQuery] = useState<string>('')
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.handleSearch(query)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchForm
  
  
