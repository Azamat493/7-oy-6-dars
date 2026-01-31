import { useDispatch } from "react-redux";
import { useGetOrdersQuery } from "../../hooks/useQuery/useQueryAction/useQueryAction";
import { setOpenDeleteOrderModal } from "../../redux/modal-store";
import { Spin, Alert } from "antd";
import DeleteOrderModalStory from "../modals/DeleteOrderModalStory";

const TrackOrder = () => {
  const dispatch = useDispatch();
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  const handleOpenMoreInfo = (order: any) => {
    dispatch(setOpenDeleteOrderModal({ open: true, data: order }));
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <Spin size="large" />
      </div>
    );
  if (isError) return <Alert message="Error loading orders" type="error" />;

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
            {orders && orders.length > 0 ? (
              [...orders].reverse().map((order: any) => (
                <div
                  key={order._id}
                  className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center px-6 py-5 border-b border-gray-50 hover:bg-gray-50/50 transition-all"
                >
                  <div className="text-[#46A358] font-bold text-[14px]">
                    #{order._id?.slice(-8).toUpperCase()}
                  </div>

                  <div className="text-center text-[#727272] text-[14px]">
                    {new Date(
                      order.createdAt || order.extra_shop_info?.date,
                    ).toLocaleDateString("en-GB")}
                  </div>

                  <div className="text-center text-[#3D3D3D] font-bold text-[14px]">
                    ${Number(order.extra_shop_info?.total).toFixed(2)}
                  </div>

                  <div className="text-right pr-2">
                    <button
                      onClick={() => handleOpenMoreInfo(order)}
                      className="text-[13px] font-bold text-[#3D3D3D] hover:text-[#46A358] cursor-pointer transition-colors border border-gray-200 px-4 py-1.5 rounded-md hover:border-[#46A358]"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-gray-400 italic">
                No orders found.
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteOrderModalStory />
    </div>
  );
};

export default TrackOrder;
