import { ProductProps } from '.'

export default function ProductHeader({
  title,
  desciption,
}: Pick<ProductProps, 'title' | 'desciption'>) {
  return (
    <header>
      <h1 className=" text-2xl font-medium">{title}</h1>
      {desciption ? <p className=" text-gray-500">{desciption}</p> : null}
    </header>
  )
}
