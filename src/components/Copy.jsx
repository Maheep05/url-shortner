import React, { useState } from "react";

export function Copy({ link }) {
  const [copy, setCopy] = useState('');

  async function handleClick() {
    
    const copiedLink = `http://localhost:3000/${link}`
    setCopy(await navigator.clipboard.writeText(copiedLink));
  }

  return (
    <div>
      <div className="flex justify-center items-center pb-5">
        <button
          className="border-solid rounded-lg shadow-lg border-2 p-2 text-white bg-black font-medium"
          onClick={handleClick}
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}
