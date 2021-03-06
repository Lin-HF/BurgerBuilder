import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        // loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients);
        //alert('You continue!');
        // this.setState({ loading: true });
        const formData = {};
        for (let formElementIndentifier in this.state.orderForm) {
            formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        // axios.post('/orders.json', order).then(response => {
        //     this.setState({ loading: false});
        //     this.props.history.push('/');
        // }).catch(response => {
        //     this.setState({ loading: false});
        // });
        this.props.onOrderBurger(order, this.props.token);
    }

    // checkValidity(value, rules) {
    //     let isValid = true;

    //     if (!rules) {
    //         return true;
    //     }
    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid;
    //     }
    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid;
    //     }
    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid;
    //     }
    //     return isValid;
    // }

    inputChangedHandler = (event, inputIndentifier) => {
        // console.log(event.target.value);
        
        const updatedFormElement = updateObject(this.state.orderForm[inputIndentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIndentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIndentifier] : updatedFormElement
        });
        // updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.touched = true;
        // updatedOrderForm[inputIndentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIndentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });

    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>

            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched} />
            ))}
            {/* <Input inputtype="input" type="email" name="email" placeholder="Your email"></Input>
            <Input inputtype="input" type="text" name="street" placeholder="Street"></Input>
            <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"></Input> */}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));