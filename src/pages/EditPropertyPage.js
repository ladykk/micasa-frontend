import React, { useState, useEffect } from "react";
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

import PropertyAPI from "../modules/api/PropertyAPI";
import ImageAPI from "../modules/api/ImageAPI";
import axios from "axios";

const EditPropertyPage = ({ user }) => {
  const history = useHistory();
  const { id } = useParams();
  const [isFetch, setIsFetch] = useState(true);
  const [property, setProperty] = useState({});
  const [res_status, setRes_status] = useState(401);

  useEffect(() => {
    if (isFetch) {
      (async () => {
        await axios
          .get(`${PropertyAPI.apiUrls.edit}/${id}`)
          .then((result) => {
            if (result.status === 200) {
              let property = result.data.payload;
              for (let image in property.images) {
                property.images[image] = ImageAPI.getImageURL(
                  property.images[image]
                );
              }
              setProperty(result.data.payload);
              setIsFetch(false);
            }
          })
          .catch((err) => {
            const response = err.response;
            switch (response.status) {
              case 400:
              case 401:
                setRes_status(response.status);
              default:
                console.error(response.data);
            }
          });
      })();
    }
  }, [isFetch]);

  return !isFetch ? (
    <div>
      {property.property_id ? (
        <Switch>
          <Route path={`/edit/${id}/form`} exact>
            <div className="w-screen h-fit-content absolute top-0 left-0 right-0 bottom-0 pt-20">
              <div className="w-full pl-5 pr-5 desktop:w-4/5 desktop:p-0 h-fit-content mx-auto pb-20 relative">
                <div className="flex items-center mb-5">
                  <img
                    src={arrow}
                    className="w-10 h-10 cursor-pointer mr-3"
                    alt=""
                    onClick={() => history.goBack()}
                  />
                  <h1 className="text-5xl">Edit Property Form</h1>
                </div>
                <PropertyForm data={property} setIsFetch={setIsFetch} />
              </div>
            </div>
          </Route>
          <Route path={`/edit/${id}`} exact>
            <PropertyPage user={user} edit={property} />
          </Route>
        </Switch>
      ) : (
        <Redirect to={`/${res_status}`} />
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default EditPropertyPage;
