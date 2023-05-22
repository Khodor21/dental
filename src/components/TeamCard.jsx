import React from "react";

const TeamCard = ({ Name, Age, Desc, Image }) => {
  return (
    <div className="flex justify-center items-center overflow-x-auto p-10">
      <div className=" rounded-[10px] overflow-hidden shadow-2xl bg-main">
        <img src={Image} alt="placeholder" className="w-[200px] mx-auto pt-2" />
        <div className="px-4 py-2">
          <h5 className="text-lg font-bold mb-4 text-center text-white">
            {Name}
          </h5>
          <h6 className=" text-center mb-1 text-white">{Desc}</h6>
          <h6 className="text-md mb-2 text-center text-fourth"> {Age}</h6>
        </div>
      </div>{" "}
    </div>
  );
};

export default TeamCard;
