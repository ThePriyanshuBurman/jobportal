import React, { useState, useEffect, useContext } from "react";
import {
    Button,
    Chip,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    Modal,
    Slider,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Checkbox,
    makeStyles,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import axios from "axios";
import apiList from "../lib/apiList";

import { SetPopupContext } from "../App";

const useStyles = makeStyles((theme) => ({
    popupDialog: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2/3",
    },
}));

const FilterPopup = (props) => {
    const classes = useStyles();
    const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
    return (
        <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
            <Paper style={{ padding: "50px", outline: "none", width: "60%" }}>
                <Grid container direction="column" spacing={3}>
                    <Grid item container alignItems="center">
                        <Grid item xs={3}>
                        <Typography style={{ color: 'blue' }}>Job Type</Typography>
                        </Grid>
                        <Grid container item xs={9} >
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="fullTime"
                                            checked={searchOptions.jobType.fullTime}
                                            onChange={(event) =>
                                                setSearchOptions({
                                                    ...searchOptions,
                                                    jobType: {
                                                        ...searchOptions.jobType,
                                                        [event.target.name]: event.target.checked,
                                                    },
                                                })
                                            }
                                        />
                                    }
                                    label="Full Time"
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="partTime"
                                            checked={searchOptions.jobType.partTime}
                                            onChange={(event) =>
                                                setSearchOptions({
                                                    ...searchOptions,
                                                    jobType: {
                                                        ...searchOptions.jobType,
                                                        [event.target.name]: event.target.checked,
                                                    },
                                                })
                                            }
                                        />
                                    }
                                    label="Part Time"
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="wfh"
                                            checked={searchOptions.jobType.wfh}
                                            onChange={(event) =>
                                                setSearchOptions({
                                                    ...searchOptions,
                                                    jobType: {
                                                        ...searchOptions.jobType,
                                                        [event.target.name]: event.target.checked,
                                                    },
                                                })
                                            }
                                        />
                                    }
                                    label="Work From Home"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item alignItems="center" spacing={5}>
                        <Grid item xs={3}>
                        <Typography style={{ color: 'blue' }}>Salary</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Slider
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => value * (100000 / 100)}
                                marks={[
                                    { value: 0, label: "0" },
                                    { value: 100, label: "100000" },
                                ]}
                                value={searchOptions.salary}
                                onChange={(_, value) =>
                                    setSearchOptions({ ...searchOptions, salary: value })
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container item alignItems="center" spacing={10}>
                        <Grid item xs={3}>
                        <Typography style={{ color: 'blue' }}>Duration</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                select
                                label="Duration"
                                variant="outlined"
                                fullWidth
                                value={searchOptions.duration}
                                onChange={(event) =>
                                    setSearchOptions({
                                        ...searchOptions,
                                        duration: event.target.value,
                                    })
                                }
                            >
                                <MenuItem value="0">All</MenuItem>
                                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container item alignItems="center">
                        <Grid item xs={3}>
                        <Typography style={{ color: 'blue' }}>Sort</Typography>
                        </Grid>
                        <Grid item container xs={12} spacing={2}>
                            {Object.entries(searchOptions.sort).map(([key, value]) => (
                                <Grid key={key} item xs={4}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={value.status}
                                                onChange={(event) =>
                                                    setSearchOptions({
                                                        ...searchOptions,
                                                        sort: {
                                                            ...searchOptions.sort,
                                                            [key]: {
                                                                ...value,
                                                                status: event.target.checked,
                                                            },
                                                        },
                                                    })
                                                }
                                            />
                                        }
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                    />
                                    <IconButton
                                        disabled={!value.status}
                                        onClick={() =>
                                            setSearchOptions({
                                                ...searchOptions,
                                                sort: {
                                                    ...searchOptions.sort,
                                                    [key]: {
                                                        ...value,
                                                        desc: !value.desc,
                                                    },
                                                },
                                            })
                                        }
                                    >
                                        {value.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                    </IconButton>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={getData}
                            style={{ marginTop: "20px" }}
                        >
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    );
};
export  default FilterPopup;
