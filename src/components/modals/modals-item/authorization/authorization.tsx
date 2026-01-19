import { Modal } from "antd";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../hooks/useRedux/useRedux";
import { setAuthorizationModalVisibility } from "../../../../redux/modal-store";
import { useState } from "react";
import Login from "./login/Login";
import Register from "./register/Register";

const AuthorizationModal = () => {
  const { authorizationModalVisibility } = useReduxSelector(
    (state) => state.modalSlice,
  );
  const dispatch = useReduxDispatch();
  const [state, setState] = useState<string>("login");
  return (
    <Modal
      open={authorizationModalVisibility}
      centered
      footer={false}
      onCancel={() => dispatch(setAuthorizationModalVisibility())}
      mask={true}
      styles={{
        mask: {
          backdropFilter: "none",
          backgroundColor: "rgba(0,0,0,0.45)",
        },
      }}
    >
      <div className="mt-10">
        <div className="flex items-center justify-center gap-4">
          <div
            onClick={() => setState("login")}
            className={`text-xl cursor-pointer ${state === "login" && "text-[#46A358]"}`}
          >
            Login
          </div>
          <div className="bg-[#3D3D3D] w-px h-5"></div>
          <div
            onClick={() => setState("register")}
            className={`text-xl cursor-pointer ${state === "register" && "text-[#46A358]"}`}
          >
            Register
          </div>
        </div>
        {state === "login" ? <Login /> : <Register />}
      </div>
    </Modal>
  );
};

export default AuthorizationModal;
