const nImageInst = 4;
const debugModeCaliDot = 1;

var instruct_img = [];
for (var i = 0; i < nImageInst; i++) {
    instruct_img.push('img/instruct' + i + '.png');
}


var enter_fullscreen = {
    type: 'fullscreen',
    message: `<div> Before we begin, please close any unnecessary programs or applications on your computer. <br/>
              This will help the study run more smoothly.    <br/>
              Also, please close any browser tabs that could produce popups or alerts that would interfere with the study.    <br/>
              Finally, once the study has started, <b>DO NOT EXIT</b> fullscreen mode or you will terminate the study and not receive any payment. <br/>   
              <br><br/>
              The study will switch to full screen mode when you press the button below.  <br/>
              When you are ready to begin, press the button.<br><br></div>`,
    fullscreen_mode: true,
    on_finish: function () {
        document.body.style.cursor = 'none'
    }
}

var page3 = {
    type: 'html-keyboard-response',
    stimulus: 'In today’s study we will show you proposed laws that will be implemented. <br>\n' +
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
              '“The minimum drinking age will be ___________.”<br><br><br>'+
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
        'If think that the minimum drinking age should be “16”, then you should press the <b>LEFT ARROW KEY ( <- )</b><br>' +
        'If think that the minimum drinking age should be “18”, then you should press the <b>RIGHT ARROW KEY ( -> )</b><br><br>' +
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
                During calibration, you will see a series of dots like this <span id="calibration_dot_instruction"></span> appear on the screen, each for 5 seconds.<br/>
                Your task is simply to stare directly at each dot until it disappears.<br/>
                Then, quickly move your eyes to the next dot and repeat.<br/>
                <br><br/>
                Validation is basically the same as calibration. You simply need to stare at each dot until it turns <b><font color='green'>green</font></b> and disappears.<br/>
                During validation, the dot may turn <b><font color='yellow'>yellow</font></b>, indicating that you don’t seem to be staring directly at it.  <br/>
                Try to keep this from happening! 
                <br><br/>
                When you are ready, press the SPACE BAR to continue. </div>`,
    post_trial_gap: 500,
    choices: ['spacebar'],
    on_finish: function () {
        //jsPsych.data.displayData('csv')
    }
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

var eyeTrackingInstruction3 = {
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
var subject_id = 1;
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


var webgazercalistart = {
    timeline: [
        eyeTrackingInstruction3,
        {
            type: "eye-tracking",
            doInit: () => init_flag(),
            doCalibration: true,
            doValidation: true,
            calibrationDots: 12, // change to 12
            calibrationDuration: 5, //change to 5
            doValidation: true,
            validationDots: 12, //change to 12
            validationDuration: 3,
            validationTol: validationTols[calibrationAttempt],
            // showPoint: true,
            on_finish: function (data) {
                calibrationAttempt++;
                if (data.accuracy >= validationAccuracys[calibrationAttempt - 1]) success = true;
                if (!success && calibrationAttempt == calibrationMax) {
                    survey_code = makeSurveyCode('failed');
                    jsPsych.endExperiment(`We are sorry that eye-calibration failed too many times.The experiment was ended.Thank you for participating! </br> You will receive 50 cents for participating. Your survey code is: ${survey_code}`);
                }
            }
        }
    ],
    loop_function: () => (calibrationAttempt < calibrationMax) && (!success),
};

