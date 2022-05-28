import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import axiosPrivate from '../../api/axiosPrivate';

const Order = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getOrders = async () => {
            const email = user.email;
            const url = `https://ancient-gorge-57630.herokuapp.com/order?email=${email}`;
            try {
                const { data } = await axiosPrivate.get(url);
                setOrders(data);
            }
            catch(error) {
                console.log(error.message);
                if(error.response.status === 401 || error.response.status === 403){
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getOrders();
    }, [user])
    // useEffect(() =>{
    //     const url = `https://ancient-gorge-57630.herokuapp.com/order`;
    //     fetch(url)
    //     .then(res => res.json())
    //     .then(data => setOrders(data));
    // }, [])

    return (
        <div>
            <h2>Your order: {orders.length}</h2>

        </div>
    );
};

export default Order;