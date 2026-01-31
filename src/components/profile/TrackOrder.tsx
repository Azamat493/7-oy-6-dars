const TrackOrder = () => {
  const orders = JSON.parse(localStorage.getItem("order_history") || "[]");

  return (
    <div className="w-full">
      <h2 className="text-[18px] font-bold text-[#3D3D3D] mb-6">
        Order History
      </h2>

      <div className="w-full order-track-scroll border border-gray-100 rounded-lg">
        <div className="min-w-[750px] w-full bg-white">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-[#FBFBFB] px-6 py-4 border-b border-gray-200">
            <div className="text-[14px] font-bold text-[#3D3D3D]">
              Order Number
            </div>
            <div className="text-[14px] font-bold text-[#3D3D3D] text-center">
              Date
            </div>
            <div className="text-[14px] font-bold text-[#3D3D3D] text-center">
              Total
            </div>
            <div className="text-[14px] font-bold text-[#3D3D3D] text-right pr-4">
              More Info
            </div>
          </div>

          <div className="flex flex-col">
            {orders.length > 0 ? (
              [...orders].reverse().map((order: any, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center px-6 py-5 border-b border-gray-50 hover:bg-gray-50/50 transition-all"
                >
                  <div className="text-[#46A358] font-bold text-[14px]">
                    #{order.orderId}
                  </div>

                  <div className="text-center text-[#727272] text-[14px]">
                    {order.date}
                  </div>

                  <div className="text-center text-[#3D3D3D] font-bold text-[14px]">
                    ${Number(order.total).toFixed(2)}
                  </div>

                  <div className="text-right pr-2">
                    <button className="text-[13px] font-bold text-[#3D3D3D] hover:text-[#46A358] cursor-pointer transition-colors border border-gray-200 px-4 py-1.5 rounded-md">
                      View details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-gray-400 italic">
                No orders history available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
