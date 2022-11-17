import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Badge from "@mui/material/Badge";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { DELETE } from "../redux/actions/action";
const Header = () => {
  const getData = useSelector((state) => state.cartR.carts);
  const dispatch = useDispatch();

  const [price, setPrice] = useState(0);
console.log('price:', price)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    dispatch(DELETE(id));
  };
  const total = () => {
    let price = 0;
    getData.map((ele, i) => {
      price = (ele.price*ele.qnty) + price;
    })
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  return (
    <Navbar style={{ height: "60px" }} bg="dark" variant="dark">
      <Container>
        <NavLink to="/" className="text-light text-decoration-none mx-3">
          Add To Cart
        </NavLink>
        <Nav className="me-auto">
          <NavLink to="/" className="text-light text-decoration-none">
            Home
          </NavLink>
        </Nav>
        <Badge
          badgeContent={getData.length}
          color="primary"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
        </Badge>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getData.length ? (
            <div className="card_details" style={{ width: "24rem", padding: 10 }}>
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurent Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((e, id) => {
                    return (
                      <tr key={id}>
                        <td>
                          <NavLink onClick={handleClose} to={`/cart/${e.id}`}>
                            <img style={{ width: "5rem", height: "5rem" }} src={e.imgdata} alt="img"></img>
                          </NavLink>
                        </td>
                        <td>
                          <p>{e.rname}</p>
                          <p>Price :₹ {e.price}</p>
                          <p>Quantity :{e.qnty}</p>
                          <p onClick={() => handleDelete(e.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                            <i className="fas fa-trash smalltrash"></i>
                          </p>
                        </td>
                        <td style={{ color: "red", fontSize: 20, cursor: "pointer" }} className="mt-5">
                          <i onClick={() => handleDelete(e.id)} className="fas fa-trash largetrash"></i>
                        </td>
                      </tr>
                    );
                  })}
                  <p className="text-center">Total: ₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "24rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}
                onClick={handleClose}
              ></i>
              <p style={{ fontSize: 22 }}>Your Cart Is Empty</p>
              <img className="emptycart_img" style={{ width: "5rem", padding: 10 }} src="./cart.gif" alt="cart"></img>
            </div>
          )}
        </Menu>
      </Container>
    </Navbar>
  );
};

export default Header;
