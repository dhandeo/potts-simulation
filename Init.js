
function start() 
    {
    var canvas = document.getElementById("canvas2d");
    var ctx = canvas.getContext("2d");
    sim = new SynapticRearrangement(10,10, 3);
    sim.Init();
    console.log(sim)
    window.setInterval(function() {
            sim.Animate(ctx);
            }, 100);
    }

