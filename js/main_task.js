/**************/
/** Constants */
/**************/
const nrating = 49;
const nchoices = 100;
const fixation_duration = 500;
const nprac = 3;
const nImageInst = 2;
const debugModeCaliDot = 1;
const realCaliDot = 12;


var subject_id = jsPsych.randomization.randomID(7);

/** load all the images, and remember to preload before starting the experiment */
var exp_images = [];
for (var i = 0; i < nrating; i++) {
  exp_images.push('img/charityStimuli/charityStimulus_' + i + '.jpg');
}




/** load all the images, and remember to preload before starting the egitxperiment */
var instruct_img = [];
for (var i = 0; i < nImageInst; i++) {
  instruct_img.push('img/instruct' + i + '.png');
}


var prac_img = [];
for (var i = 1; i <= 4; i++) {
  prac_img.push('img/pracImg/prac' + i + '.jpg');
}

var issue_img = [];
for (var i =0; i< 4;i++){
  issue_img.push('img/issue'+(i+1)+'.jpg');
}


var charity_choice_images = []; // one-d array
var charity_choice_images_zero = []
var charity_real_pairs;
var charity_prac_pairs;

var get_prac_images = function () {
  var allcom = Combinatorics.combination(prac_img, 2);
  var multi_choice_temp = []
  while (temp = allcom.next()) {
    multi_choice_temp.push(jsPsych.randomization.shuffle(temp));
  }
  return utils.getRandomSample(multi_choice_temp, 3);

};



//  var get_multichoice_images = function () {
//      var multi_choice_temp = [];
//      for (var i = 0; i < 100; i++) {
//        sample = jsPsych.randomization.sampleWithoutReplacement(charity_choice_images_zero, 2);
//        multi_choice_temp.push(sample);
//       }
//       console.log(multi_choice_temp);
//       return multi_choice_temp;
//     }

// var exp_images = [];
// for (var i = 0; i < 100; i++) {
//   exp_images.push('../img/FoodImages/foodStimulus_' + i + '.jpg');
// }

const combinations = ([head, ...tail]) => tail.length > 0 ? [...tail.map(tailValue => [head, tailValue]), ...combinations(tail)] : []
var get_multichoice_images = function () {
  multi_choice_temp = combinations(charity_choice_images_zero);
  shuffled_multi_choice_temp = jsPsych.randomization.repeat(multi_choice_temp, 1);
  randsamples = jsPsych.randomization.sampleWithoutReplacement(shuffled_multi_choice_temp, 100);
  console.log(randsamples)
  return randsamples
}



function makeSurveyCode(status) {
  uploadSubjectStatus(status);
  var prefix = {'success': 'cg', 'failed': 'sb'}[status]
  return `${prefix}${subject_id}`;
}

function uploadSubjectStatus(status) {
  $.ajax({
    type: "POST",
    url: "/subject-status",
    data: JSON.stringify({subject_id, status}),
    contentType: "application/json"
  });
}



/***********************/
/******** Trials *******/
/***********************/



/** full screen */
var fullscreenEnter = {
  type: 'fullscreen',
  message: `<div> Before we begin, please close any unnecessary programs or applications on your computer. <br/>
  This will help the study run more smoothly.    <br/>
   Also, please close any browser tabs that could produce popups or alerts that would interfere with the study.    <br/>
   Finally, once the study has started, <b>DO NOT EXIT</b>fullscreen mode or you will terminate the study and not receive any payment. <br/>   
  <br><br/>
  The study will switch to full screen mode when you press the button below.  <br/>
  When you are ready to begin, press the button.</div>`,
  fullscreen_mode: true,
  on_finish: function () {
    document.body.style.cursor = 'none'
  }
};

