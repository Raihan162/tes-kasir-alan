import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function AddMenu() {
    
    let navigate = useNavigate()

    const [photoFood, setPhotoFood] = useState([])
    const [dataFood, setDataFood] = useState({
        name: "",
        price: 0
    })
    const [alert, setAlert] = useState("")

    let onImageValidation = (e) => {
        try {
            let files = [...e.target.files]
            setPhotoFood(files)

            if (files.length !== 0) {
                files.forEach((value) => {
                    if (value.size > 5000000) {
                        setAlert(`${value.name} more than 5000 Kb`)
                    } else {
                        setAlert('')
                    }
                })
            }
        } catch (error) {
        }
    }

    let addDataFood = async () => {
        try {

            let fd = new FormData()
            fd.append('images', photoFood[0])
            fd.append('data', JSON.stringify({ name: dataFood.name, price: dataFood.price }))

            let data = await axios.post(`http://localhost:5000/food/addFood`, fd)
            console.log(data)
            navigate(-1)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
            <div className="py-10 px-28">
                <div className="py-5 bg-white px-7 drop-shadow-md">
                    <h2 className="font-semibold text-[#3CACEE]">
                        Tambahkan Menu
                    </h2>
                    <div className="py-5">
                        <p className="py-3">Nama Menu</p>
                        <input type="text" onChange={(e) => setDataFood({ ...dataFood, name: e.target.value })} className="w-full px-2 py-1 border rounded" />
                    </div>
                    <div className="py-5">
                        <p className="py-3">Gambar Menu</p>
                        <input type="file" accept="images/*" onChange={(e) => onImageValidation(e)} className="w-full px-2 py-1 border rounded" />
                        <p>{alert}</p>
                    </div>
                    <div className="py-5">
                        <p className="py-3">Harga Menu</p>
                        <div className="flex items-center">
                            <p className="bg-[#3CACEE] w-max absolute text-white py-1 px-3 rounded-l">Rp</p>
                            <input type="text" onChange={(e) => setDataFood({ ...dataFood, price: e.target.value })} className="w-full py-1 pl-12 pr-2 border rounded focus:outline-none" />
                        </div>
                    </div>
                    <div className="grid w-full py-5 justify-items-end">
                        <button onClick={() => addDataFood()} className="bg-[#7CB083] px-20 py-2 rounded text-white drop-shadow-md">
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}