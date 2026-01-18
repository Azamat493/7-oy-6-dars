import Logo from "../../assets/images/Logo.png";

const Header = () => {
  return (
    <div className="py-5 border-b border-[#00800043]">
      <div className="w-[90%] m-auto">
        <img src={Logo} alt="" />
      </div>
    </div>
  );
};

export default Header;
