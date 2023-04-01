import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { deleteTeamById } from "../../../services/teams";
import { removeTeamFromTeamsById } from "../../../Redux/slices/team";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
    sx={{}}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    backgroundColor: theme.colors.background1,
    // blur
    backdropFilter: "blur(10px)",
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function TeamMenuOption({ teamId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const user = userStore ? userStore.user : null;
  const router = useRouter();
  const token = user ? user.token : null;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //   For Delete Team
  const [openConfirmDialoge, setOpenConfirmDialoge] = React.useState(false);
  const [confirmDeleteValue, setConfirmDeleteValue] = React.useState("");
  const handleClickOpenConfirmDialoge = () => {
    setOpenConfirmDialoge(true);
  };

  const handleCloseConfirmDialoge = () => {
    setOpenConfirmDialoge(false);
    setAnchorEl(null);
  };

  const confirmDeleteValueOnChangeHandler = (e) => {
    setConfirmDeleteValue(e.target.value);
  };

  //   Delete Team By Id handler
  const deleteTeamByIdHandler = async () => {
    console.log("teamId", teamId);
    console.log("Token", token);
    if (confirmDeleteValue === "delete team") {
      const status = await deleteTeamById(token, teamId);
      if (status === 204) {
        dispatch(removeTeamFromTeamsById(teamId));
        router.push("/chats/t");
      } else {
        console.log("Error in deleting team", status);
      }
    } else {
      alert("Please Type 'delete team' to delete the team");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple onClick={handleClickOpenConfirmDialoge}>
          <DeleteForeverIcon />
          Delete Team
        </MenuItem>
      </StyledMenu>
      <ConfirmDeleteTeam
        confirmDeleteValueOnChangeHandler={confirmDeleteValueOnChangeHandler}
        confirmDeleteValue={confirmDeleteValue}
        handleCloseConfirmDialoge={handleCloseConfirmDialoge}
        openConfirmDialoge={openConfirmDialoge}
        deleteTeamByIdHandler={deleteTeamByIdHandler}
      />
    </div>
  );
}

function ConfirmDeleteTeam({
  openConfirmDialoge,
  deleteTeamByIdHandler,
  handleCloseConfirmDialoge,
  confirmDeleteValue,
  confirmDeleteValueOnChangeHandler,
}) {
  return (
    <div>
      <Dialog open={openConfirmDialoge}>
        <DialogTitle>Delete Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete this team <br />
            please type delete team in the box below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="delete team"
            type="text"
            fullWidth
            variant="filled"
            value={confirmDeleteValue}
            onChange={confirmDeleteValueOnChangeHandler}
            sx={{
              // fonst style to be italic
              "& .MuiFilledInput-input": {
                fontStyle: "italic",
              },
              //   label style to be italic
              "& .MuiInputLabel-root": {
                fontStyle: "italic",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseConfirmDialoge}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              "&:hover": {
                backgroundColor: "#f44336",
              },
              fontStyle: "italic",
            }}
            onClose={handleCloseConfirmDialoge}
            onClick={deleteTeamByIdHandler}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
