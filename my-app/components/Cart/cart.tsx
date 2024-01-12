import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const trauma = useSelector((state: RootState) => state.cart.trauma);

  let check;

  if (trauma === null){
      check = trauma;
  }
  else if (trauma.First_aid_in_Trauma_List.length === 0){
      check = null;
  }
  else {
      check = true;
  }

  console.log(check);

  return (
      <>
          {check ? (
              <Link to="/trauma/" style={{'paddingTop': '7px', 'top': '5px', 'left':'-360px', 'paddingLeft': '1170px', 'position': 'absolute'}} >
                <Button className="button-style" >Перейти к оформлению 🛒</Button>
              </Link>
          ) : (

            <div className="text-center" style={{'paddingTop': '7px', 'top': '10px', 'left':'-260px', 'paddingLeft': '1170px', 'position': 'absolute'}}>Корзина пустая 🛒</div>
          )}
      </>
  );
};

export default Cart;