import React, { useState } from "react";

export default function TopicsTabs() {
  const choices = [
    "Furniture",
    "Agriculture",
    "Business",
    "Brokers",
    "Salon",
    "Transport",
    "Baking",
    "Fashion",
  ];

  // State to track selected topics
  const [selectedTopics, setSelectedTopics] = useState([]);

  // Function to handle button click
  const handleButtonClick = (choice) => {
    // Disable the button once selected
    const updatedChoices = choices.filter((item) => item !== choice);
    setSelectedTopics([...selectedTopics, choice]);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-y-4">
        <div className="text-lg font-bold text-white">
          Choose topics of your interest
        </div>
        <div className="grid grid-cols-4 gap-2">
          {choices.map((choice, index) => (
            <button
              key={index}
              className={`bg-[#D9D9D9] rounded-full hover:bg-orange-400 hover:text-white text-lg px-4 py-1 font-medium w-32 ${
                selectedTopics.includes(choice) ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleButtonClick(choice)}
              disabled={selectedTopics.includes(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
