import { NavItem, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Checkout } from "./Checkout";

type ShoppingCartProps = {
  isOpen: Boolean;
  orderButtonStatus: String;
  checkoutMode: boolean | undefined;
};

export function ShoppingCart({
  isOpen,
  orderButtonStatus,
  checkoutMode,
}: ShoppingCartProps) {
  const { closeCart, makeOrder, cartQuantity, order } = useShoppingCart();
  const { isAuthenticated } = useAuth0();
  const { contextValue } = useShoppingCart();
  const { cart, dispatch } = contextValue;

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          {cart.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}

          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cart.reduce((total: any, cartItem: any) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>

          {isAuthenticated && cartQuantity > 0 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => makeOrder(cart)}
              hidden={checkoutMode}
            >
              Go To Checkout
            </button>
          )}

          {!isAuthenticated && cartQuantity > 0 && <LoginButton />}

          {cartQuantity == 0 && (
            <button type="button" className="btn btn-primary" disabled>
              {orderButtonStatus}
            </button>
          )}

          {checkoutMode && cartQuantity > 0 && (
            <Checkout checkoutMode={checkoutMode} order={order} />
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
