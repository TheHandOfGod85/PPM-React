import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export default function SearchAssets() {
  const [text, setText] = useState('')
  const [query] = useDebounce(text, 500)
  const navigate = useNavigate()

  useEffect(() => {
    if (!query) {
      navigate('/dashboard/assets')
    } else {
      navigate(`/dashboard/assets?search=${query}`)
    }
  }, [query, navigate])

  return (
    <input
      autoFocus
      value={text}
      type="text"
      placeholder="⌕ Search"
      className={`input input-bordered min-w-[40%]`}
      onChange={(e) => setText(e.target.value)}
    />
  )
}
