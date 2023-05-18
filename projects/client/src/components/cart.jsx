import axios from "axios"
import { useState } from "react"

import Popup from "./popup_save"
import Charge from "./detail_pesanan"

export default function Cart(props) {

    const [triggerPopup, setTriggerPopup] = useState(false)
    const [triggerCharge, setTriggerCharge] = useState(false)

    let addToCart = async (input) => {
        try {
            await axios.post('http://localhost:5000/cart/addCart', {
                food_id: input
            })
            props.func.getDataCart()
        } catch (error) {

        }
    }

    let deleteCart = async () => {
        try {
            await axios.delete('http://localhost:5000/cart/delete')
            props.func.getDataCart()
        } catch (error) {

        }
    }

    return (
        <>
            {
                triggerPopup ?
                    <div className="absolute inset-0 z-10 bg-black bg-opacity-40">
                        <div className="flex items-center justify-center min-h-[100vh]">
                            <Popup data={{ setTriggerPopup }} />
                        </div>
                    </div>
                    :
                    null
            }
            {
                triggerCharge ?
                    <div className="absolute inset-0 z-10 bg-black bg-opacity-40">
                        <div className="flex items-center justify-center min-h-[100vh]">
                            <Charge data={{ ...props.data, setTriggerCharge }} />
                        </div>
                    </div>
                    :
                    null
            }
            <div className="flex py-8 px-28">
                <div className="basis-2/3">
                    <div className="grid grid-cols-3">
                        {props.data.allMenu.map((value, index) => {
                            return (
                                <button onClick={() => addToCart(value.id)} value={value.id} className="flex flex-col items-center my-3 bg-white rounded drop-shadow-md w-max">
                                    <img src={`http://localhost:5000/Public/images/${value.picture}`} className="w-[300px] h-[200px] object-cover rounded-t" />
                                    <div className="py-2 text-center">
                                        <h4 className="text-lg font-medium text-[#454545]">{value.name}</h4>
                                        <h5 className="font-semibold text-[#3CACEE]">{`Rp ${value.price.toLocaleString()}`}</h5>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="basis-1/3">
                    <div className="flex flex-col items-center py-1 bg-white rounded drop-shadow-md">
                        <h3 className="py-2 text-2xl font-semibold text-[#454545]">
                            Pesanan
                        </h3>
                        <div className="flex flex-col items-center">
                            {
                                props.data.dataCart.map((value, index) => {
                                    return (
                                        <div className="grid items-center grid-cols-4 px-4 py-5">
                                            <img src={`http://localhost:5000/Public/images/${value.food.picture}`} className="w-[150px] h-[100px] object-cover rounded" />
                                            <h4 className="text-lg font-medium text-[#454545] mx-3">{value.food.name}</h4>
                                            <h4 className="mx-2 font-semibold text-right text-[#454545]">{`x${value.qty}`}</h4>
                                            <h4 className="font-semibold text-[#3CACEE] ">{`Rp ${value.food.price.toLocaleString()}`}</h4>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="grid w-full grid-cols-2 gap-3 px-5 my-3">
                            <button onClick={() => deleteCart()} className="col-span-2 py-1 font-semibold text-red-600 bg-white border-2 border-red-600 rounded-sm font">
                                Clear Cart
                            </button>
                            <button onClick={() => setTriggerPopup(true)} className="py-1 font-semibold text-white rounded-sm bg-[#7CB083]">
                                Save Bill
                            </button>
                            <button className="py-1 font-semibold text-white bg-[#7CB083] rounded-sm">
                                Print Bill
                            </button>
                            <button onClick={() => setTriggerCharge(true)} className="col-span-2 py-2 font-semibold text-white rounded-sm bg-[#3CACEE]">
                                Charge Rp {props.data.totalPrice.toLocaleString()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}