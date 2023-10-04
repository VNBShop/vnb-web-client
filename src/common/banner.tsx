import Icon from './icons'

export default function Banner() {
  return (
    <section className="bg-black">
      <section className="py-1 max-w-main mx-auto flex items-center justify-end gap-2 px-4">
        <p className="text-white text-xs flex items-center gap-1">
          <Icon name="Phone" width={17} height={17} />
          1900 1087
        </p>
        <div className="h-[18px] w-[1px] bg-white" />
        <p className="text-white text-xs flex items-center gap-1">
          <Icon name="Plane" width={17} height={17} />
          Store system
        </p>
      </section>
    </section>
  )
}
