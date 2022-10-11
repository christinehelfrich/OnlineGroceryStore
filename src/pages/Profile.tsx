import { useAuth0 } from "@auth0/auth0-react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import data from "../data/items.json";
import { Col } from "react-bootstrap";

export function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const { order } = useShoppingCart();

  const orderItems: any = order.map((item) =>
    data.find((element) => element.id == item.id)
  );

  return (
    <div>
      <h1>Welcome back, {user?.name}</h1>
      <img
        src={user?.picture}
        alt={user?.name}
        style={{
          maxWidth: "10rem",
        }}
      />

      <h1>Your Recent Order: </h1>
    </div>
  );
}
