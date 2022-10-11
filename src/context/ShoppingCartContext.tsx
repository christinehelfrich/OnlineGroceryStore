import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useReducer,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useCartReducer from "../hooks/useCartReducer";
import { CartItem } from "../components/CartItem";
import { Link } from "react-router-dom";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  makeOrder: (cartItems: CartItem[]) => void;
  getItemQuantity: (id: number) => number;
  cartQuantity: number;
  order: CartItem[];
  handleChange: (e: any) => void;
  handleBlur: (event: any) => void;
  handleSubmit: (event: any) => void;
  address: any;
  setAddress: Dispatch<SetStateAction<{ city: string; country: string }>>;
  status: string;
  orderButtonStatus: string;
  isValid: any;
  errors: any;
  touched: any;
  setTouched: any;
  contextValue: any;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};
// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

let initialCart: CartItem[];

try {
  initialCart = JSON.parse(localStorage.getItem("shoppingcart") as any) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [theCart, dispatch] = useReducer(useCartReducer, initialCart);
  useEffect(
    () => localStorage.setItem("shoppingcart", JSON.stringify(theCart)),
    [theCart]
  );
  const contextValue = {
    cart: theCart,
    dispatch,
  };
  const [isOpen, setIsOpen] = useState(false);

  const [checkoutMode, setCheckoutMode] = useState(false);
  const [order, setOrder] = useLocalStorage<CartItem[]>("orders", []);
  const [orderButtonStatus, setOrderButtonStatus] = useState("Place Order");

  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});

  //Derived State
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  // SHOPPING CART METHODS

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const cartQuantity = theCart.reduce(
    (quantity: any, item: any) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return theCart.find((item: any) => item.id === id)?.quantity || 0;
  }

  function makeOrder() {
    setCheckoutMode(true);
    return order;
  }

  // CHECKOUT METHODS

  function handleChange(e: any) {
    e.persist();
    setAddress((curAddress) => {
      return {
        ...curAddress,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleBlur(event: any) {
    setTouched((cur) => {
      return { ...cur, [event.target.id]: true };
    });
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        setOrder(theCart);

        dispatch({
          type: "empty",
        });

        setOrderButtonStatus("Your Order Has Been Placed!");
        //await saveShippingAddress(address);
        setStatus(STATUS.COMPLETED);
        setCheckoutMode(false);
      } catch (e: any) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(address: any) {
    const result: any = {};
    if (!address.city) result.city = "City is Required";
    if (!address.country) result.country = "Country is Required";
    return result;
  }

  if (saveError) throw saveError;
  if (status == STATUS.COMPLETED) {
    return (
      <>
        <p>Your order is on its way. Thanks for Shopping!</p>
        <Link to="/">Home</Link>
      </>
    );
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        makeOrder,
        openCart,
        closeCart,
        cartQuantity,
        order,
        handleChange,
        handleBlur,
        handleSubmit,
        address,
        setAddress,
        status,
        orderButtonStatus,
        isValid,
        errors,
        touched,
        setTouched,
        contextValue,
      }}
    >
      {children}
      <ShoppingCart
        orderButtonStatus={orderButtonStatus}
        isOpen={isOpen}
        checkoutMode={checkoutMode}
      />
    </ShoppingCartContext.Provider>
  );
}
