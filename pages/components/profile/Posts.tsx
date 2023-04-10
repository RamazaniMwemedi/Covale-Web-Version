import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import Image from "next/image";
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
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            mb: 0.5,
          }}
        >
          Proffesional Summary
        </Typography>

        <Typography variant="body2">
          Experienced software engineer skilled in Agile, Java, Python, and C++.
          Passionate about delivering top-quality software products that meet
          business needs.
        </Typography>
      </Box>
    );
  };
  const WorkExperience = () => {
    interface ExperienceProps {
      title: string;
      organizationName: string;
      organizationProfilePic: string;
      dateStarted: Date;
      dateStopped: Date;
    }

    const Experience = ({
      title,
      organizationName,
      organizationProfilePic,
      dateStarted,
      dateStopped,
    }: ExperienceProps) => {
      const duration = moment.duration(
        moment(dateStopped).diff(moment(dateStarted))
      );

      const years = duration.years();
      const months = duration.months();

      const formattedDuration = `${years} years and ${months} months`;
      return (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            p: 0.3,
          }}
        >
          <Avatar
            src={organizationProfilePic}
            sx={{
              height: 70,
              width: 70,
            }}
          >
            {organizationName[0]}
          </Avatar>
          <Box>
            <Typography variant="body1"> {title} </Typography>
            <Typography variant="body2"> {organizationName} </Typography>
            <Typography variant="caption">
              {moment(dateStarted).format("MMMM YYYY")}
              {` `}&middot; {moment(dateStopped).format("MMMM YYYY")}
            </Typography>
            <br />
            <Typography variant="caption">{formattedDuration}</Typography>
          </Box>
        </Box>
      );
    };
    return (
      <Box
        sx={{
          bgcolor: theme.colors.textBackground2,
          p: 1,
          borderRadius: 2,
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

        <Experience
          title={"Advanced ICT Trainer"}
          organizationName="Solidarity Initiative For Refugees"
          organizationProfilePic="https://media.licdn.com/dms/image/C4D0BAQHe8fL22aVodQ/company-logo_100_100/0/1582888548679?e=1689206400&v=beta&t=Nzog9TlPB8ENkGEplWXt1OfB6MEplO9t0rc0cF1KzlQ"
          dateStarted={new Date("11/01/2023")}
          dateStopped={new Date("11/01/2025")}
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
    </Box>
  );
};
