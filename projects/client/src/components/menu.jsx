import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Menu(props) {

    let navigate = useNavigate()

    useEffect(()=>{
        props.func.getData()
    },[])

    return (
        <>
            <div className="px-28">
                <div className="py-6">
                    <p className="text-lg">Tambahkan menu makanan yang ada di resto</p>
                </div>
                <div className="py-5 bg-white px-7 drop-shadow-md">
                    <div className="pb-8">
                        <button onClick={() => navigate('/addMenu')} className="py-1 px-5 font-semibold text-white rounded bg-[#3CACEE]">
                            + Tambah Menu
                        </button>
                    </div>
                    <div>
                        <table className="w-full">
                            <thead className="bg-[#F0F0F0] py-5">
                                <tr className="font-semibold">
                                    <th>#</th>
                                    <td>Nama</td>
                                    <td>Foto</td>
                                    <td>Harga</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.data.allMenu.map((value, index) => {
                                        return (
                                            <tr className="odd:bg-gray-50">
                                                <td className="text-center">{index + 1}</td>
                                                <td>{`${value.name}`}</td>
                                                <td><img src={`http://localhost:5000/Public/images/${value.picture}`} className="w-[150px] h-[100px] object-cover rounded" /></td>
                                                <td>{`Rp ${value.price.toLocaleString()}`}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}