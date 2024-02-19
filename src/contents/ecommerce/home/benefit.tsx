import Icon from '@/common/icons'

export default function Benefits() {
  return (
    <section className="mx-auto mt-28 grid w-full max-w-[1100px] grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="flex w-full items-start gap-4 rounded-lg border border-[#3644b7] p-2">
        <Icon name="Shipping" size={30} color="#3644b7" />
        <div>
          <h3 className="font-medium text-[#3644b7]">Nationwide shipping</h3>
          <p className="text-sm text-gray-500">Payment on delivery</p>
        </div>
      </div>
      <div className="flex w-full items-start gap-4 rounded-lg border border-[#925ff6] p-2 ">
        <Icon name="Chart" size={30} color="#925ff6" />
        <div>
          <h3 className="font-medium text-[#925ff6]">Quality assurance</h3>
          <p className="text-sm text-gray-500">100% original products</p>
        </div>
      </div>

      <div className="flex w-full items-start gap-4 rounded-lg border border-[#d781f0] p-2 ">
        <Icon name="Wallet" size={30} color="#d781f0" />
        <div>
          <h3 className="font-medium text-[#d781f0]">Payment</h3>
          <p className="text-sm text-gray-500">More payment methods</p>
        </div>
      </div>

      <div className="flex w-full items-start gap-4 rounded-lg border border-[#FF52A2] p-2 ">
        <Icon name="Coin" size={30} color="#FF52A2" />
        <div>
          <h3 className="font-medium text-[#FF52A2]">Product return </h3>
          <p className="text-sm text-gray-500">If errors</p>
        </div>
      </div>
    </section>
  )
}
