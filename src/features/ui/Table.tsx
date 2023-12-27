import { ReactNode } from 'react'

// if I need the context for a future feature

// interface TableContextProps {}

// const TableContext = createContext<TableContextProps | undefined>(undefined)

function Table({ children, style }: { children: ReactNode; style?: string }) {
  return (
    // <TableContext.Provider >
    <div className="overflow-x-auto">
      <table className={`table ${style}`}>{children}</table>
    </div>
    // </TableContext.Provider>
  )
}

function Header({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  )
}

function Body<T>({
  data,
  render,
}: {
  data: T[]
  render: (item: T) => ReactNode
}) {
  return (
    <tbody>
      {data?.map((item, index) => (
        <tr key={index}>{render(item)}</tr>
      ))}
    </tbody>
  )
}

Table.Header = Header
Table.Body = Body

export default Table
