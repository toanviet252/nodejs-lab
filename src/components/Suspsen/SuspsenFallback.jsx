import { ReactComponent as SpinIcon } from "../../assets/Spiner.svg";

const LoadingFallback = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <SpinIcon />
    </div>
  );
};
export default LoadingFallback;
