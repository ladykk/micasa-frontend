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
import error from "../assets/images/error.png";

//import pages
import PropertyPage from "./PropertyPage";

//import components
import Loading from "../components/Loading";
import PropertyForm from "../components/PropertyForm";

import PropertyAPI from "../modules/api/PropertyAPI";
import ImageAPI from "../modules/api/ImageAPI";
import instance from "../modules/Instance";

const EditPropertyPage = ({ user }) => {
  const history = useHistory();
  const { id } = useParams();
  const [isFetch, setIsFetch] = useState(true);
  const [property, setProperty] = useState({});
  const [res, setRes] = useState(null);

  useEffect(() => {
    if (isFetch) {
      //Fetch Detail
      (async () => {
        await instance
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
            }
          })
          .catch((err) => {
            if (err) {
              if (err.response) {
                switch (err.response.status) {
                  case 400:
                  case 401:
                  case 404:
                    setRes(err.response.status);
                    break;
                  default:
                    console.error(err.response.data);
                    break;
                }
              }
            } else {
              console.error(err);
            }
          })
          .finally(() => setIsFetch(false));
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
      ) : res ? (
        <Redirect to={`/${res}`} />
      ) : (
        <div className="absolute top-0 left-0 pt-12 w-screen h-screen flex flex-col items-center justify-center">
          <img src={error} alt="" className="w-32 h-32 mb-5" />
          <p className="text-2xl">Something went wrong.</p>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default EditPropertyPage;
