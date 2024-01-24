import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
// import FileBase from "react-file-base64";
import { addClub } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { ADD_CLUB, SET_ERRORS } from "../../../redux/actionTypes";
const Body = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [value, setValue] = useState({
      clubName: "",
      isTechnical: false,
    });
  
    useEffect(() => {
      if (Object.keys(store.errors).length !== 0) {
        setError(store.errors);
        setValue({
          clubName: "",
          isTechnical: false,
        });
      }
    }, [store.errors]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError({});
      setLoading(true);
      dispatch(addClub(value));
    };
  
    useEffect(() => {
      if (store.errors || store.admin.clubAdded) {
        setLoading(false);
        if (store.admin.clubAdded) {
          setValue({
            clubName: "",
            isTechnical: false,
          });
  
          dispatch({ type: SET_ERRORS, payload: {} });
          dispatch({ type: ADD_CLUB, payload: false });
        }
      } else {
        setLoading(true);
      }
    }, [store.errors, store.admin.clubAdded]);
  
    useEffect(() => {
      dispatch({ type: SET_ERRORS, payload: {} });
    }, []);
    return (
        <div className="flex-[0.8] mt-3">
          <div className="space-y-5">
            <div className="flex text-gray-400 items-center space-x-2">
              <AddIcon />
              <h1>Add Club</h1>
            </div>
            <div className="mr-10 bg-white flex flex-col rounded-xl ">
              <form className={classes.adminForm0} onSubmit={handleSubmit}>
                <div className={classes.adminForm1}>
                  <div className={classes.adminForm2l}>
                    <div className={classes.adminForm3}>
                      <h1 className={classes.adminLabel}>Club Name :</h1>
                      <input
                        placeholder="Club Name"
                        required
                        className={classes.adminInput}
                        type="text"
                        value={value.clubName}
                        onChange={(e) =>
                          setValue({ ...value, clubName: e.target.value })
                        }
                      />
                    </div>
    
                    <div className={classes.adminForm3}>
                      <h1 className={classes.adminLabel}>Is Technical :</h1>
                      <select
                        required
                        className={classes.adminInput}
                        value={value.isTechnical}
                        onChange={(e) =>
                          setValue({
                            ...value,
                            isTechnical: e.target.value === "true",
                          })
                        }
                      >
                        <option value="true">Technical</option>
                        <option value="false">Non-Technical</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={classes.adminFormButton}>
                  <button
                    className={classes.adminFormSubmitButton}
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setValue({
                        clubName: "",
                        isTechnical: false,
                      });
                      setError({});
                    }}
                    className={classes.adminFormClearButton}
                    type="button"
                  >
                    Clear
                  </button>
                </div>
                <div className={classes.loadingAndError}>
                  {loading && (
                    <Spinner
                      message="Adding Club"
                      height={30}
                      width={150}
                      color="#111111"
                      messageColor="blue"
                    />
                  )}
                  {error.clubError && (
                    <p className="text-red-500">{error.clubError}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}
export default Body;