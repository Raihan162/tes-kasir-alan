import "@lottiefiles/lottie-player";
import { IoClose } from "react-icons/io5"

export default function PopupSave(props) {
    return (
        <>
            <div className="flex items-start justify-center">
                <div className="flex flex-col items-center bg-gray-100 w-[500px] rounded">
                    <div className="w-full p-5">
                        <button onClick={() => props.data.setTriggerPopup(false)}>
                            <IoClose className="text-4xl text-[#454545]" />
                        </button>
                    </div>
                    <lottie-player
                        autoplay
                        mode="normal"
                        src="https://assets4.lottiefiles.com/packages/lf20_wcnjmdp1.json"
                        style={{ width: "320px" }}
                    ></lottie-player>
                    <h3 className="text-3xl font-semibold text-[#454545] py-5 ">
                        Bill Saved
                    </h3>
                </div>
            </div>
        </>
    )
}