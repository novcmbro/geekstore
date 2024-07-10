export const ProductsListHeader = ({ title, children }: { title: string, children?: React.ReactElement | null }) => {
  return (
    <div className="products-list-header">
      <h2 className="typography-title-md">{title}</h2>
      {children}
    </div>
  )
}
