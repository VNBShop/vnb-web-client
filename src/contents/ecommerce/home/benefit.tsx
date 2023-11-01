import Icon from '@/common/icons'

export default function Benefits() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full px-4 lg:grid-cols-4 gap-5 max-w-[1100px] mx-auto mt-28">
      <div className="flex w-full items-start gap-4 border border-[#3644b7] p-2 rounded-lg">
        <Icon name="Shipping" width={30} height={30} color="#3644b7" />
        <div>
          <h3 className="font-medium text-[#3644b7]">Nationwide shipping</h3>
          <p className="text-sm text-gray-500">Payment on delivery</p>
        </div>
      </div>
      <div className="flex w-full items-start gap-4 border border-[#925ff6] p-2 rounded-lg ">
        <Icon name="Chart" width={30} height={30} color="#925ff6" />
        <div>
          <h3 className="font-medium text-[#925ff6]">Quality assurance</h3>
          <p className="text-sm text-gray-500">100% original products</p>
        </div>
      </div>

      <div className="flex w-full items-start gap-4 border border-[#d781f0] p-2 rounded-lg ">
        <Icon name="Wallet" width={30} height={30} color="#d781f0" />
        <div>
          <h3 className="font-medium text-[#d781f0]">Payment</h3>
          <p className="text-sm text-gray-500">More payment methods</p>
        </div>
      </div>

      <div className="flex w-full items-start gap-4 border border-[#FF52A2] p-2 rounded-lg ">
        <Icon name="Coin" width={30} height={30} color="#FF52A2" />
        <div>
          <h3 className="font-medium text-[#FF52A2]">Product return </h3>
          <p className="text-sm text-gray-500">If errors</p>
        </div>
      </div>
    </section>
  )
}
