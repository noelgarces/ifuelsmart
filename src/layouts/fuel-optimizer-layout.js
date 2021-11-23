const FuelOptimizerLayout = ({ leftPanel, map }) => {
  return (
    <div className="flex gap-6 h-full">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-sm border border-gray-200">{leftPanel}</div>
      <div className="bg-white shadow-lg rounded-sm border border-gray-200 flex-1">
        <div className="px-5 pt-5">{map}</div>
      </div>
    </div>
  );
};

export default FuelOptimizerLayout;
