const LoadingComponent = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <span className="loading loading-spinner text-blue-500 w-12 h-12"></span>
    </div>
  );
};
    
export default LoadingComponent