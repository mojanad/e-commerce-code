import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Products() {
  const hambozo = useContext(UserContext);
  console.log("🚀 ~ Products ~ hambozo:", hambozo);

  return <div>Products</div>;
}
