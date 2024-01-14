import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Button } from 'react-bootstrap';

const Cart: React.FC = () => {
    const trauma_draft_status = useSelector((state: RootState) => state.user.trauma_draft);
    return (
        <>
          {trauma_draft_status ? (
            <Button className="button-style" >Перейти к оформлению 🛒</Button>
          ) : (

            // <div className="button-style" style={{backgroundColor: 'white', color: 'grey'}}>Корзина пустая 🛒</div>
            <Button  style={{backgroundColor: 'white',
                  color: 'grey', borderColor: 'white', cursor: 'default' }}>Корзина пустая 🛒</Button>
          )}
        </>
    );
};

export default Cart;