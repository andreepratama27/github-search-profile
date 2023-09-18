const Chevron = ({ open }: { open: boolean }) => {
  if (open) {
    return (
      <div className="img-wrapper w-4 h-4">
        <img src="/chevron-down.svg" />
      </div>
    );
  }
  return (
    <div className="img-wrapper w-4 h-4">
      <img src="/chevron-up.svg" />
    </div>
  );
};

export default Chevron;
