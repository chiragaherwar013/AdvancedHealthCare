import { React, useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

import { useSnackbar } from "notistack";
import { storage, db } from "../../firebase";
import "./BloodDonation.css";

// MUI Components
import { Button, TextField, Icon, Avatar } from "@mui/material";
import { Stack, Typography, CircularProgress } from "@mui/material";
import { Tabs, Tab, Checkbox, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const BloodDonation = () => {
  const [user] = useContext(UserContext);
  // Loading SnackBar
  const { enqueueSnackbar } = useSnackbar();

  // Data States
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [amt, setAmt] = useState(0);
  const [disease, setDisease] = useState("");
  const [willing, setwilling] = useState(false);
  const [organ, setorgan] = useState("");
  const [users, setUsers] = useState([]);
  const [donationImg, setDonationImg] = useState(null);
  const [donationAmount, setDonationAmount] = useState(0);

  // Dynamic States
  const [progress, setProgress] = useState(0);
  const [load, setload] = useState(0);
  const [panel, setPanel] = useState("one");

  const changePanel = (e, newValue) => {
    setPanel(newValue);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setDonationImg(e.target.files[0]);
    }
  };

  const handelSubmit = () => {
    setProgress(true);
    if (panel === "one") {
      if (
        name.length > 3 &&
        contact.length === 10 &&
        email.length >= 10 &&
        bloodGroup.length >= 2
      ) {
        db.collection("bloodDonation")
          .add({
            amountAvl: amt,
            bloodGroup: bloodGroup,
            contact: contact,
            disease: disease,
            email: email,
            isWilling: willing,
            name: name,
          })
          .then(() => {
            enqueueSnackbar("Response Successfully Recorded", {
              variant: "success",
            });
            setProgress(false);
          });
      } else {
        enqueueSnackbar("Fill All Fields Correctly!", {
          variant: "error",
        });
        setProgress(false);
      }
    } else {
      if (
        name.length > 3 &&
        contact.length === 10 &&
        email.length >= 10 &&
        organ.length >= 2
      ) {
        db.collection("organDonation")
          .add({
            contact: contact,
            organName: organ,
            email: email,
            name: name,
          })
          .then(() => {
            enqueueSnackbar("Response Successfully Recorded", {
              variant: "success",
            });
            setProgress(false);
          });
      } else {
        setProgress(false);
      }
    }
  };

  useEffect(() => {
    db.collection("rankings")
      .orderBy("bloodDonated", "desc")
      .get()
      .then((result) => {
        setUsers(result.docs.map((doc) => doc.data()));
      })
      .catch((error) => console.log(error.message));
  }, []);

  const Top = (props) => {
    return (
      <Box
        sx={{
          height: 150,
          width: 150,
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Stack sx={{ width: "100%" }} alignItems="center" spacing={2}>
          <Avatar
            src={props.src}
            alt={props.label}
            sx={{ height: 50, width: 50 }}
          />
          <Typography variant="body2">{props.name}</Typography>
          <Typography variant="caption">
            <strong>{props.bloodAmt} Units</strong>
          </Typography>
        </Stack>
      </Box>
    );
  };

  const List = (props) => {
    return (
      <Stack
        direction="row"
        sx={{
          padding: "10px 16px",
          borderRadius: "10px",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
        spacing={5}
      >
        <Typography variant="body2">
          <strong>{props.rank}</strong>
        </Typography>
        <Typography variant="caption">
          <strong>{props.name}</strong>
        </Typography>
        <Typography variant="body2" color="primary">
          <strong>{props.amt} Units</strong>
        </Typography>
      </Stack>
    );
  };

  const handelSubmitReview = () => {
    setload(1);
    if (!user) {
      enqueueSnackbar("You must be logged In!", {
        variant: "error",
      });
      setload(0);
      return;
    }
    const imageName = Math.floor(Math.random() * 1000000) + donationImg.name;
    const uploadTask = storage.ref(`reciepts/${imageName}`).put(donationImg);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        enqueueSnackbar("An error occured, try again later!", {
          variant: "error",
        });
      },
      () => {
        storage
          .ref("reciepts")
          .child(imageName)
          .getDownloadURL()
          .then((imgUrl) => {
            console.log(imgUrl);
            db.collection("bloodDonationforReviews")
              .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                donorEmail: user.email,
                name: user.name,
                donorPic: user.profileImg,
                amount: donationAmount,
                img: imgUrl,
              })
              .then(() => {
                enqueueSnackbar("Your request added successfully", {
                  variant: "success",
                });
                setload(0);
              })
              .catch((error) => {
                console.log(error);
                enqueueSnackbar("An error occured, try again later!", {
                  variant: "error",
                });
                setload(0);
              });
          });
      }
    );
  };

  return (
    <Stack sx={{ minHeight: "80vh" }} alignItems="center">
      <Stack sx={{ width: "100%" }}>
        <Tabs value={panel} onChange={changePanel} sx={{ width: "100%" }}>
          <Tab value="one" label="Donate Blood" sx={{ width: "100%" }} />
          <Tab value="two" label="Donate Organ" sx={{ width: "100%" }} />
          <Tab value="three" label="Rankings" sx={{ width: "100%" }} />
        </Tabs>
        {panel === "one" ? (
          <Stack
            spacing={2}
            sx={{ padding: "16px 24px" }}
            direction="row"
            justifyContent="space-between"
          >
            <Stack spacing={2} sx={{ minWidth: 500 }}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <TextField
                label="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Blood Group"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              />
              <TextField
                label="Amount (Unit)"
                helperText="Amount of blood you can donate"
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
              />
              <TextField
                label="Do you have Any Disease"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
              />
              <div>
                <Checkbox
                  checked={willing}
                  onChange={(e, value) => setwilling(value)}
                />
                <Typography variant="caption">
                  Will You Donate Blood When Contacted
                </Typography>
              </div>
              <Button
                color="success"
                variant="outlined"
                endIcon={
                  progress ? (
                    <CircularProgress size={15} color="inherit" />
                  ) : (
                    <></>
                  )
                }
                disabled={progress}
                onClick={handelSubmit}
              >
                Submit
              </Button>
            </Stack>
            <Stack spacing={2} sx={{ width: "100%", maxWidth: "600px" }}>
              <Typography variant="h6">
                Donated Blood? Inform Us & Get Your Rankings!
              </Typography>
              <TextField
                label="Amount (Unit)"
                helperText="Amount of blood you can donate"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
              <label htmlFor="icon-button-file">
                <input
                  accept=""
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  onChange={handleImageChange}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
                <Typography variant="caption">
                  {donationImg ? donationImg.name : "Upload Documents"}
                </Typography>
              </label>

              <Button
                color="primary"
                variant="outlined"
                endIcon={
                  load ? <CircularProgress size={15} color="inherit" /> : <></>
                }
                disabled={load}
                onClick={handelSubmitReview}
              >
                Submit For Review
              </Button>
            </Stack>
          </Stack>
        ) : panel === "two" ? (
          <Stack spacing={2} sx={{ padding: "16px 24px" }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Organ Name"
              value={organ}
              onChange={(e) => setorgan(e.target.value)}
            />
            <Button
              color="success"
              variant="outlined"
              onClick={handelSubmit}
              endIcon={
                progress ? (
                  <CircularProgress size={15} color="inherit" />
                ) : (
                  <></>
                )
              }
              disabled={progress}
            >
              Submit
            </Button>
          </Stack>
        ) : (
          <Stack spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              sx={{ width: "100%", padding: "16px 24px" }}
            >
              <Top
                src="/images/first.svg"
                name={users[0].userName}
                bloodAmt={users[0].bloodDonated}
              />
              <Top
                src="/images/second.svg"
                name={users[1].userName}
                bloodAmt={users[1].bloodDonated}
              />
              <Top
                src="/images/third.svg"
                name={users[2].userName}
                bloodAmt={users[2].bloodDonated}
              />
            </Stack>
            <Stack sx={{ padding: "16px 24px" }} spacing={2}>
              {users.map((user, i) => {
                if (i < 3) {
                  return "";
                } else {
                  return (
                    <List
                      name={user.userName}
                      rank={i + 1}
                      amt={user.bloodDonated}
                    />
                  );
                }
              })}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default BloodDonation;

// {!users ? (
//         <div>Loading</div>
//       ) : (
//         <div className="bloodDonation">
//           {/* animated background */}

//           {/* Page content */}
//           <div className="blood_Donation_container">
//             {/* Leader-board column */}
//             <div className="left__col_leader-board">
//               <div className="leaderboard__top">
//                 <div className="first_leader">
//                   <div className="leader_detail">
//                     <Link to={`/profile/${users[1].email}`}>
//                       <Avatar src={users[1].pic} />
//                     </Link>
//                     <p>{users[1].name}</p>
//                     <p>{users[1].bloodGroup}</p>
//                     <p>Blood Donated : {users[1].totalBloodDonated} Units</p>
//                   </div>
//                   <div className="leader_image_box">
//                     <img
//                       src={`/images/second.svg`}
//                       alt="The Second-Hero"
//                       height="100px"
//                       width="100px"
//                     />
//                   </div>
//                 </div>
//                 <div className="second_leader">
//                   <div className="leader_detail">
//                     <Link to={`/profile/${users[0].email}`}>
//                       <Avatar src={users[0].pic} />
//                     </Link>
//                     <p>{users[0].name}</p>
//                     <p>{users[0].bloodGroup}</p>
//                     <p>Blood Donated : {users[0].totalBloodDonated} Units</p>
//                   </div>
//                   <div className="leader_image_box">
//                     <img
//                       src={`/images/first.svg`}
//                       alt="The First-Hero"
//                       height="100px"
//                       width="100px"
//                     />
//                   </div>
//                 </div>
//                 <div className="third_leader">
//                   <div className="leader_detail">
//                     <Link to={`/profile/${users[2].email}`}>
//                       <Avatar src={users[2].pic} />
//                     </Link>
//                     <p>{users[2].name}</p>
//                     <p>{users[2].bloodGroup}</p>
//                     <p>Blood Donated : {users[2].totalBloodDonated} Units</p>
//                   </div>
//                   <div className="leader_image_box">
//                     <img
//                       src={`/images/third.svg`}
//                       alt="The Second-Hero"
//                       height="100px"
//                       width="100px"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="leaderboard__bottom">
//                 {/* 4th place donor */}
//                 <div className="first_runnerup_leader">
//                   <div className="leader_image_box_bottom">
//                     <img
//                       src={`/images/medal-of-honor.svg`}
//                       alt="The Second-Hero"
//                       height="40px"
//                       width="40px"
//                     />
//                   </div>
//                   <div className="leader_detail__bottom">
//                     <p>4.</p>
//                     <Link to={`/profile/${users[3].email}`}>
//                       <Avatar src={users[3].pic} />
//                     </Link>
//                     <p>{users[3].name}</p>
//                     <p>{users[3].bloodGroup}</p>
//                     <p>Blood Donated : {users[3].totalBloodDonated} Units</p>
//                   </div>
//                 </div>

//                 {/* 5th place donor */}
//                 <div className="second_runnerup_leader">
//                   <div className="leader_image_box_bottom">
//                     <img
//                       src={`/images/medal.svg`}
//                       alt="The Second-Hero"
//                       height="40px"
//                       width="40px"
//                     />
//                   </div>
//                   <div className="leader_detail__bottom">
//                     <p>5.</p>
//                     <Link to={`/profile/${users[4].email}`}>
//                       <Avatar src={users[4].pic} />
//                     </Link>
//                     <p>{users[4].name}</p>
//                     <p>{users[4].bloodGroup}</p>
//                     <p>Blood Donated : {users[4].totalBloodDonated} Units</p>
//                   </div>
//                 </div>
//                 {/* More than 5th rank donor is a normal donor */}
//                 {users.map((user, i) => {
//                   if (i < 5) return "";
//                   return (
//                     <div className="normal_leader">
//                       <div className="leader_image_box_bottom">
//                         <img
//                           src={`/images/normal-medal.svg`}
//                           alt="The Second-Hero"
//                           height="40px"
//                           width="40px"
//                         />
//                       </div>
//                       <div className="leader_detail__bottom">
//                         <p>{i + 1}</p>
//                         <Link to={`/profile/${users[i].email}`}>
//                           <Avatar src={users[i].pic} />
//                         </Link>
//                         <p>{users[i].name}</p>
//                         <p>{users[i].bloodGroup}</p>
//                         <p>
//                           Blood Donated : {users[i].totalBloodDonated} Units
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               {/* leader_detail__bottom section ends here */}
//             </div>
//             {/* left__col_leader ends here */}

//             {/* form and map column starts */}
//             <div className="right_col_form-map">
//               <div className="donate__blood_form">
//                 <div className="donate__blood_image">
//                   <h2>Donated? Tell Everyone</h2>
//                   <img
//                     src={`/images/blood-donate.svg`}
//                     alt=""
//                     height="50px"
//                     width="50px"
//                   />
//                 </div>
//                 <div className="donate__blood_form_feilds">
//                   <form noValidate autoComplete="off">
//                     <div>
//                       <TextField
//                         id="outlined-multiline-static"
//                         label="Write your thoughts!"
//                         multiline
//                         rows={4}
//                         defaultValue=""
//                         variant="outlined"
//                         value={donationMessage}
//                         onChange={(e) => setDonationMessage(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <TextField
//                         id="date"
//                         label="Date Of Donation"
//                         type="date"
//                         defaultValue=""
//                         InputLabelProps={{
//                           shrink: true,
//                         }}
//                         value={donationDate}
//                         onChange={(e) => setDonationDate(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <TextField
//                         id="number"
//                         label="Amount Donated (Units)"
//                         type="number"
//                         InputLabelProps={{
//                           shrink: true,
//                         }}
//                         value={donationAmount}
//                         onChange={(e) => setDonationAmount(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <input
//                         accept=""
//                         id="contained-button-file"
//                         multiple
//                         type="file"
//                         style={{ display: `none` }}
//                         onChange={handleImageChange}
//                       />
//                       <label htmlFor="contained-button-file">
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           component="span"
//                         >
//                           {donationImg ? donationImg.name : "Upload Documents"}
//                         </Button>
//                       </label>
//                     </div>
//                     <div>
//                       {progress > 0 ? (
//                         <progress value={progress} max="100" />
//                       ) : (
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           endIcon={<Icon></Icon>}
//                           // onClick={handleDonationPublish}
//                         >
//                           Publish
//                         </Button>
//                       )}
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Page Content ended */}
//         </div>
//       )}
