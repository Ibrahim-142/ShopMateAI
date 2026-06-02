import React from "react";

const ShippingForm = ({ formData, handleChange, handleSubmit, errors, cities }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-6 mb-6">
      {/* Full Name */}
      <div className="mb-4">
        <label className="font-medium text-sm uppercase block mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="p-2 text-sm w-full border"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="font-medium text-sm uppercase block mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Street address"
          className="p-2 text-sm w-full border"
        />
        {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="font-medium text-sm uppercase block mb-2">City</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="p-2 text-sm w-full border"
        >
          <option value="">Select City</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
      </div>

      {/* Postal Code */}
      <div className="mb-6">
        <label className="font-medium text-sm uppercase block mb-2">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="Postal code"
          className="p-2 text-sm w-full border"
        />
        {errors.postalCode && <p className="text-red-500 text-xs">{errors.postalCode}</p>}
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 px-5 py-2 text-sm text-white uppercase"
      >
        Save Address
      </button>
    </form>
  );
};

export default ShippingForm;