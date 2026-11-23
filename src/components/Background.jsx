const Background = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 z-n1 pe-none overflow-hidden" aria-hidden="true">
      <div className="cloud cloud-top-center position-absolute bg-white" />
      <div className="cloud cloud-top-right position-absolute bg-white" />
      <div className="cloud cloud-middle-right position-absolute bg-white" />
      <div className="cloud cloud-bottom-right position-absolute bg-white" />
      <div className="cloud cloud-bottom-left position-absolute bg-white" />
    </div>
  );
};

export default Background;