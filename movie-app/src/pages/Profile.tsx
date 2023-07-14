import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";

type ProfileData = {
  firstName: string;
  secondName: string;
  gender: string;
};

function saveProfileData(data: ProfileData) {
  localStorage.setItem("profile-data", JSON.stringify(data));
}

function loadProfileData(): ProfileData | null {
  const data = localStorage.getItem("profile-data");
  if (data) {
    return JSON.parse(data) as ProfileData;
  } else {
    return null;
  }
}

const Profile = () => {
  const [gender, setGender] = useState("female");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileData>();

  const onSubmit: SubmitHandler<ProfileData> = (data) => saveProfileData(data);

  useEffect(() => {
    const data = loadProfileData();
    if (data) {
      setValue("firstName", data.firstName);
      setValue("secondName", data.secondName);
      setValue("gender", data.gender);
      setGender(data.gender);
    }
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Профиль</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 5 }}>
        <FormControl component="fieldset" sx={{ "& > *": { mt: 1 } }}>
          <FormGroup>
            <TextField
              error={errors.firstName ? true : false}
              helperText="Обязательное поле"
              autoComplete="given-name"
              label="Имя"
              variant="outlined"
              {...register("firstName")}
            />
          </FormGroup>
          <FormGroup>
            <TextField
              error={errors.secondName ? true : false}
              helperText="Обязательное поле"
              autoComplete="family-name"
              label="Фамилия"
              variant="outlined"
              {...register("secondName", { required: true })}
            />
          </FormGroup>
          <RadioGroup
            row
            value={gender}
            onChange={(e) => {
              setValue("gender", e.target.value);
              setGender(e.target.value);
            }}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Женщина"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Мужчина"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Другое"
            />
          </RadioGroup>
          <FormGroup>
            <Button variant="contained" type="submit">
              Сохранить
            </Button>
          </FormGroup>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Profile;
