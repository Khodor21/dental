import React from "react";

const TeamCard = ({ Image }) => {
  return (
    <div className="flex justify-center items-center overflow-x-auto p-10">
      <div className=" rounded-[10px] overflow-hidden shadow-2xl bg-main">
        <img
          src={Image}
          alt="placeholder"
          className="w-[350px] h-full mx-auto"
        />
      </div>
    </div>
  );
};

export default TeamCard;
