import React, { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
//import { saveShippingAddress } from "../utilities/shippingService";

type CheckoutProps = {
  checkoutMode: Boolean;
  order: any;
};

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

export function Checkout({ checkoutMode, order }: CheckoutProps) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    address,
    status,
    orderButtonStatus,
    isValid,
  } = useShoppingCart();

  return (
    <>
      <h1>Shipping Info</h1>

      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul></ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
            className="form-group"
            required
          />
          <p role="alert">
            {(touched.city || status == STATUS.SUBMITTED) && errors.city}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
            className="form-group"
            required
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
          <p role="alert">
            {(touched.country || status == STATUS.SUBMITTED) && errors.country}
          </p>
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === STATUS.SUBMITTING}
            style={{
              marginTop: "1rem",
              width: "100%",
            }}
          >
            {orderButtonStatus}
          </button>
        </div>
      </form>
    </>
  );
}
