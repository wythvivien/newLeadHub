import FormInput from "../../components/inputs/FormInput";
import FormButton from "../../components/button/FormButton";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { ToggleContext } from "../../context/toggleContext";
import { useCreateLeadMutation } from "../../app/api/leadsApiSlice";

const CreateLead = () => {
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    number: "",
    status: "",
  });

  const { state, toggleDispatch } = useContext(ToggleContext);

  const [createLead] = useCreateLeadMutation();

  // Form Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Calling the register mutation passing the data
      await createLead(leadData);
      setLeadData({
        name: "",
        email: "",
        number: "",
        status: "",
      });
      toast("Lead Created Successfully");
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };


  return (
    <aside
      className={`${
        state.createLead ? "block" : "hidden"
      } h-full w-screen sm:w-[370px] z-50 fixed top-0 right-0 bg-white drop-shadow-2xl`}
    >
      <MdClose
        className="size-6 absolute right-6 top-5 cursor-pointer"
        onClick={() =>
          toggleDispatch({ type: "SET_CREATE_LEAD", payload: false })
        }
      />
      <div className="border-b-4 p-6 mt-5">
        <h2 className="text-sm text-icons font-semibold">CREATING LEADS</h2>
        <h1 className="text-base font-bold">INPUT BUSINESS PROSPECTS</h1>
      </div>
      <p className="px-6 py-4 text-sm text-icons">
        Send your commitment and grab your opportunity by outreaching to
        multiple possible prospects. Leads that are outreached
      </p>

      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-5 px-6 my-3">
          <FormInput
            item="Full Name"
            value={leadData.name}
            onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
          />
          <FormInput
            item="Email Address"
            value={leadData.email}
            onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
          />
          <FormInput
            item="Contact Number"
            value={leadData.number}
            onChange={(e) => setLeadData({ ...leadData, number: e.target.value })}
          />
          <FormInput
            item="Lead Status"
            value={leadData.status}
            onChange={(e) => setLeadData({ ...leadData, status: e.target.value })}
          />
        </div>
        <div className="flex px-6 justify-end gap-3 mt-7">
          <FormButton text="Confirm" />
        </div>
      </form>
    </aside>
  );
};

export default CreateLead;