var page3 = {
  type: 'html-keyboard-response',
  stimulus: 'In today\'s study we will show you proposed laws that will be implemented. <br>\n' +
      '            There are two versions of the laws that can be implement. <br>\n' +
      '            You will one version that you think should be implemented. <br><br>\n' +
      '            You will use the <b>space bar</b> and <b>arrow keys</b> on your keyboard <br><br>\n' +
      '            When you are ready, press the <b>space bar</b> to begin. <br>\n' +
      '        </div><br><br><br><br>',

  choices: ['spacebar'],
  on_finish: function () {
    //jsPsych.data.displayData('csv')
  }
}

var page4 = {
  type: 'html-keyboard-response',
  stimulus: 'In this study you will be shown a series of different policy proposals.<br>'+
      'You will be asked to choose which among two proposals the option you prefer the most.<br><br><br>'+
      'For example, consider this proposal:<br>'+
      '\"The minimum drinking age will be ___________."<br><br><br>'+
      'The blank line can either completed with two options that will be presented on the next screen.<br><br><br>'+
      'When you are done reading the proposed law, please press the <b>SPACE BAR</b>.',
  post_trial_gap: 500,
  choices: ['spacebar'],
}

var page5 = {
  type: 'html-keyboard-response',
  stimulus:'<div>' +
      '<img height="481px" width="1430px" src="img/instruct4.png" ><br/>' +
      '<br><br><br>' +
      'Above, you can see the two options that you will choose from.<br><br>' +
      'If think that the minimum drinking age should be "16", then you should press the <b>LEFT ARROW KEY ( <- )</b><br>' +
      'If think that the minimum drinking age should be "18", then you should press the <b>RIGHT ARROW KEY ( -> )</b><br><br>' +
      'After each choice, make sure to stare at the red circles that will appear on the screen until they disappear.<br><br>' +
      'When you are ready, press the <b>SPACE BAR</b> to continue</div>',
  post_trial_gap: 500,
  choices: ['spacebar'],
}

var eyeTrackingInstruction1 = {
  type: 'html-keyboard-response',
  stimulus: `<div> <font size=120%; font color = 'green';>Calibration & Validation </font><br/>
                                             <br><br/>
                Before we begin with the study, we need to turn on and adjust your webcam for eye-tracking.   <br/>
                
                There are two parts to this process. The first part is calibration and the second part is validation.<br/>
                <br><br/>
                During calibration, you will see a series of dots like this <span id="calibration_dot_instruction"></span> appear on the screen, each for 3 seconds.<br/>
                Your task is simply to stare directly at each dot until it disappears.<br/>
                Then, quickly move your eyes to the next dot and repeat.<br/>
                <br><br/>
                Validation is basically the same as calibration. You simply need to stare at each dot until it turns <b><font color='green'>green</font></b> and disappears.<br/>
                During validation, the dot may turn <b><font color='yellow'>yellow</font></b>, indicating that you don't seem to be staring directly at it.  <br/>
                Try to keep this from happening! 
                <br><br/>
                When you are ready, press the SPACE BAR to continue. </div>`,
  post_trial_gap: 500,
  choices: ['spacebar'],

}

