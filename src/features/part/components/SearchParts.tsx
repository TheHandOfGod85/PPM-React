import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

interface SearchPartsProps {
  id?: string
}

export default function SearchParts({ id }: SearchPartsProps) {
  const [text, setText] = useState('')
  const [query] = useDebounce(text, 700)
  const navigate = useNavigate()
  useEffect(() => {
    if (!query) {
      navigate(`/dashboard/assets/${id}`)
    } else {
      navigate(`/dashboard/assets/${id}?search=${query}`)
    }
  }, [query, navigate, id])
  return (
    <input
      value={text}
      type="text"
      placeholder="⌕ Search"
      className={`input input-bordered min-w-[40%]`}
      onChange={(e) => setText(e.target.value)}
    />
  )
}
