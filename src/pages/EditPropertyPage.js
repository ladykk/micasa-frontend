import React, { useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useHistory,
} from "react-router-dom";

//import pictures
import arrow from "../assets/icons/property_detail/arrow.png";

//import pages
import PropertyPage from "./PropertyPage";

//import components
import Loading from "../components/Loading";
import PropertyForm from "../components/PropertyForm";

const EditPropertyPage = ({ user }) => {
  const history = useHistory();
  const { id } = useParams();
  const [isOwner, setOwner] = useState(true);
  const [isFetch, setFetch] = useState(true);
  const [property, setProperty] = useState({
    property_id: "1",
    property_name: "Rhythm Ratchada - Huai Kwang",
    property_type: "Condo",
    contract: "Rent",
    area: 69.19,
    price: 18000,
    rent_payment: "Month",
    rent_requirement: "Min. 1 year contract",
    bedroom: "2",
    bathroom: "2",

    district: "Huai Khwang",
    province: "Bangkok",
    near_station: "MRT Ratchadaphisek",
    maps_query: "RHYTHM+Ratchada-Huaikwang",
    furnishing: "Furnished",
    ownership: "Leasehold",
    facilities: {
      air_conditioning: true,
      cctv: true,
      garden: true,
      parking: true,
      security: true,
      swimming_pool: true,
    },
    description:
      "1 Bedroom Condo for Sale or Rent in RHYTHM RATCHADA, Sam Sen Nok, Bangkok near MRT Ratchadaphisek ** For Rent / Sale Condo ** Rhythm Ratchada(near Ratchada-Ladprao Intersection) High floor,very nice view, Sky Kitchen, View 1 bedroom, 1 bathroom,size 45.49 sq.m.,23th floor✅ Ready to use electrical appliances, including television, stereo, refrigerator, washing machine, microwave✅ There is a sauna and swimming pool.✅ Convenient transportation, next to MRT Ratchadaphisek✅ Near department stores such as Central Rama 9, Esplanade Ratchada, the street Ratchada, Big C, Ratchada, Lotus, Fortune✅ Near the train market, Ratchada market, Huay Kwang marketRent 20,000 baht / monthSelling 5.2 baht, including everything (Personal income tax 1% + 0.5% duty tax + 2% transfer fee.  *** Don't pay for business ***☎️  Contact: Kung",
    images: {
      image_cover:
        "https://www.angelrealestate.co.th/wp-content/uploads/2019/07/interior.jpg",
    },
    seen: 452,
    status: "Listing",
    favorite: false,
  });
  return isFetch ? (
    <div>
      {isOwner ? (
        <Switch>
          <Route path={`/edit/${id}/form`} exact>
            <div className="w-screen h-fit-content absolute top-0 left-0 right-0 bottom-0 pt-20">
              <div className="w-full pl-5 pr-5 2xl:w-4/5 2xl:p-0 h-fit-content mx-auto pb-20 relative">
                <div className="flex items-center mb-5">
                  <img
                    src={arrow}
                    className="w-10 h-10 cursor-pointer mr-3"
                    alt=""
                    onClick={() => history.goBack()}
                  />
                  <h1 className="text-5xl">Edit Property Form</h1>
                </div>
                <PropertyForm data={property} />
              </div>
            </div>
          </Route>
          <Route path={`/edit/${id}`} exact>
            <PropertyPage user={user} edit={property} />
          </Route>
        </Switch>
      ) : (
        <Redirect to="/401" />
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default EditPropertyPage;