var eyeTrackingInstruction2 = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Calibration & Validation </font><br/>
                                                                          <br><br/>
      When the calibration begins, you will see a video feed with your face at the top left corner of your screen like this:  <br/>
        <br><br/>
         <img height="220px" width="270px" src="${instruct_img[0]}"><br/>
       <br><br/>
                         Try to keep your entire face within the box. When your face is in a good position, the box will turn <b><font color='green'>green</font></b>. <br/>
                         <font size=5px; font color = 'red';> <b>NOTE</b>: the video feed only appears during calibration.</font><br/>
                         <br><br/>
                         <font size=5px; >When you are ready, press the  <b>SPACE BAR</b> to continue.</font>
              
                         </div>`,
  post_trial_gap: 500,
  choices: ['spacebar'],

}

var eyeTrackingNote = {

  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';> Calibration & Validation</font><br/>
                                                                          <br><br/>
             <font size = 5px font color = "yellow">There are several <b>IMPORTANT</b> tips that are useful for passing the calibration task:<br/></font>
             <img height="200px" width="1000px" src="${instruct_img[1]}"><br/>
             <br><br/>
             <div style="text-align-last:left">
            In addition to the tips in the figure: <br/>
            (1). Use your eyes to look around the screen and try to avoid moving your head. <br/>
            (2). Try to keep lights in front of you rather than behind you so that the webcam can clearly see your face. Avoid sitting with a window behind you. <br/>
            (3). After you have made these adjustments, check again that your face fits nicely within the box on the video feed and that the box is green. <br/></div>
             <br><br/>
             <font size=5px; font color = 'red';> <b>NOTE</b>:  <br/>
            If you are back on this page, it means the calibration and validation did not work as well as we would like.  <br/>
            Please read the tips above again, make any adjustments, and try again.  <br/>
            There are only <b>THREE</b> chances to get this right.  <br/>
            Otherwise, the study cannot proceed and you will only receive 50 cents for participating.  </font><br/>
            <br><br/>
             <font size=5px; >When you are ready, press the <b>SPACE BAR</b> to bring up the video feed and make these adjustments. </font></div>`,
  post_trial_gap: 500,
  choices: ['spacebar'],

}


//eye tracking parameters
var calibrationMax = 3;
var calibrationAttempt = 0;
var success = false; //update if there's a success
var eye_calibration_state = {
  doInit: true
};

var init_flag = function () {
  if (calibrationAttempt == 0) {
    return true;
  } else return false;
};

var validationTols = [130, 165, 200];
var validationAccuracys = [0.8, 0.7, 0.6];

/** first we need a calibration and validation step before entering into the main choice task */
var inital_eye_calibration = {
  timeline: [
    eyeTrackingNote,
    {
      type: "eye-tracking",
      doInit: () => init_flag(),
      doCalibration: true,
      doValidation: true,
      calibrationDots:  realCaliDot , // change to 12
      calibrationDuration: 3, //change to 5
      doValidation: true,
      validationDots:  realCaliDot , //change to 12
      validationDuration: 2,
      validationTol: validationTols[calibrationAttempt],
      // showPoint: true,
      on_finish: function (data) {
        console.log(JSON.parse(data.validationPoints)[0].hitRatio == null);
       if(JSON.parse(data.validationPoints)[0].hitRatio == null) {
        jsPsych.endExperiment('The study has ended. You may have exited full screen mode, or your browser may not be compatible with our study.');
       } else {
        calibrationAttempt++;
        //alert(data.accuracy)
        if (data.accuracy >= validationAccuracys[calibrationAttempt - 1]) success = true;
        if (!success && calibrationAttempt == calibrationMax) {
          survey_code = makeSurveyCode('failed');
          closeFullscreen();
          jsPsych.endExperiment(`Sorry, unfortunately the webcam calibration has failed.  We can't proceed with the study.  </br> You will receive 50 cents for making it this far. Your survey code is: ${survey_code}. Thank you for signing up!` );
        }
       }
      }
    }
  ],
  loop_function: () => (calibrationAttempt < calibrationMax) && (!success),
};




var experimentOverview = {
  type: 'html-keyboard-response',
  on_start: function () {
    webgazer.pause(),
        webgazer.clearData()
  },
  stimulus: `<div> 
                         Success! The calibration and validation were successful. <br/>
                          When you are ready, press the  <b>SPACE BAR</b> to continue. </div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}

var test1a = {
  type: 'html-keyboard-response',
  stimulus: `<img height="770px" width="1026px" src="${issue_img[0]}">`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}
var test1b = {
  type: 'html-keyboard-response',
  stimulus: `<img height="770px" width="1280px" src="${issue_img[1]}">`,
  choices: ['leftarrow','rightarrow'],
  post_trial_gap: 500,
}

var test2a = {
  type: 'html-keyboard-response',
  stimulus: `<img height="770px" width="1026px" src="${issue_img[2]}">`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}
var test2b = {
  type: 'html-keyboard-response',
  stimulus: `<img height="770px" width="1280px" src="${issue_img[3]}">`,
  choices: ['leftarrow','rightarrow'],
  post_trial_gap: 500,
}



var recalibrationInstruction = {
  type: "html-keyboard-response",
  on_start: function ()  {
    webgazer.resume(),
   document.body.style.cursor = 'none'
  },
  stimulus: `<div>We need to redo the calibration and validation before you begin with the choice task. </br>
   As before, make sure you stare at each dot until it disappears and make sure you don’t move your head.</br>
   <br></br>
   Please press <b>SPACE BAR</b> when you are ready to begin.</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
};

