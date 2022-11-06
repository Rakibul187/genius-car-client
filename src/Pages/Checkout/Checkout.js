import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext)

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const phone = form.phone.value;
        const email = user?.email || "unregistered";
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('http://localhost:5000/orders', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("genius-token")}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('order placed successfully')
                    form.reset()
                }
                console.log(data)
            })
            .catch(er => console.error(er))
    }

    return (
        <form onSubmit={handlePlaceOrder}>
            <h2 className='text-4xl'>You are About to Ordered {title}</h2>
            <h4 className='text-3xl'>Price: {price}</h4>
            <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-4'>
                <input type="text" name="firstName" placeholder="First Name" className="input input-ghost w-full  input-bordered " />
                <input type="text" name="lastName" placeholder="Last Name" className="input input-ghost w-full input-bordered  " />
                <input type="text" name="phone" placeholder="Your Phone" className="input input-ghost w-full  input-bordered " />
                <input type="text" name="email" placeholder="Your Email" defaultValue={user?.email} readOnly className="input input-ghost w-full input-bordered  " />
            </div>
            <textarea name="message" className="textarea textarea-bordered h-24 w-full" placeholder="Your Message"></textarea>
            <input className='btn outline-info' type="submit" value="Place Your Order" />
        </form>
    );
};

export default Checkout;