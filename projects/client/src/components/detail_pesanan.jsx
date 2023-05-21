import axios from "axios"
import { useEffect, useState } from "react"

export default function DetailOrder(props) {

    const [query, setQuery] = useState('')
    const [inputMoney, setInputMoney] = useState(0)
    const [alert, setAlert] = useState("")

    let handleChange = (input) => {
        if (isNaN(input)) {
            setAlert("Please input a number")
        } else {
            setAlert("")
            setInputMoney(input)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setQuery(inputMoney)
            console.log(inputMoney)
        }, 700);

        return () => {
            clearTimeout(timeout)
        }
    }, [inputMoney])

    return (
        <>
            <div className="flex items-start justify-center">
                <div className="bg-gray-50 w-[1200px] rounded px-7 py-3">
                    <h3 className="text-2xl">
                        Detail Pesanan
                    </h3>
                    <div className="flex justify-center">
                        <div className="px-5 basis-2/3">
                            <table className="w-full mr-10">
                                <thead className="bg-[#F0F0F0]">
                                    <tr className="font-semibold">
                                        <th>#</th>
                                        <td>Nama</td>
                                        <td>Foto</td>
                                        <td>Harga</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.data.dataCart.map((value, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{`${value.food.name} x ${value.qty}`}</td>
                                                    <td><img src={`${process.env.REACT_APP_IMAGE_URL}Public/images/${value.food.picture}`} className="w-[150px] h-[100px] object-cover rounded" /></td>
                                                    <td>{`Rp ${(value.qty * value.food.price).toLocaleString()}`}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="pl-10 border-l-2 basis-1/3">
                            <h4 className="w-full text-xl text-center">
                                Uang Pembeli (Rp)
                            </h4>
                            <input onChange={(e) => handleChange(e.target.value)} type="text" className={alert.length == 0 ? "w-full px-2 py-2 mt-5 border-2 rounded focus:ring-0 focus:ring-transparent focus:outline-none" : "w-full px-2 py-2 mt-5 border-red-600 border-2 rounded focus:ring-0 focus:ring-transparent focus:outline-none"} />
                            <p className="text-red-600">{alert}</p>
                            <div className="flex w-full my-3">
                                <button onClick={() => props.data.setTriggerCharge(false)} className="w-full py-1 mr-3 font-semibold border-2 rounded bg-gray-50 text-[#454545]">
                                    Close
                                </button>
                                <button className="w-full bg-[#3CACEE] text-white font-semibold py-1 border-2 rounded">
                                    Pay!
                                </button>
                            </div>
                            <div>
                                <p className="font-semibold text-red-700">
                                    Kembalian :
                                </p>
                                <p className="font-semibold">
                                    {`Rp ${(query - props.data.totalPrice).toLocaleString()}`}
                                </p>
                            </div>
                            <button className="w-full py-1 mr-3 font-semibold border-2 rounded bg-gray-50 text-[#454545] my-3">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}