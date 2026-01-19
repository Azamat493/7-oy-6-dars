import { useReduxSelector } from "../../hooks/useRedux/useRedux";
import AuthorizationModal from "./modals-item/authorization/authorization";

const Modals = () => {
  const { authorizationModalVisibility } = useReduxSelector(
    (state) => state.modalSlice,
  );
  return <>{authorizationModalVisibility && <AuthorizationModal />}</>;
};

export default Modals;
