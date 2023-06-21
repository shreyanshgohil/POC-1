

// Simple loader component
const Loader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img src="/images/loader.gif" alt="loader" className="h-8 w-8" />
    </div>
  );
};

export default Loader;