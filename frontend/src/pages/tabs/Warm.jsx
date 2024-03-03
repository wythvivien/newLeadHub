import { useContext, useEffect } from "react";
import DropDown from "../../components/dropdown/Dropdown";
import SearchBar from "../../components/searchbar/SearchBar";
import FormButton from "../../components/button/FormButton";
import useElementWidth from "../../hooks/useElementWidth";
import { BiFilterAlt, BiSort } from "react-icons/bi";
import { ToggleContext } from "../../context/toggleContext";
import { monthsOptions, sortOptions } from "../../data/searchList";
import { useGetAllLeadsQuery } from "../../app/api/leadsApiSlice";
import WarmCard from "../../components/cards/WarmCard";

const Warm = () => {
  const { toggleDispatch } = useContext(ToggleContext);

  const { elementRef, collectionWidth } = useElementWidth();

  const { data: leads } = useGetAllLeadsQuery();

  const warmleads = leads?.filter(lead => lead.status === "Warm")

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-end md:justify-between gap-2 mb-5 max-w-full">
        <div className="flex gap-3">
          <SearchBar />
          <div className="flex gap-2">
            <DropDown
              option={monthsOptions}
              placeholder="Created Date"
              icon={BiFilterAlt}
            />
            <DropDown
              option={sortOptions}
              placeholder="Sort by"
              icon={BiSort}
            />
          </div>
        </div>
        <div className="flex">
          <FormButton
            text="Create Lead"
            onClick={() =>
              toggleDispatch({ type: "SET_CREATE_LEAD", payload: true })
            }
          />
        </div>
      </div>

      <div className="w-full mx-auto md:mx-auto border-2">
        <div
          className={`grid grid-flow-row-dense ${collectionWidth} gap-x-6 gap-y-8`}
          ref={elementRef}
        >
          {warmleads?.map((lead) => (
            <WarmCard key={lead._id} name={lead.name} date={lead.createdAt} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Warm;
