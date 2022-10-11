import { Reducer } from "react";

type CartItem = {
  id: number;
  quantity: number;
};

export default function useCartReducer(cart: any, action: any) {
  switch (action.type) {
    case "increaseCartQuantity": {
      const { id } = action;
      if (cart.find((item: { id: any }) => item.id === id) == null) {
        //setOrderButtonStatus("Place Order");
        return [...cart, { id, quantity: 1 }];
      } else {
        return cart.map((item: { id: any; quantity: number }) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    }
    case "decreaseCartQuantity": {
      const { id } = action;
      if (cart.find((item: { id: any }) => item.id === id)?.quantity == 1) {
        return cart.filter((item: { id: any }) => item.id !== id);
      } else {
        return cart.map((item: { id: any; quantity: number }) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    }
    case "removeFromCart": {
      const { id } = action;
      return cart.filter((item: { id: any }) => item.id !== id);
    }
    case "empty":
      return [];
  }
}
