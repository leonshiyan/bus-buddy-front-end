import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
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
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBusNo">
        <Form.Label>Bus Stop Number</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="e.g. 60980" 
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className= "shadow-sm"
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ width: '30vw' }}>
        Search
      </Button>
    </Form>
  )
}

export default SearchForm