import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Avatar, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import moment from "moment";

const Posts = ({}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "30% 70%", // set explicit column widths
        gridTemplateRows: "auto", // set the row height to auto
        gap: "1rem",
        "@media screen and (max-width: 800px)": {
          gridTemplateColumns: "repeat(auto-fit, minmax(100%, 1fr))",
        },
      }}
    >
      {/* Post Left */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Summary />
      </Box>
      {/* Post Right */}
      <Box
        sx={{
          width: "70%",
        }}
      >
        Rigtht
        {Array.from({ length: 100 }).map((_, i) => (
          <p key={i}>{i}</p>
        ))}
      </Box>
    </Box>
  );
};

Posts.propTypes = {};

export default Posts;

const Summary = () => {
  const theme: any = useTheme();

  const ProffesionalSummary = () => {
    return (
      <Box
        sx={{
          bgcolor: theme.colors.textBackground2,
          p: 1,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            Proffesional Summary
          </Typography>
          <Box>
            <IconButton size="small">
              <AddRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body2">
          Experienced software engineer skilled in Agile, Java, Python, and C++.
          Passionate about delivering top-quality software products that meet
          business needs.
        </Typography>
      </Box>
    );
  };
  const WorkExperience = () => {
    return (
      <Box
        sx={{
          bgcolor: theme.colors.textBackground2,
          p: 1,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            Work Experience
          </Typography>
          <Box>
            <IconButton size="small">
              <AddRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <CardWithAvatarAndDate
          title={"Advanced ICT Trainer"}
          subTitle="Solidarity Initiative For Refugees"
          avatarSrc="https://media.licdn.com/dms/image/C4D0BAQHe8fL22aVodQ/company-logo_100_100/0/1582888548679?e=1689206400&v=beta&t=Nzog9TlPB8ENkGEplWXt1OfB6MEplO9t0rc0cF1KzlQ"
          startDate={new Date("11/01/2023")}
          endDate={new Date("11/01/2025")}
        />
        <CardWithAvatarAndDate
          title={"Advanced ICT Trainer"}
          subTitle="Solidarity Initiative For Refugees"
          avatarSrc="https://media.licdn.com/dms/image/C4D0BAQHe8fL22aVodQ/company-logo_100_100/0/1582888548679?e=1689206400&v=beta&t=Nzog9TlPB8ENkGEplWXt1OfB6MEplO9t0rc0cF1KzlQ"
          startDate={new Date("11/01/2023")}
          endDate={new Date("11/01/2025")}
        />
      </Box>
    );
  };
  const EducationAndCertificates = () => {
    return (
      <Box
        sx={{
          bgcolor: theme.colors.textBackground2,
          p: 1,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            Education and Certificates
          </Typography>
          <Box>
            <IconButton size="small">
              <AddRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <CardWithAvatarAndDate
          title={"University of the People"}
          subTitle="BS Computer Science, Front end engineer"
          avatarSrc="https://th.bing.com/th/id/R.07095f38f56b752bd8ff8a159f634478?rik=N%2fu22PtUr2kf9A&pid=ImgRaw&r=0"
          startDate={new Date("11/01/2020")}
          endDate={new Date("11/01/2025")}
        />
      </Box>
    );
  };
  return (
    <Box
      sx={{
        bgcolor: theme.colors.background1,
        p: 1,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 0.5,
        }}
      >
        Summary
      </Typography>
      {/* Proffesional Summary */}
      <ProffesionalSummary />
      <br />
      {/* Work Experience  */}
      <WorkExperience />
      <br />
      {/* Education And Certificates */}
      <EducationAndCertificates />
    </Box>
  );
};

interface CardWithAvatarAndDateProps {
  title: string;
  subTitle: string;
  avatarSrc: string;
  startDate: Date;
  endDate: Date;
}

const CardWithAvatarAndDate = ({
  title,
  subTitle,
  avatarSrc,
  startDate,
  endDate,
}: CardWithAvatarAndDateProps) => {
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));
  const years = duration.years();
  const months = duration.months();
  const formattedDuration = `${years} years and ${months} months`;
  const theme: any = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        boxShadow: 1,
        mt: 3,
        borderRadius: 2,
        bgcolor: theme.colors.textBackground2,
        p:1
      }}
    >
      <Avatar
        src={avatarSrc}
        sx={{
          height: 50,
          width: 50,
        }}
      >
        {title[0]}
      </Avatar>
      <Box>
        <Typography variant="body1"> {title} </Typography>
        <Typography variant="body2"> {subTitle} </Typography>
        <Typography variant="caption">
          {moment(startDate).format("MMMM YYYY")}
          {` `}&middot; {moment(endDate).format("MMMM YYYY")}
        </Typography>
        <br />
        <Typography variant="caption">{formattedDuration}</Typography>
      </Box>
    </Box>
  );
};
