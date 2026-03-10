import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CartPage = () => {
    const { cart_items } = useSelector(store => store.cartStore)

    const ind_total = cart_items.map(item => item.price)

    const total = ind_total.reduce((a, c) => {
        return a + c
    }, 0)

    const dispatch = useDispatch()

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left">#</th>
                                <th className="px-6 py-4 text-left" colSpan={2}>Product</th>
                                <th className="px-6 py-4 text-left">Price</th>
                                <th className="px-6 py-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart_items.length > 0 ? (
                                cart_items.map((cart_item, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-semibold text-gray-700">{i + 1}</td>
                                        <td className="px-6 py-4">
                                            <img className="h-24 w-24 object-cover rounded" src={cart_item.image} alt={cart_item.title} />
                                        </td>
                                        <td className="px-6 py-4 text-gray-800">{cart_item.title}</td>
                                        <td className="px-6 py-4 font-bold text-green-600">${cart_item.price}</td>
                                        <td className="px-6 py-4">
                                            <button
                                            onClick={()=>dispatch({type: "REMOVE_FROM_CART", payload: cart_item.id

                                            })} 
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">REMOVE</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Cart is empty</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot className="bg-gray-100 border-t-2">
                            <tr>
                                <td colSpan={4} className="px-6 py-4 font-bold text-lg text-gray-800">TOTAL</td>
                                <td className="px-6 py-4 font-bold text-xl text-green-600">${total.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CartPage