import { Key } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ADD, DELETE, REMOVE } from "../redux/actions/action";
const CardsDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  console.log("data:", data);

  const { id } = useParams();

  const getData = useSelector((state) => state.cartR.carts);

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id === Number(id);
    });
    setData(compareData);
  };

  useEffect(() => {
    compare();
  }, [id]);

  const HandleAddCart = (data) => {
    dispatch(ADD(data));
  };

  const handleDelete = (id) => {
    dispatch(DELETE(id));
    navigate("/");
  };

  const removeOne = (item) => {
    dispatch(REMOVE(item));
  };
  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>
        <section className="container mt-3">
          <div className="iteamsdetails">
            {data.map((ele, id) => {
              return (
                <div key={id}>
                  <div style={{ padding: "10px" }} className="items_img">
                    <img src={ele.imgdata} alt="img"></img>
                  </div>

                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Resturant</strong> : {ele.rname}
                          </p>
                          <p>
                            <strong>Price</strong> : ₹ {ele.price}
                          </p>
                          <p>
                            <strong>Dishs</strong> : {ele.address}
                          </p>
                          <p>
                            <strong>Total</strong> :₹ {ele.price * ele.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}
                          >
                            <spa n style={{ fontSize: 24 }} onClick={ele.qnty <= 1 ? () => handleDelete(ele.id) : () => removeOne(ele)}>
                              -
                            </spa>
                            <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                            <span style={{ fontSize: 24 }} onClick={() => HandleAddCart(ele)}>
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating : </strong>
                            <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{ele.rating} ★ </span>
                          </p>
                          <p>
                            <strong>Order Review : </strong>
                            <span>{ele.somedata} </span>
                          </p>
                          <p>
                            <strong>Remove : </strong>
                            <span>
                              <i
                                onClick={() => handleDelete(ele.id)}
                                style={{ color: "red", fontSize: "20", cursor: "pointer" }}
                                className="fas fa-trash"
                              ></i>{" "}
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;
