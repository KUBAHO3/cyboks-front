interface Props {
    size?: "sm" | "md" | "lg";
  }
  
  const Spinner = ({ size }: Props) => {
    const getSize = () => {
      switch (size) {
        case "sm":
          return "h-[8px] w-[8px]";
        case "md":
          return "h-[16px] w-[16px]";
        case "lg":
          return "h-[22px] w-[22px]";
        default:
          return null;
      }
    };
  
    return (
      <div
        className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${
          getSize() || "h-[16px] w-[16px]"
        }`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  };
  
  export default Spinner;