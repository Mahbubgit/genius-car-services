// import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import {useAuthState} from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);
    
    const handlePlaceOrder = event =>{
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('https://ancient-gorge-57630.herokuapp.com/order', order)
        .then(response =>{
            console.log(response);
            const {data} = response;
            if(data.insertedId){
                toast('Your order is booked!!');
                event.target.reset();
            }
        })
    }
    // const [user, setUser] = useState({
    //     name: 'Akbar',
    //     email: 'akbar@momo.taj',
    //     address: 'Tajmohol Road',
    //     phone: '0171111112'
    // });

    // const handleAddressChange = event =>{
    //     console.log(event.target.value);
    //     const {address, ...rest} = user;
    //     const newAddress = event.target.value;
    //     const newUser = {address: newAddress, ...rest};
    //     setUser(newUser);
    // }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" value={user?.displayName} name="name" placeholder='Name' readOnly disabled/>
                <br />
                <input className='w-100 mb-2' type="email" value={user?.email} name="email" placeholder='email' readOnly disabled/>
                <br />
                <input className='w-100 mb-2' type="text" value={service.name} name="service" placeholder='service' readOnly disabled/>
                <br />
                <input className='w-100 mb-2' type="text" name="address" placeholder='address' required autoComplete='off'/>
                <br />
                <input className='w-100 mb-2' type="text" name="phone" placeholder='phone' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;