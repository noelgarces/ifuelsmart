import logo from "assets/logo-orange.png";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body, #root {
              height: 100%
            }
          `,
        }}
      />
      <div className="flex h-full">
        <div className="bg-gray-800 text-white w-56 h-full">
          <ul className="px-3 mt-5">
            <li className="bg-gray-700 px-4 py-2 rounded-sm font-semibold">Fuel Navigator</li>
          </ul>
        </div>
        <div className="flex-1 h-full flex flex-col">
          <div className="bg-white h-20 flex items-center px-5">
            <img src={logo} alt="" width="225" />
          </div>
          <div className="bg-gray-100 flex-grow">Main</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
