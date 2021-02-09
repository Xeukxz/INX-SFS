let
  intervalTime = 10,
  rocketPosX = 0,
  rocketPosY = 0,
  rocketPosDiff = 1,
  thrust = 0.1,
  deltaZoom = 100,
  zoom = 1,
  accelleration = 0,
  fuelMax = 100,
  fuel = fuelMax,
  weight,
  RPDprefix = 'm',
  globalX,
  globalY,
  mousedown = false,
  Earth = {
    gravity: 9.8,
    radius: 100000,
    diameter: 0,
  },
  moon = {
    distance: 402336+(Earth.radius*2)
  },
  mouse = {
    x: 0,
    y: 0,
  },
  rocket = {
    x: 0,
    y: 0,
    fuel: {

    },
    thrusters: {

    },
    head: {
      x: 0,
      y: 0,
    },
    weight: 0,


  },
  launch = false,
  rocketX = 50,
  rocketY = 100

$(() => {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  var c = document.getElementById("myCanvas"),
    ctx = c.getContext("2d")

  Earth.diameter = Earth.radius*2

  globalX = window.innerWidth / 2
  globalY = window.innerHeight / 2

  $(document).on('mousemove', event => {
    mouse = {
      x: event.clientX,
      y: event.clientY
    }
    differenceX = globalX - mouse.x
    differenceY = globalY - mouse.y
    hyp = Math.sqrt(differenceX ** 2 + differenceY ** 2)
  })

  $(document).on('DOMMouseScroll mousewheel', (event) => {

    /* let mouseGridPos = world.grid.windowToGridPos(event.clientX, event.clientY) */
    // zoom out
    if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      deltaZoom += deltaZoom / 10
    } else {
      deltaZoom -= deltaZoom / 10
      if (deltaZoom < 10) deltaZoom = 10
    }
    zoom = deltaZoom / 100
    console.log(zoom + ' ' + deltaZoom + ' ' + EarthRadius)
  })

  $(document).on('keydown', event => {

    if (event.keyCode == '32') {
      if (!launch) launch = true
      else launch = false
    }

    console.log(event.keyCode)
  })

  /*   $(document).on('mouseover', event => {
      mousedown = true
    })

    $(document).on('mouseout', event => {
      mousedown = false
    }) */




  function DrawEarth() {

    EarthRadius = Earth.diameter / zoom
    console.log(Earth)

    ctx.beginPath();
    ctx.arc(globalX + rocketPosX, globalY + (rocketPosY / zoom) + EarthRadius + (rocketY / 2), EarthRadius, 0, 2 * Math.PI); // Draw big circle x: 600px y: 500px r: 250px
    ctx.stroke();

  }


  setInterval(() => {

    if (launch) {
      if (fuel > 0) {
        accelleration += thrust
        fuel -= 1 / 100
      } else fuel = 0
      rocketPosY += accelleration / 100
    } else {
      if (rocketPosX >= 0 || rocketPosY >= 0) rocketPosY += accelleration / 100
    }
    if (rocketPosDiff > 0 && rocketPosX >= 0 && rocketPosY >= 0) {
      accelleration -= 9.8 / 100
    } else if (rocketPosX <= 0 && rocketPosY <= 0) {
      accelleration = 0
      rocketPosY = 0
      rocketPosX = 0
    }

    console.log(`${fuel/fuelMax} - ${accelleration} - ${rocketPosDiff}`)




    rocketPosDiff = Math.sqrt(rocketPosX ** 2 + rocketPosY ** 2)

    $('#InfoCount').html(`${Math.floor(fuel/fuelMax*100)}<br>${Math.ceil(accelleration)}<br>${Math.floor(rocketPosDiff)}`)
    $('#InfoCountUnits').html(`%<br>m/s<br>${RPDprefix}`)

    rocketX = 50 / zoom
    rocketY = 100 / zoom



    ctx.strokeStyle = "white";
    ctx.fillStyle = "yellow";
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    DrawEarth()

    ctx.beginPath();
    ctx.rect(globalX - (rocketX / 2), globalY - (rocketY / 2), rocketX, rocketY);
    ctx.stroke();

    /*     ctx.beginPath();
        ctx.rect(globalX - (rocketX/2), globalY + (100/2), rocketX, 20);
        ctx.stroke();
        if(launch) ctx.fill() */

    if (mousedown) {
      ctx.strokeStyle = "aqua";
      ctx.beginPath();
      ctx.arc(globalX, globalY, hyp, 0, 2 * Math.PI); // Draw user circle x: 600px y: 500px r: 250px
      ctx.stroke();

      ctx.moveTo(globalX, globalY);

      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke()


    }

    /* console.log(rot) */
    /* console.log(t * (180 / Math.PI) + ' ' + x + ' ' + y + ' ' + flip + ' ' + meff) */
  }, intervalTime);

  /*   setInterval(() => { */
  /*   }, 1000); */

})