var recalibration = {
  timeline: [
    recalibrationInstruction,
    {
      type: "eye-tracking",
      doCalibration: true,
      calibrationDots: realCaliDot, // change to 12
      calibrationDuration: 3,
      doValidation: true,
      validationDots: realCaliDot,// change to 12
      validationDuration: 2,
      validationTol: 200
    }
  ],
};



var choiceInstructionReinforce = {
  type: 'html-keyboard-response',
  stimulus: `<div><font size=120%; font color = 'green';>Food preference</font><br/>
                                        <br><br/>
       Now, we will begin with the choice task. Please keep your head still, otherwise we may have to redo the calibration and validation.<br/>
       There will be a break halfway through the task. During the break you can move your head if you need to.    <br/>
       As a quick reminder, you are choosing which food you would prefer to eat: <br/>
       If you want to eat to the left food,  press  the <b><font color='green'>LEFT ARROW (<-)</font></b> key; <br/>
       If you want to eat to the right food,  press the <b><font color='green'>RIGHT ARROW (->)</font></b>  key;<br/>
                  <br><br/>
       After each choice, make sure to stare at the red circles that will appear on the screen, until they disappear.  <br/>
       This is part of ongoing adjustments to the eye-tracking.    <br/>
       <br><br/>
       NOTE: If the computer thinks that you are looking somewhere other than directly at the red dot,   <br/>
       you may need to redo the calibration and validation process, slowing down the study.   <br/>
                                               <br><br/>
      When you are ready, press the <b>SPACE BAR</b> to begin with a couple of practice rounds. </div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
  on_finish: function() {
    charity_prac_pairs=get_prac_images();
    charity_real_pairs= get_multichoice_images();
  
  } 
}


/** practice choices */
var fixation1 = {
  type: 'html-keyboard-response',
  on_start: () => document.body.style.cursor = 'none',
  stimulus: '<span id="calibration_dot_instruction"></span>',
  choices: jsPsych.NO_KEYS,
  trial_duration: fixation_duration,
};


var charity_prac_choice_count = 0;
var charity_prac_choice = {
  timeline: [
    fixation1,
    {
      type: "binary-choice",
      stimulus: () => charity_prac_pairs[charity_prac_choice_count],
      choices: ["leftarrow", "rightarrow"],
      realOrPrac: false,
      on_finish: () => charity_prac_choice_count++,
    }
  ],
  loop_function: () => charity_prac_choice_count < 3,
};

var EnterRealChoice = {
  type: 'html-keyboard-response',
  stimulus: `<div> Now you can move on to the real choices. When you are ready, press the <b>SPACE BAR</b> to begin.</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
}

var binary_choice_states = {
  //set the default 
  doCalibration: false,
  calibrationDots: 10,
  dovalidation: true,
  validationDots: 2
};

var validate_counter = 0;
validationAccuracy = 0.6;

function binary_choice_state_logger(finish_data_accuracy) {
  // ...TODO
  if (finish_data_accuracy >= validationAccuracy) {
    binary_choice_states = {
        doCalibration: false,
        dovalidation: true,
        validationDots: 2
      },
      validate_counter = 0;
  }
  if (finish_data_accuracy < validationAccuracy & validate_counter <= 2) {
    binary_choice_states = {
        doCalibration: false,
        dovalidation: true,
        validationDots: 2
      },
      validate_counter += 1;
  }
  if (validate_counter == 3) {
    binary_choice_states = {
      //set the default 
      doCalibration: true,
      calibrationDots: 12, ///change to 12
      dovalidation: false,
    }
    validate_counter = 0;
  }
};

