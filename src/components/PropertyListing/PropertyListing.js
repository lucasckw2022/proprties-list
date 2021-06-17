import React, { useEffect, useState } from "react";
import PropertyCard from "../PropertyCard";
import "./PropertyListing.scss";
import axios from "axios";

// const DUMMY_PROPERTY = {
//   id: 73864112,
//   bedrooms: 3,
//   summary:
//     "Property 1 Situated moments from the River Thames in Old Chelsea...",
//   displayAddress: "1 CHEYNE WALK, CHELSEA, SW3",
//   propertyType: "Flat",
//   price: 1950000,
//   branchName: "M2 Property, London",
//   propertyUrl: "/property-for-sale/property-73864112.html",
//   contactUrl: "/property-for-sale/contactBranch.html?propertyId=73864112",
//   propertyTitle: "3 bedroom flat for sale",
//   mainImage:
//     "https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg",
// };

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    try {
      const fetchProperties = async () => {
        const response = await axios.get("/api/properties");
        setProperties(response.data);
        setLoading(false);
      };
      fetchProperties();
    } catch (error) {
      setError(error);
    }
  }, []);

  return (
    <div className="PropertyListing">
      {loading && <div>Loading</div>}
      {error && <div>{error}</div>}
      {!loading &&
        !error &&
        properties &&
        Array(5)
          .fill(properties)
          .map((property, index) => <PropertyCard key={index} {...property} />)}
    </div>
  );
};

export default PropertyListing;
