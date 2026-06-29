window.addEventListener ('gamepaddisconnected', (event) => { gamepads (); });
window.addEventListener ('gamepadconnected', (event) => { gamepads (); });

function vibrate (id_gamepad)
{
    const gamepad = navigator.getGamepads ()[id_gamepad];

    gamepad.vibrationActuator.playEffect
    (
        "dual-rumble",
        {
            startDelay: document.getElementById ("startDelay" + id_gamepad).value,
            duration: document.getElementById ("duration" + id_gamepad).value,
            weakMagnitude: document.getElementById ("weakMagnitude" + id_gamepad).value / 100,
            strongMagnitude: document.getElementById ("strongMagnitude" + id_gamepad).value / 100
        }
    );
}

function gamepads ()
{
    const output = document.getElementById ('output');
    output.innerHTML = "";
    for (const gamepad of navigator.getGamepads ())
    {
        if (!gamepad) continue;
        stringHTML = '<div class="gamepad_cont"><ul id="gamepad' + gamepad.index + '" class="gamepad_head"><li>Index: <b>' + gamepad.index + "</b></li>" +
        '<li>Id: <b>' + gamepad.id + "</b></li>" +
        '<li>Connected: <b class="true">' + gamepad.connected + "</b></li>" +
        '<li>Mapping: ';
        if (gamepad.mapping) stringHTML += '<b>' + gamepad.mapping + '</b>';
        else stringHTML += '<i>none</i>';
        stringHTML += '</li><li>Axis: <b>' +  gamepad.axes.length + '</b></li>';
        stringHTML += '<li>Buttons: <b>' +  gamepad.buttons.length + '</b></li>';
        stringHTML += '<li>Vibration: ';
        if (gamepad.vibrationActuator)
        {
            stringHTML += '<a href="javascript: vibrate (' + gamepad.index + ');" title="Test vibration on gamepad ' + gamepad.index + '">' + gamepad.vibrationActuator.type + '</a>' +
            '<ul style="list-style: none;"><li><label style="width: 150px;">Delay</label> <input id="startDelay' + gamepad.index + '" type="number" value="0" step="50" min="0" max="3000" /> <b>ms.</b></li>' +
            '<li><label style="width: 150px;">Duration</label> <input id="duration' + gamepad.index + '" type="number" value="2000" step="50" min="0" max="5000" /> <b>ms.</b></li>' +
            '<li><label style="width: 150px;">Weak</label> <input id="weakMagnitude' + gamepad.index + '" type="number" value="100" step="1" min="0" max="100" /> <b>%</b></li>' +
            '<li><label style="width: 150px;">Strong</label> <input id="strongMagnitude' + gamepad.index + '" type="number" value="100" step="1" min="0" max="100" /> <b>%</b></li></ul>';
        }
        else stringHTML += '<i>none</i>';
        stringHTML += '</li></ul><div id="gamepad_test' + gamepad.index + '" class="cont"></div></div>';
        output.innerHTML += stringHTML;
    }
    if (output.innerHTML == "") output.innerHTML = '<b class="no_controllers"><i>Connect a controller or press any button on an already connected one.</i></b>';
}

