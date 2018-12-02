import React, { Component } from "react";
import {
  Grid,
  Paper,
  withStyles,
  CircularProgress,
  Button
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { fetchAuthToken } from "../actions/authActions";
import {
  fetchPlanets,
  fetchVehicles,
  findFalcone
} from "../actions/fetchActions";
import {
  incrementVehicleCount,
  decrementVehicleCount,
  updateTotalSearchTime
} from "../actions/updateActions";
import PlanetShipSelection from "./PlanetShipSelection";

const styles = () => ({
  root: {
    height: "inherit",
    overflow: "auto"
  }
});

class MissionControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      vehicles: [],
      selectedPlanets: ["", "", "", ""],
      selectedVehicles: ["", "", "", ""],
      error: ""
    };
  }

  componentDidMount() {
    this.props.fetchAuthToken();
    this.props.fetchPlanets();
    this.props.fetchVehicles();
    this.props.updateTotalSearchTime(0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.planets && nextProps.vehicles) {
      this.setState({
        planets: nextProps.planets,
        vehicles: nextProps.vehicles
      });
    }
  }

  onPlanetChange = (e, combination) => {
    const { selectedPlanets } = this.state;

    if (selectedPlanets && selectedPlanets.length) {
      const newSelectedPlanets = selectedPlanets.map(
        (selectedPlanet, planetIndex) => {
          if (planetIndex === combination - 1) {
            return e.value;
          } else {
            return selectedPlanet;
          }
        }
      );
      this.setState(
        {
          selectedPlanets: newSelectedPlanets
        },
        () => this.calculateTravelTime()
      );
    }
  };

  onVehicleCountUpdate = (
    vehicleName,
    isChecked,
    prevSelectedVehicle,
    combination
  ) => {
    const { incrementVehicleCount, decrementVehicleCount } = this.props;
    const { selectedVehicles } = this.state;

    if (selectedVehicles && selectedVehicles.length) {
      const newSelectedVehicles = selectedVehicles.map(
        (selectedVehicle, vehicleIndex) => {
          if (vehicleIndex === combination - 1) {
            return vehicleName;
          } else {
            return selectedVehicle;
          }
        }
      );
      this.setState(
        {
          selectedVehicles: newSelectedVehicles
        },
        () => this.calculateTravelTime()
      );
    }

    if (isChecked) {
      decrementVehicleCount(vehicleName);
      if (prevSelectedVehicle) {
        incrementVehicleCount(prevSelectedVehicle);
      }
    } else {
      incrementVehicleCount(vehicleName);
    }
  };

  calculateTravelTime = () => {
    const { planets, vehicles, selectedPlanets, selectedVehicles } = this.state;
    let travelTime = 0;
    for (let i = 0; i < selectedPlanets.length; i++) {
      if (selectedPlanets[i] !== "" && selectedVehicles[i] !== "") {
        travelTime +=
          planets.filter(planet => planet.name === selectedPlanets[i])[0]
            .distance /
          vehicles.filter(vehicle => vehicle.name === selectedVehicles[i])[0]
            .speed;
      }
    }

    this.props.updateTotalSearchTime(travelTime);
  };

  resetFilters = combination => {
    //If only a certain planet and vehicle combo is beign reset
    if (combination) {
      this.onVehicleCountUpdate(
        this.state.selectedVehicles[combination - 1],
        false,
        "",
        combination
      );

      this.setState(prevState => ({
        selectedVehicles: prevState.selectedVehicles.map(
          (selectedVehicle, index) => {
            if (index === combination - 1) {
              return "";
            } else {
              return selectedVehicle;
            }
          }
        )
      }));
    } else {
      for (var i = 0; i < this.state.selectedVehicles.length; i++) {
        this.onVehicleCountUpdate(
          this.state.selectedVehicles[i],
          false,
          "",
          i + 1
        );
      }

      //Only resetting the vehicle filters
      this.setState({
        selectedVehicles: ["", "", "", ""]
      });
    }
  };

  onSubmitData = () => {
    this.props.findFalcone(
      {
        token: this.props.token,
        planet_names: this.state.selectedPlanets,
        vehicle_names: this.state.selectedVehicles
      },
      this.props.history
    );
  };

  render() {
    const { planets, vehicles, selectedPlanets, selectedVehicles } = this.state;
    const { classes, totalSearchTime, errorText } = this.props;
    return (
      <div style={{ height: "inherit", marginTop: "20px" }}>
        <Paper
          className={classes.root}
          style={{
            background: "linear-gradient(45deg, #FDC830 30%, #F37335 90%)"
          }}
        >
          {planets.length && vehicles.length ? (
            <Grid container justify="center">
              <Grid item xs={12}>
                <h2 style={{ color: "white" }} align="center">
                  Select planets you wish to search in:
                </h2>
              </Grid>
              {selectedPlanets.map((selectedPlanet, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  md={6}
                  lg={2}
                  style={{ margin: "15px" }}
                >
                  <h3 style={{ color: "white" }} align="center">
                    Destination {index + 1}
                  </h3>
                  <PlanetShipSelection
                    currentPlanet={selectedPlanet}
                    currentVehicle={selectedVehicles[index]}
                    selectedPlanets={selectedPlanets}
                    onPlanetChange={this.onPlanetChange}
                    onVehicleCountUpdate={this.onVehicleCountUpdate}
                    resetFilters={this.resetFilters}
                    combination={index + 1}
                  />
                </Grid>
              ))}
              <Grid item xs={12} md={6} lg={2} style={{ marginTop: "55px" }}>
                <h2 style={{ color: "white" }} align="center">
                  Time taken : {totalSearchTime || 0}
                </h2>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  textAlign: "center"
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmitData.bind(this)}
                >
                  Find Falcone!
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  textAlign: "center"
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={
                    selectedVehicles.filter(
                      selectedVehicle => selectedVehicle.length > 0
                    ).length
                      ? false
                      : true
                  }
                  onClick={this.resetFilters.bind(this, "")}
                >
                  Reset Filters
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container justify="center">
              <Grid item style={{ marginTop: "15px" }}>
                {errorText ? (
                  <h2 style={{ color: "white" }} align="center">
                    Please check your network and try again.
                  </h2>
                ) : (
                  <CircularProgress color="secondary" />
                )}
              </Grid>
            </Grid>
          )}
        </Paper>
      </div>
    );
  }
}

MissionControl.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  totalSearchTime: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  fetchAuthToken: PropTypes.func.isRequired,
  fetchPlanets: PropTypes.func.isRequired,
  fetchVehicles: PropTypes.func.isRequired,
  incrementVehicleCount: PropTypes.func.isRequired,
  decrementVehicleCount: PropTypes.func.isRequired,
  updateTotalSearchTime: PropTypes.func.isRequired,
  findFalcone: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  planets: state.mainReducer.planets,
  vehicles: state.mainReducer.vehicles,
  totalSearchTime: state.timeReducer.totalSearchTime,
  token: state.authReducer.token,
  errorText: state.errorReducer.errorText
});

export default connect(
  mapStateToProps,
  {
    fetchAuthToken,
    fetchPlanets,
    fetchVehicles,
    incrementVehicleCount,
    decrementVehicleCount,
    updateTotalSearchTime,
    findFalcone
  }
)(
  compose(
    withStyles(styles),
    withRouter
  )(MissionControl)
);
