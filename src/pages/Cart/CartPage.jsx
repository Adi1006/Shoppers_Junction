import React, { useEffect, useState } from "react";
import styles from "../../styles/cart/cartStyles.module.css";

import { BiMinus } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import CartComponent from "../../Components/CartComponent/CartComponent";



import {
  add,
  productIncrement,
  clearItem,
  deleteItem,
  handleSubtotalMethod,
} from "../../Redux/features/product/productSlice";
import { Link } from "react-router-dom";
const cart = () => {
  const [subtotalPrice, setSubtotalPrice] = useState(null);
  const [deleteCondition, setDeleteCondition] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [clearCondition, setClearCondition] = useState(false);
  const [productDetailsCondition, setProductDetailsCondition] = useState(false);
  const [productsIndex, setProductsIndex] = useState(null);
  const product = useSelector((state) => state.product.value);
  const subtotalPriceValue = useSelector(
    (state) => state.product.subtotalValue
  );
  const dispatch = useDispatch();
  const handleMinusBtn = (item, index, price, count, subtotal) => {
    let temp = count <= 1 ? 1 : count - 1;
    if(count>1){
      let productData = { ...item };
      productData.count = temp;
      productData.price = price;
      productData.subtotal =  subtotal-productData.price;

      // Dispatch the productIncrement action with the updated item data
      dispatch(productIncrement({ index, item: productData }));

      // Calculate the new subtotal price
      const newSubtotalPrice = product.reduce((result, item) => {
        return result - item.subtotal;
      }, 0);

      // Update the subtotal price in the Redux store
      dispatch(handleSubtotalMethod(newSubtotalPrice));
    }
  };

  const handlePlusBtn = (item, index, price, count, subtotal) => {
    let temp = count + 1;
    let productData = { ...item };
    productData.count = temp;
    productData.price = price;
    productData.subtotal = productData.price + subtotal;
  
    dispatch(add(productData));
    // Dispatch the productIncrement action with the updated item data
    dispatch(productIncrement({ index, item: productData }));
  
    // Calculate the new subtotal price
    const newSubtotalPrice = product.reduce((result, item) => {
      return result + item.subtotal;
    }, 0);
  
    // Update the subtotal price in the Redux store
    dispatch(handleSubtotalMethod(newSubtotalPrice));
  };

  const handleClearBtn = () => {
    dispatch(clearItem());
    setClearCondition(false);
  };
  const handleDeleteBtn = (index) => {
    dispatch(deleteItem(deleteIndex));
    // dispatch(deleteItem(index));
    // handleSubtotal();
    dispatch(handleSubtotalMethod());
    setDeleteCondition(false);
  };
  const handleDeleteCondition = (index) => {
    setDeleteIndex(index);
    setDeleteCondition(true);
  };
  const handleClearCondition = () => {
    setClearCondition(true);
  };
  const handleSubtotal = () => {
    let sum = product.reduce((result, item) => {
      return result + item.subtotal;
    }, 0);
    // console.log(sum);
    setSubtotalPrice(() => sum);
  };
  useEffect(() => {
    // handleSubtotal();
    dispatch(handleSubtotalMethod());
  }, [subtotalPrice]);
  const handlePlussBtn = () => {};
  const handleProductDetails = (index) => {
    setProductDetailsCondition(true);
    setProductsIndex(index);
  };
  const handleProductBackBtn = () => {
    setProductDetailsCondition(false);
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.submain}>
          <div className={styles.cartItem_text}>Cart Items</div>
          <div className={`${styles.cartItem_box} ${styles.cartItem_header}`}>
            <div className={styles.cartItem_box_wrapper}>
              <div className={styles.cartItem_name_box}>Item</div>
              <div className={styles.cartItem_price}>Price</div>
              <div className={styles.cartItem_quentity}>Quantity</div>
              <div className={styles.cartItem_subtotal}>Subtotal</div>
              <div className={styles.cartItem_remove}>Remove</div>
            </div>
          </div>
          {product.length === 0 ? (
            <div className={styles.empty_box}>
              <div className={styles.empty_box_text}>No Item Found</div>
              <div className={styles.backproduct_div}>
                <Link to={"/products"} className={styles.continue_shoping}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.cartItem_box}>
                {product.map((item, index) => {
                  return (
                    <div key={index} className={styles.cartItem_box_wrapper}>
                      <div
                        className={`${styles.cartItem_name_box} ${styles.cartItem_name_box_style}`}
                        onClick={() => handleProductDetails(index)}
                      >
                        <div
                          className={styles.cartItem_pic}
                          style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                        ></div>
                        <div className={styles.cartItem_name_color}>
                          <div className={styles.cartItem_name}>
                            {item.name}
                          </div>
                          <div className={styles.cartItem_color}>
                            Color: {item.color}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles.cartItem_price} ${styles.cartItem_price_color}`}
                      >
                        ₹{item.price}
                      </div>
                      <div className={styles.cartItem_quentity}>
                        <button
                          className={styles.Item_decress}
                          onClick={() =>
                            handleMinusBtn(
                              item,
                              index,
                              item.price,
                              item.count,
                              item.subtotal
                            )
                          }
                        >
                          <BiMinus />
                        </button>
                        <div className={styles.item_count}>
                          {/* 1 */}
                          {item.count}
                        </div>
                        <button
                          className={styles.Item_incress}
                          onClick={() =>
                            handlePlusBtn(
                              item,
                              index,
                              item.price,
                              item.count,
                              item.subtotal
                            )
                          }
                        >
                          <BiPlus />
                        </button>
                      </div>
                      <div className={styles.cartItem_subtotal}>
                        ₹{item.subtotal}
                      </div>
                      <div className={styles.cartItem_remove}>
                        {" "}
                        <button
                          className={styles.remove_btn}
                          onClick={() => handleDeleteCondition(index)}
                          // onClick={() => handleDeleteBtn(index)}
                        >
                          <MdDelete className={styles.deleteBtn} />
                          {/* Remove */}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.button_component}>
                <Link to={"/products"} className={styles.continue_shoping}>
                  Continue Shopping
                </Link>
                <button
                  className={styles.clear_items}
                  onClick={handleClearCondition}
                >
                  Clear Items
                </button>
              </div>
              <div className={styles.orderPrice_box}>
                <div className={styles.orderPrice_div}>
                  <div className={styles.orderdiv_component}>
                    <div className={styles.order_key}>Total :</div>
                    <div className={styles.order_value}>
                      ₹{subtotalPriceValue}
                      {/* {subtotalPrice} */}
                      {/* 12000 */}
                    </div>
                  </div>
                  <div className={styles.orderdiv_component}>
                    <div className={styles.order_key}>Shipping Fee :</div>
                    <div className={styles.order_value}>₹{(subtotalPriceValue * 0.0005).toFixed(2)}</div>
                  </div>
                  <hr />
                  <div className={styles.orderdiv_component}>
                    <div className={styles.order_key}>Order Total :</div>
                    <div className={styles.order_value}>
                      ₹{(subtotalPriceValue + subtotalPriceValue * 0.0005).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {deleteCondition ? (
        <div className={styles.deleteMain_div}>
          <div className={styles.deleteBox}>
            <div className={styles.deleteContant}>
              Are you sure, this item will be deleted?
            </div>
            <div className={styles.delete_Btn_group}>
              <button
                className={styles.delete_no_btn}
                onClick={() => setDeleteCondition(false)}
              >
                No
              </button>
              <button
                className={styles.delete_yes_btn}
                onClick={handleDeleteBtn}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {clearCondition ? (
        <div className={styles.deleteMain_div}>
          <div className={styles.deleteBox}>
            <div className={styles.deleteContant}>
              Are you all item will deleted ?
            </div>
            <div className={styles.delete_Btn_group}>
              <button
                className={styles.delete_no_btn}
                onClick={() => setClearCondition(false)}
              >
                No
              </button>
              <button
                className={styles.delete_yes_btn}
                onClick={handleClearBtn}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {productDetailsCondition ? (
        <CartComponent
          productsIndex={productsIndex}
          handleProductBackBtn={handleProductBackBtn}
        />
      ) : null}
    </>
  );
};

export default cart;
