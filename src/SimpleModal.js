import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring";
import Button from "@material-ui/core/Button";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

// styling is specific to material-ui, so styles declared here
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    margin: "auto"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    background: "#84b4db",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: theme.spacing(2, 4, 3),
    opacity: 0.85
  },
  button: {
    fontSize: "20px",
    color: "#f06856"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    width: "800px",
    height: "60px",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center"
  },
  stepper: {
    borderRadius: 3,
    padding: 15,
    color: "#c92510",
    textAlign: "right",
    background: "#c5e4fc"
  }
}));

function getSteps() {
  return [
    "Chose a category from the drop down.",
    "Click on the category you just chose!",
    "Enjoy your generated picture!"
  ];
}
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.";
    case 1:
      return "Hint: To navigate, just scroll up and down!";
    case 2:
      return "An ad group contains one or more ads which target a shared set of keywords.";
    default:
      return null;
  }
}

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    config: { duration: 500 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function SimpleModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen} className={classes.button}>
        Help
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.root}>
            <h2 id="spring-modal-title">Help</h2>
            <p id="spring-modal-description">
              <div className={classes.stepper}>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  className={classes.stepper}
                >
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {activeStep === steps.length ? (
                    <div>
                      <Typography className={classes.instructions}>
                        You're all set!
                      </Typography>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Typography className={classes.instructions}>
                        {getStepContent(activeStep)}
                      </Typography>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.backButton}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