var binary_state_updater = function () {
  return binary_choice_states;
};



/** choices */
var fixation = {
  type: "eye-tracking",
  doInit: false,
 // doCalibration: () => binary_state_updater().doCalibration,
  doCalibration: false,
  //calibrationDots: () => binary_state_updater().calibrationDots,
 // doValidation: () => binary_state_updater().dovalidation,
  doValidation: true,
 // validationDots: () => binary_state_updater().validationDots,
  validationDots: 3,
  validationTol: 130,
  validationDuration: 2,
//  calibrationDuration: 5,
  on_finish: (data) => binary_choice_state_logger(data.accuracy)
};





var if_node1 = {
  timeline: [fixation],
  conditional_function: function(){
      if(Math.round(charity_choice_count%10) == 0){
          return true;
      } else {
          return false;
      }
  }
}


var if_node2 = {
  timeline: [fixation1],
  conditional_function: function(){
      if(Math.round(charity_choice_count%10) != 0){
          return true;
      } else {
          return false;
      }
  }
}

/** real choice task */
var charity_choice_count = 0;
var charity_choice1 = {
  timeline: [ 
    if_node1,
    if_node2,
    {
      type: "binary-choice",
      on_start: function() {
        //console.log(charity_real_pairs)
      },
      stimulus: () =>   charity_real_pairs[charity_choice_count],
      choices: ["F", "J"],
      on_finish: () => charity_choice_count++,
    }
  ],
  loop_function: () => charity_choice_count < charity_real_pairs.length/2,

};



var breaktime = {
  type: "html-keyboard-response",
  stimulus: `<div>You are halfway done! Now you can take a short break if you want. You can move your head during the break.</br>
             <br></br>
             When you are ready to continue the study, press the <b>SPACE BAR</b>.</div>`,
  choices: ['spacebar'],
  on_start: function () {
    webgazer.pause(),
      webgazer.clearData()
  },
  post_trial_gap: 500,
};

var recalibrationInstruction2 = {
  type: "html-keyboard-response",
  on_start: () => webgazer.resume(),
  stimulus: `<div>We need to redo the calibration and validation before you return to the study.  </br>
  As before, make sure you stare at each dot until it disappears and make sure you don’t move your head.</br>
   <br></br>
   Press the <b>SPACE BAR</b> when you are ready to begin.</div>`,
  choices: ['spacebar'],
  post_trial_gap: 500,
};



var recalibration2 = {
  timeline: [
    recalibrationInstruction2,
    {
      type: "eye-tracking",
      doCalibration: true,
      calibrationDots: realCaliDot, ///change to 12
      calibrationDuration: 3,
      doValidation: true, 
       validationDots:  8, ///change to 6
      validationDuration: 2,
    }
  ],
};


