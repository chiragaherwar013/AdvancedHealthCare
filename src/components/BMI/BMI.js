import { React, useState } from "react";

// MUI Components
import { TextField, Button, Typography } from "@mui/material";
import { Stack, CircularProgress } from "@mui/material";

// SnackBar
import { useSnackbar } from "notistack";

// Icons
import CalculateIcon from "@mui/icons-material/SendRounded";

import "./BMI.css";
const BMI = () => {
  // Loading SnackBar
  const { enqueueSnackbar } = useSnackbar();

  // BMI States
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);

  // Page
  const [page, setPage] = useState(0);
  const [Loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setTimeout(false);
      if (height < 1 || weight < 1 || age < 1) {
        enqueueSnackbar("Please Input Correct Values", { variant: "error" });
        return;
      }
      setPage(1);
    }, 2000);
  };

  const getBMIResultMessage = () => {
    const bmi = (weight / (height * height)) * 10000;
    if (bmi <= 16) {
      return "Severely Thin";
    } else if (bmi > 16 && bmi <= 17) {
      return "Moderately Thin";
    } else if (bmi > 17 && bmi <= 18.5) {
      return "Mild Thin";
    } else if (bmi > 18.5 && bmi <= 25) {
      return "Normal";
    } else if (bmi > 25 && bmi <= 30) {
      return "Over Weight";
    } else {
      return "Obese";
    }
  };

  const getRecommendedCalories = () => {
    const bmi = (weight / (height * height)) * 10000;

    if (bmi <= 18.5) {
      return "2000-2500 ";
    } else if (bmi > 18.5 && bmi <= 25) {
      return "1800-2200";
    } else if (bmi > 25 && bmi <= 30) {
      return "1500-1900";
    } else {
      return "1300-1700";
    }
  };

  const getRecommendedDiet = () => {
    const bmi = (weight / (height * height)) * 10000;

    if (bmi <= 18.5) {
      return "eat protein rich food with carbs and good vitamins. Such as eggs, green vegetables, high toned milk,  green dals and have a moderate workout daily, avoid eating junk food..";
    } else if (bmi > 18.5 && bmi <= 25) {
      return "keep maintaining your normal eating habits with little excercise and stay witin your daily calorie requirements..  Avoid junk food and prefer juices for good immunity and better metabolism..";
    } else if (bmi > 25 && bmi <= 30) {
      return "Use Green tea with zero sugars,  Avoid oily food and junk food,  Eat 3 times a day only with green vegetables,  milk,  wheat chappatis and dahi..  You can also eat chocolate (1-2 pcs) as it helps to reduce fat ..";
    } else {
      return "Remove bad habits of eating, and avoid any  kind of oil based food,  avoid rice as much as possible,  drink bitter melon juice for fast fat burn,  a daily moderate excercise is also recommend..";
    }
  };

  return (
    <div className="bmi">
      {!page ? (
        <div className="bmi__firstPage">
          <div className="bmi__calculatorContainer">
            <Stack spacing={2}>
              <Typography variant="h4"> Calculate Your BMI</Typography>
              <form className="bmi__form">
                <TextField
                  label="Height (cm)"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setHeight(e.target.value)}
                  error={height < 0}
                  color={height > 40 ? "success" : "primary"}
                />
                <TextField
                  label="Weight (kg)"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setWeight(e.target.value)}
                  error={weight < 0}
                  color={weight > 10 ? "success" : "primary"}
                />
                <TextField
                  label="Age (yrs)"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setAge(e.target.value)}
                  error={age < 0}
                  color={age > 1 ? "success" : "primary"}
                />
                <Button
                  onClick={handleSubmit}
                  color="success"
                  variant="contained"
                  endIcon={
                    Loading ? (
                      <CircularProgress color="inherit" size={15} />
                    ) : (
                      <CalculateIcon />
                    )
                  }
                  disabled={Loading}
                >
                  Calculate
                </Button>
              </form>
            </Stack>
          </div>
          <div className="bmi__imgContainer">
            <img src={"/images/fitness.svg"} />
          </div>
        </div>
      ) : (
        <div className="bmi__secondPage">
          <div className="bmi__resultContainer">
            <div className="bmi__resultHeader">
              <div className="bmi__inputData">
                <div>
                  <img src={"/images/age.svg"} />
                  <Typography variant="caption">
                    <strong>{age}</strong>{" "}
                    <Typography variant="caption" color="primary">
                      <strong>years</strong>
                    </Typography>
                  </Typography>
                </div>
              </div>
              <div className="bmi__inputData">
                <div>
                  <img src={"/images/height.svg"} />
                  <Typography variant="caption">
                    <strong>{height}</strong>{" "}
                    <Typography variant="caption" color="primary">
                      <strong>cm</strong>
                    </Typography>
                  </Typography>
                </div>
              </div>
              <div className="bmi__inputData">
                <div>
                  <img src={"/images/scale.svg"} />
                  <Typography variant="caption">
                    <strong>{weight}</strong>{" "}
                    <Typography variant="caption" color="primary">
                      <strong>kg</strong>
                    </Typography>
                  </Typography>
                </div>
              </div>
            </div>
            <div className="bmi__resultData">
              <div className="bmi__resultBMI">
                Your BMI : {((weight / (height * height)) * 10000).toFixed(2)}
              </div>
              <div className="bmi__resultMessage">
                <Typography variant="body2">
                  You are {getBMIResultMessage()}
                </Typography>
              </div>
            </div>
            <div className="bmi__waterContainer">
              <img src={"/images/water.svg"} />
              <Typography variant="body1">
                Drink At least 8 litres of water daily
              </Typography>
            </div>
            <div className="bmi__recommendations">
              <table>
                <tr>
                  <td>
                    <Typography variant="body2">
                      Recommended Calories
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="caption">
                      {getRecommendedCalories()} per day
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="body2">
                      Recommended Body Weight
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="caption">
                      {((height * height * 21) / 10000).toFixed(2)} kg
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="body2">Recommended Deit</Typography>
                  </td>
                  <td>
                    <Typography variant="caption">
                      {getRecommendedDiet()}
                    </Typography>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMI;
