import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createClubAssessment } from "../../../redux/actions/studentActions"; // Assuming you have the appropriate action
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_CLUB_ASSESSMENT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";


const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    student:user.result._id,
    email:user.result.email,
    club: "",
    eventName: "",
    year: "",
    participationType: "",
    isTechnicalEvent: false,
  });
  const clubs = useSelector((state) => state.student.clubs);
  console.log(clubs);

  useEffect(() => {
    if (store.errors || store.student.createClubAssessment) {
      setLoading(false);
      if (store.student.createClubAssessment) {
    setValue({
      club: "",
      email:user.result.email,
      eventName: "",
      year: "",
      participationType: "",
      isTechnicalEvent: false,
    });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_CLUB_ASSESSMENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.createClubAssessment]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(createClubAssessment(value));
  };

  // useEffect(() => {
  //   if (store.errors || store.student.getclub) {
  //     setLoading(false);
  //     if (store.student.getclub) {
  //       setValue({
  //         club:"",
  //         eventName: "",
  //         year: "",
  //         participationType: "",
  //         isTechnicalEvent: false,
  //       });

  //       dispatch({ type: SET_ERRORS, payload: {} });
  //       dispatch({ type: ADD_CLUB_ASSESSMENT, payload: false });
  //     }
  //   } else {
  //     setLoading(true);
  //   }
  // }, [store.errors, store.student.getclub]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <AddIcon />
          <h1>Create Club Assessment</h1>
        </div>
        <div className=" mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
              <div className={classes.adminForm3}>
  <h1 className={classes.adminLabel}>Club Name :</h1>
  <Select
  required
  displayEmpty
  sx={{ height: 36 }}
  inputProps={{ "aria-label": "Without label" }}
  value={value.club}
  onChange={(e) => setValue({ ...value, club: e.target.value })}
>
  <MenuItem value="" disabled>Select Club</MenuItem>
  {clubs.map((club, idx) => (
    <MenuItem key={idx} value={club.clubName}>
      {club.clubName}
    </MenuItem>
  ))}
</Select>

</div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Event Name :</h1>

                  <input
                    required
                    placeholder="Event Name"
                    className={classes.adminInput}
                    type="text"
                    value={value.eventName}
                    onChange={(e) =>
                      setValue({ ...value, eventName: e.target.value })
                    }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Year :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.year}
                    onChange={(e) =>
                      setValue({ ...value, year: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="2022">2022</MenuItem>
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2025">2025</MenuItem>
                  </Select>
                </div>
              </div>
              <div className={classes.adminForm2r}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Participation Type :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.participationType}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        participationType: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="volunteer">Volunteer</MenuItem>
                    <MenuItem value="Winner">Winner</MenuItem>
                    <MenuItem value="participate">Participate</MenuItem>
                    <MenuItem value="firRunnnerUp">First Runner-Up</MenuItem>
                    <MenuItem value="secRunnerUp">Second Runner-Up</MenuItem>
                  </Select>
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Technical Event :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.isTechnicalEvent}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        isTechnicalEvent: e.target.value === "true",
                      })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    club: "",
                    EventName: "",
                    year: "",
                    participationType: "",
                    isTechnicalEvent: false,
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
                  message="Creating Club Assessment"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.clubAssessmentError || error.backendError) && (
                <p className="text-red-500">
                  {error.clubAssessmentError || error.backendError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

 export default Body;