function update ()
{
    for (const gamepad of navigator.getGamepads ())
    {
        if (!gamepad) continue;
        const output = document.getElementById ('gamepad_test' + gamepad.index);
        stringHTML = '<ul><li>Timestamp: <b>' + Math.round (gamepad.timestamp) + '</b></li>';
        if (gamepad.id.toLowerCase ().includes ("joystick"))
        {
            stringHTML += '</ul><div class="gamepad_position"><div class="joystick">';
                stringHTML += '<div class="button2' + (gamepad.buttons [0].value == 1 ? ' pressed' : '') + '">0</div>';
                stringHTML += '<div class="button2' + (gamepad.buttons [1].value == 1 ? ' pressed' : '') + '">1</div>';
                stringHTML += '<div class="button2' + (gamepad.buttons [2].value == 1 ? ' pressed' : '') + '">2</div>';
                stringHTML += '<div class="button2' + (gamepad.buttons [3].value == 1 ? ' pressed' : '') + '">3</div><br><br><br><br><br><br><br>';
                stringHTML += '<div class="button2' + (gamepad.buttons [4].value == 1 ? ' pressed' : '') + '">4</div>';
                stringHTML += '<div class="button2' + (gamepad.buttons [5].value == 1 ? ' pressed' : '') + '">5</div>';
                stringHTML += '<div class="button2' + (gamepad.buttons [6].value == 1 ? ' pressed' : '') + '">6</div>';
                stringHTML += '<div class="button2' + (gamepad.buttons [7].value == 1 ? ' pressed' : '') + '">7</div>';
                stringHTML += '<div class="area" style="top: 55px; left: 45px; background: radial-gradient(circle at ' + Math.round (gamepad.axes [0] * 50 + 40) + 'px ' + Math.round (gamepad.axes [1] * 50 + 40) + 'px, black 35%, white 80%);"></div>';
                stringHTML += '<div class="joypad" style=" top: ' + (gamepad.axes [1] * 30 + 70) + 'px; left: ' + (gamepad.axes [0] * 30 + 60) + 'px; background: radial-gradient(circle at ' + Math.round (gamepad.axes [0] * 20 + 25) + 'px ' + Math.round (gamepad.axes [1] * 20 + 25) + 'px, #666, black 50%, #333 90%);"></div>';
            stringHTML += '</div></div>';
        }
        else if (gamepad.mapping == "standard")
        {
            stringHTML += '</ul><div class="gamepad_position">';
                stringHTML += '<div class="label" style="left: 15px;">L2</div>';
                stringHTML += '<div class="throttle" style="left: 10px;"><div class="throttle-background" style="transform: rotate(180deg) skew(0deg);"></div><div class="throttle-circle" style="transform: rotate(-' + (gamepad.buttons [6].value * 90 + 90) + 'deg) skew(0deg);"></div></div>';
                stringHTML += '<div class="label" style="left: 370px;">R2</div>';
                stringHTML += '<div class="throttle" style="left: 245px;"><div class="throttle-background" style="transform: rotate(-90deg) skew(0deg);"></div><div class="throttle-circle" style="transform: rotate(' + (gamepad.buttons [7].value * 90 + 180) + 'deg) skew(0deg);"></div></div>';
                stringHTML += '<div class="button4' + (gamepad.buttons [4].value == 1 ? ' pressed' : '') + '" style="left: 75px;">L1</div>';
                stringHTML += '<div class="button4' + (gamepad.buttons [5].value == 1 ? ' pressed' : '') + '" style="left: 285px">R1</div>';
                stringHTML += '<div class="middle">';
                    stringHTML += '<div class="button1' + (gamepad.buttons [16].value == 1 ? ' pressed' : '') + '">&#8962;</div><br>';
                    stringHTML += '<div class="button3' + (gamepad.buttons [8].value == 1 ? ' pressed' : '') + '">Select</div> ';
                    stringHTML += '<div class="button3' + (gamepad.buttons [9].value == 1 ? ' pressed' : '') + '">Start</div>';
                stringHTML += '</div><div class="digital" style="left: 15px;">';
                    stringHTML += '<br><div class="button3' + (gamepad.buttons [12].value == 1 ? ' pressed' : '') + '">&#8593;</div><br>';
                    stringHTML += '<div class="button3' + (gamepad.buttons [14].value == 1 ? ' pressed' : '') + '">&#8592;</div>';
                    stringHTML += '<div class="button3"> &nbsp; </div>';
                    stringHTML += '<div class="button3' + (gamepad.buttons [15].value == 1 ? ' pressed' : '') + '">&#8594;</div><br>';
                    stringHTML += '<div class="button3' + (gamepad.buttons [13].value == 1 ? ' pressed' : '') + '">&#8595;</div>';
                stringHTML += '</div><div class="digital" style="left: 250px;">';
                    stringHTML += '<div class="button1' + (gamepad.buttons [3].value == 1 ? ' pressed' : '') + '">Y</div><br>';
                    stringHTML += '<div class="button1' + (gamepad.buttons [2].value == 1 ? ' pressed' : '') + '">X</div>';
                    stringHTML += '<div class="button1' + (gamepad.buttons [1].value == 1 ? ' pressed' : '') + '">B</div><br>';
                    stringHTML += '<div class="button1' + (gamepad.buttons [0].value == 1 ? ' pressed' : '') + '">A</div>';
                stringHTML += '</div><div class="area" style="left: 110px; background: radial-gradient(circle at ' + Math.round (gamepad.axes [0] * 50 + 40) + 'px ' + Math.round (gamepad.axes [1] * 50 + 40) + 'px, black 35%, white 80%);"></div>' +
                '<div class="area" style="left: 210px; background: radial-gradient(circle at ' + Math.round (gamepad.axes [2] * 50 + 40) + 'px ' + Math.round (gamepad.axes [3] * 50 + 40) + 'px, black 35%, white 80%);"></div>';
                if (gamepad.buttons [10].value == 1)
                {
                    color1 = "#333";
                    color2 = "red";
                    color3 = "white";
                }
                else
                {
                    color1 = "red";
                    color2 = "#333";
                    color3 = "black";
                }
                stringHTML += '<div class="joypad" style="top: ' + (gamepad.axes [1] * 30 + 125) + 'px; left: ' + (gamepad.axes [0] * 30 + 125) + 'px; background: radial-gradient(circle at ' + Math.round (gamepad.axes [0] * 20 + 25) + 'px ' + Math.round (gamepad.axes [1] * 20 + 25) + 'px, ' + color2 + ', ' + color1 + ' 50%, ' + color3 + ' 90%);"></div>';
                if (gamepad.buttons [11].value == 1)
                {
                    color1 = "#333";
                    color2 = "red";
                    color3 = "white";
                }
                else
                {
                    color1 = "red";
                    color2 = "#333";
                    color3 = "black";
                }
                stringHTML += '<div class="joypad" style="top: ' + (gamepad.axes [3] * 30 + 125) + 'px; left: ' + (gamepad.axes [2] * 30 + 225) + 'px;background: radial-gradient(circle at ' + Math.round (gamepad.axes [2] * 20 + 25) + 'px ' + Math.round (gamepad.axes [3] * 20 + 25) + 'px, ' + color2 + ', ' + color1 + ' 50%, ' + color3 + ' 90%);"></div>';
            stringHTML += '</div>';
        }
        else
        {
            stringHTML += '<li>Axis:<ul>';
            for (const [index, axis] of gamepad.axes.entries ())
            {
                stringHTML += '<li>' + Math.round (axis) + '</li>';
            }
            stringHTML += '</ul></li><li>Buttons:<ul><li>';
            for (const [index, button] of gamepad.buttons.entries ())
            {
                stringHTML += `<div class="button2 ${button.pressed ? 'pressed' : ''}">${index}</div>`;
            }
            stringHTML += '</li></ul></li></ul>';
        }
        output.innerHTML = stringHTML;
    }
    window.requestAnimationFrame (update);
}
update ();