var charity_choice2 = {
  timeline: [
    if_node1,
    if_node2, // change to fixation
    {
      type: "binary-choice",
      stimulus: () => charity_real_pairs[charity_choice_count],
      choices: ["leftarrow", "rightarrow"],
      on_finish: () => charity_choice_count++,
    }
  ],
  loop_function: () => charity_choice_count < charity_real_pairs.length,

};



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// var select_trial = {
//   type: "",
//   charity: [],
//   donation: 5
// }
var randomselector = function () {
  var trials = jsPsych.data.get().filterCustom(function (trial) {
    return trial.rating > 0  || (trial.trial_type == "binary-choice" && trial.realtrial)
  })
  selectedtrialindex = getRandomInt(0, trials.count() - 1);
  selectedtrial = JSON.parse(trials.json())[selectedtrialindex];

  select_trial.type = selectedtrial.trial_type;
 //console.log(JSON.parse(trials.json())[selectedtrialindex]);

  if (select_trial.type === "image-slider-response") {
    select_trial.type = "Willingness to Donate"
    select_trial.donation = selectedtrial.rating;
    select_trial.charity = selectedtrial.stimulus;
  } else {
    select_trial.type = "Donating Preference"
    select_trial.donation = 5;
    if (selectedtrial.key_press == 70) {
      select_trial.charity = selectedtrial.stimulus[0];
    } else {
      select_trial.charity = selectedtrial.stimulus[1];
    }
  }
   html = ` <div> One trial from the <b><font color='red'>${select_trial.type}</font></b> task has been selected for donation! </br>
    The charity you donate to is: </br>
    <br></br>
    <img height="300px" width="500px" src="${select_trial.charity}"/> </br>
     <br></br>
     We will donate  <b><font color='red'>$${select_trial.donation}</font></b> to this charity on your behalf.</br>
     <br></br>
     Thank you for participating! The webcam will turn off when you close the browser tab.</br>
     Your quiz score is ${(quiz_correct_count/5)*100}, we will add ${quiz_correct_count*10} cents to your final payment.</br>
     Your survey code is: ${makeSurveyCode('success')}
     </div>`;
 return html
}


 var successExp = false
 var success_guard = {
   type: 'call-function',
   func: () => {successExp = true}
 }



// // `<p>You have completed the task. The webcam will be closed when you close our browser.</p>`
//  var end = {
//    on_start: () => closeFullscreen(),
//   type: "html-keyboard-response",
//   stimulus: `<div>Thank you for your participation! You can close the browser to end the experiment now. </br>
//                   The webcam will turn off when you close the browser. </br>
//                   Your survey code is: ${makeSurveyCode('success')}. </br>
//                   We will send you $7 as your participant fee soon! </br> </div>`,
  
//  };

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}


var on_finish_callback = function () {
 // jsPsych.data.displayData();
  jsPsych.data.addProperties({
    browser_name: bowser.name,
    browser_type: bowser.version,
    subject: subject_id,
    subject: subject_id,
    interaction: jsPsych.data.getInteractionData().json(),
    //quiz: quiz_correct_count,
    windowWidth: screen.width,
    windowHight: screen.height
  });
  var data = JSON.stringify(jsPsych.data.get().values());
  $.ajax({
      type: "POST",
      url: "/data",
      data: data,
      contentType: "application/json"
    })
    .done(function () {
      // alert("your data has been saved!")
    })
    .fail(function () {
      //alert("problem occured while writing data to box.");
    })
}

var trialcounter;






function startExperiment() {
  jsPsych.init({
    timeline: [
      fullscreenEnter, page3, page4, page5,
      eyeTrackingInstruction1 ,eyeTrackingInstruction2 , inital_eye_calibration ,
      experimentOverview, test1a, test1b, test2a,test2b,
      //recalibration,
      choiceInstructionReinforce,
     charity_prac_choice,
     EnterRealChoice, charity_choice1, breaktime,
      recalibration2, charity_choice2,
    success_guard
    ],
    on_trial_finish: function () {
      trialcounter = jsPsych.data.get().count();
     if(successExp) {
      closeFullscreen()
      document.body.style.cursor = 'pointer'
      jsPsych.endExperiment(`<div>
      Thank you for your participation! You can close the browser to end the experiment now. </br>
                  The webcam will turn off when you close the browser. </br>
                    Your survey code is: ${makeSurveyCode('success')}. </br>
                   We will send you $7 as your participant fee soon! </br> 
      </div>`);
      }
      if (trialcounter == 40) {
        on_finish_callback();
        jsPsych.data.reset();
      }
    },
    preload_images: [exp_images, instruct_img,prac_img],
    on_finish: () => on_finish_callback(),
    on_close: () => on_finish_callback()

  });
};


function saveData() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      //   console.log(response.success);
    }
  };
  xhr.send(jsPsych.data.get().json());
}