const FuelOptimizerLayout = ({ leftPanel, map }) => {
  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      <div className="col-span-full sm:col-span-5 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200 h-full ">
        {leftPanel}
      </div>
      <div className="col-span-full sm:col-span-7 xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 h-full">
        <div className="px-5 pt-5">{map}</div>
      </div>
    </div>
  );
};

export default FuelOptimizerLayout;
