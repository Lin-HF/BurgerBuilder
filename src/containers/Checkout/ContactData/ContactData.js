import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: 'Max',
            street: '506 Muller Pkwy',
            zipCode: '47403',
            country: 'U.S.',
            email: 'max@text.com',
            deliveryMethod: 'fastest'
        },
        loading: false
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients);
        alert('You continue!');
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({ loading: false});
            this.props.history.push('/');
        }).catch(response => {
            this.setState({ loading: false});
        });
    }

    render () {
        let form = (<form>
            <Input inputtype="input" type="text" name="name" placeholder="Your name"></Input>
            <Input inputtype="input" type="email" name="email" placeholder="Your email"></Input>
            <Input inputtype="input" type="text" name="street" placeholder="Street"></Input>
            <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"></Input>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;