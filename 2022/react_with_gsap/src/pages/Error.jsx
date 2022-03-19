import React from "react";

const Error = () => {
  return (
    <section
      className="w-full flex justify-center items-center"
      style={{
        height: "calc(100vh - 56px)"
      }}
    >
      <div className="p-8 bg-teal-600 rounded-md border-teal-900 flex items-center">
        <h1 className="text-2xl text-gray-100 font-semibold">
          404 - Page Not Found
        </h1>
      </div>
    </section>
  );
};

export default Error;
