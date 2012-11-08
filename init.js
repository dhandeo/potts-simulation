
function start() 
    {
    var canvas = document.getElementById("canvas2d");
    var ctx = canvas.getContext("2d");
    sim = new Simulation(10,10);
    sim.Init();
    
    window.setInterval(function() {
            sim.Animate(ctx);
            }, 100);
    }

