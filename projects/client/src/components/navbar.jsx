import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Navbar() {

    let navigate = useNavigate()

    const [choosenButton, setChoosenButton] = useState('')

    let changeColor = (input) => {
        if (input === 'menu') {
            navigate('/menu')
            setChoosenButton('menu')
        } else if (input === 'cart') {
            navigate('/cart')
            setChoosenButton('cart')
        }
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <div>
                <div className="flex py-2 text-2xl text-white px-28 bg-[#3CACEE]">
                    <h1>Gambar</h1>
                    <h1 className="pl-5 ">Alan Resto</h1>
                </div>
                <div className="flex text-lg font-semibold text-[#454545] shadow-md px-28">
                    <button onClick={(e) => changeColor(e.target.value)} value={'menu'} className={choosenButton === 'menu' ? "px-8 py-2 mx-1 text-[#3CACEE] border-b-2 border-[#3CACEE]" : "px-8 py-2 mx-1 text-[#454545]"}>Food</button>
                    <button onClick={(e) => changeColor(e.target.value)} value={'cart'} className={choosenButton === 'cart' ? "px-8 py-2 mx-1 text-[#3CACEE] border-b-2 border-[#3CACEE]" : "px-8 py-2 mx-1 text-[#454545]"}>Transaksi</button>
                </div>
            </div>
            <div className="bg-[#F8F8F8]">
                <Outlet />
            </div>
        </>
    )
}