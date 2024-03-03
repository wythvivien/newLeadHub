import FormInput from "../../components/inputs/FormInput";
import FormButton from "../../components/button/FormButton";
import { MdClose } from "react-icons/md";
import { useContext, useState } from "react";
import { ToggleContext } from "../../context/toggleContext";

const SendEmail = () => {
  const { state, toggleDispatch } = useContext(ToggleContext);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <aside
      className={`${
        state.sendEmail ? "block" : "hidden"
      } h-full w-screen sm:w-[370px] z-50 fixed top-0 right-0 bg-white drop-shadow-2xl`}
    >
      <MdClose
        className="size-6 absolute right-6 top-5 cursor-pointer"
        onClick={() => toggleDispatch({ type: "SET_SEND_EMAIL", payload: false })}
      />
      <div className="border-b-4 p-6 mt-5">
        <h2 className="text-sm text-icons font-semibold">OUTREACHING</h2>
        <h1 className="text-base font-bold">FINDING BUSINESS PROSPECTS</h1>
      </div>
      <p className="px-6 py-4 text-sm text-icons">
        Send your commitment and grab your opportunity by outreaching to
        multiple possible prospects. Leads that are outreached are directly
        transferred to repository
      </p>
      <div className="px-6 my-3">
        <FormInput item="Recipient Email Address" />
        <textarea
          placeholder="Enter your message..."
          value={message}
          onChange={handleChange}
          className="w-full border rounded-sm h-60 bg-stone-100 text-sm outline-none px-1.5 py-1.5 focus:outline-active my-5"
        ></textarea>
      </div>
      <div className="flex px-6 justify-end gap-3">
        <FormButton text="Forward"/>
      </div>
    </aside>
  );
};

export default SendEmail;
